import React from 'react';
import {Link} from "react-router-dom";
import "./styled.css";

function Product({product, id, handleDelete}) {
  return (
    <div className="col">
      <div className="card card-product">
        <img className="card-img-top" src={product.image} alt={product.productName} style={{height: "160px"}} />
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">{product.price}</p>
          <div className="footer-card d-flex justify-content-between">
            <Link className="btn btn-primary" to={`detail/${id}`}>Chi tiết</Link>
            <button className="btn btn-danger" onClick={() => handleDelete(id)}>Xóa</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
