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
  const products = useSelector(state => state.product.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = getPagination(pageSize);
    dispatch(action);
    return () => {
      setIsDelete(false);
    }
  }, [pageSize, isDelete]);

  const gotoCreate = () => {
    navigate("/create")
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
        <button className="btn btn-success" onClick={() => gotoCreate()}>Tạo mới</button>
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
