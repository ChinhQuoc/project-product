import React, {useEffect} from 'react';
import * as yup from 'yup';
import {productApi} from "../../apis/ProductApi";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const scheme = yup.object({
    productName: yup.string().required(requiredMessage(FIELD.productName)).max(50, exceedCharacter(FIELD.productName, 50)),
    image: yup.string().required(requiredMessage(FIELD.image)),
    content: yup.string().max(300, exceedCharacter(FIELD.content, 300)),
    price: yup.number().max(30000000, exceedCharacter(FIELD.price, 30000000)).min(1000, `${FIELD.price} không được nhỏ hơn 1000`)
  });

  const { setFocus, register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(scheme) });

  useEffect(() => {
    setFocus("productName");
  }, [setFocus]);

  const gotoHome = () => {
    navigate("/")
  }

  const onSubmit = (data) => {
    productApi.createProduct(data)
      .then(res => res.json())
      .then(() => gotoHome())
      .catch(error => console.log(error));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Tên sản phẩm</label>
              <label style={{color: "red"}}>*</label>
              <input type="text" className="form-control" name="productName" placeholder="Tên sản phẩm" {...register("productName")} />
              <small className="form-text text-danger font-italic">{errors.productName?.message}</small>
            </div>
            <div className="form-group">
              <label>Hình ảnh</label>
              <label style={{color: "red"}}>*</label>
              <input type="text" className="form-control" name="image" placeholder="Link ảnh" {...register("image")} />
              <small className="form-text text-danger font-italic">{errors.image?.message}</small>
            </div>
            <div className="form-group">
              <label>Giá</label>
              <input type="number" className="form-control" name="price" defaultValue={1000} {...register("price")} />
              <small className="form-text text-danger font-italic">{errors.price?.message}</small>
            </div>
            <div className="form-group">
              <label>Nội dung</label>
              <textarea className="form-control" name="content" rows="3" {...register("content")}></textarea>
              <small className="form-text text-danger font-italic">{errors.content?.message}</small>
            </div>
            <button type="submit" className="btn btn-primary">Tạo mới</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
