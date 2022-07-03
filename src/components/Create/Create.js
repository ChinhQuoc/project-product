import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {productApi} from "../../apis/ProductApi";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from "../../redux/actions/Product";

const FIELD = {
  productName: "tên sản phẩm",
  image: "link ảnh sản phẩm",
  content: "nội dung sản phẩm",
  price: "giá sản phẩm"
};

const requiredMessage = (field) => {
  return `Bạn phải nhập ${field}`;
};

const exceedCharacter = (field, max) => {
  return `${field} không vượt quá ${max} ký tự`;
};

function Create() {
  const {id} = useParams();
  const navigate = useNavigate();
  const product = useSelector(state => state.product.productDetail);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const scheme = yup.object({
    productName: yup.string().required(requiredMessage(FIELD.productName)).max(50, exceedCharacter(FIELD.productName, 50)),
    image: yup.string().required(requiredMessage(FIELD.image)),
    content: yup.string().max(300, exceedCharacter(FIELD.content, 300)),
    price: yup.number().max(30000000, exceedCharacter(FIELD.price, 30000000)).min(1000, `${FIELD.price} không được nhỏ hơn 1000`)
  });

  const { setFocus, register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(scheme) });

  useEffect(() => {
    if (id !== "new") {
      const action = getDetail(id);
      dispatch(action);
      setIsEdit(true);
    }
  }, [id]);

  useEffect(() => {
    setFocus("productName");
  }, [setFocus]);

  const gotoHome = () => {
    navigate("/")
  }

  const onSubmit = (data) => {
    if (id === "new") {
      productApi.createProduct(data)
        .then(res => res.json())
        .then(() => gotoHome())
        .catch(error => console.log(error));
    } else {
      productApi.updateProduct(id, data)
        .then(res => res.json())
        .then(() => gotoHome())
        .catch(error => console.log(error));
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Tên sản phẩm</label>
              <label style={{color: "red"}}>*</label>
              <input type="text" className="form-control" name="productName" placeholder="Tên sản phẩm" defaultValue={isEdit ? product?.productName : ""} {...register("productName")} />
              <small className="form-text text-danger font-italic">{errors.productName?.message}</small>
            </div>
            <div className="form-group">
              <label>Hình ảnh</label>
              <label style={{color: "red"}}>*</label>
              <input type="text" className="form-control" name="image" placeholder="Link ảnh" defaultValue={isEdit ? product?.image : ""} {...register("image")} />
              <small className="form-text text-danger font-italic">{errors.image?.message}</small>
            </div>
            <div className="form-group">
              <label>Giá</label>
              <input type="number" className="form-control" name="price" defaultValue={isEdit ? product?.price : 1000} {...register("price")} />
              <small className="form-text text-danger font-italic">{errors.price?.message}</small>
            </div>
            <div className="form-group">
              <label>Nội dung</label>
              <textarea className="form-control" name="content" rows="3" defaultValue={isEdit ? product?.content : ""} {...register("content")}></textarea>
              <small className="form-text text-danger font-italic">{errors.content?.message}</small>
            </div>
            {
              !isEdit ? <button type="submit" className="btn btn-primary">Tạo mới</button> :
                <button type="submit" className="btn btn-primary">Cập nhật</button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
