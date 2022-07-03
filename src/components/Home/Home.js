import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPagination} from "../../redux/actions/Product";
import Product from "./Product/Product";
import {productApi} from "../../apis/ProductApi";
import { useNavigate } from "react-router-dom";
import "./styled.css";

function Home() {
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  const [pageSize, setPageSize] = useState(6);
  const [loading, setLoading] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const products = useSelector(state => state.product.list);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const action = getPagination(pageSize, keyWord);
    dispatch(action);
    setLoading(false);
    return () => {
      setIsDelete(false);
    }
  }, [pageSize, keyWord, isDelete]);

  const gotoCreate = () => {
    navigate("/create/new")
  }

  const handleDelete = id => {
    productApi.removeProduct(id)
      .then(res => res.json())
      .then(() => setIsDelete(true))
      .catch(error => console.log(error));
  };

  const listProject = () => {
    return products.map((product, index) => {
      return <Product key={index} product={product} id={product.productId} handleDelete={handleDelete}/>;
    })
  };

  return (
    <div className="container">
      <div className="row button-create">
        <div className="col-2">
          <button className="btn btn-success" onClick={() => gotoCreate()}>Tạo mới</button>
        </div>
        <div className="col-10">
          <input type="text" className="form-control" name="keyWord" onInput={(event) => setKeyWord(event.target.value)} />
        </div>
      </div>
      <div className="row align-items-start">
        { listProject() }
      </div>
      <div className="row justify-content-center">
        <button type="button" className="btn btn-dark" onClick={() => setPageSize(pageSize+6)}>Xem thêm</button>
      </div>
    </div>
  );
}

export default Home;
