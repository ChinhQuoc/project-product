import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail, getPagination} from "../../redux/actions/Product";
import { useNavigate } from "react-router-dom";

import "./styled.css";

function Detail() {
  const navigate = useNavigate();

  const {id} = useParams();
  const product = useSelector(state => state.product.productDetail);
  const listProducts = useSelector(state => state.product.list);
  const dispatch = useDispatch();
  const abcDispatch = useDispatch();

  useEffect(() => {
    const action = getDetail(id);
    dispatch(action);

    const actionGetList = getPagination(6);
    abcDispatch(actionGetList);
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <img src={product.image} alt={product.productName} width="500" height="333" />
          <h3 className="mt-2">{product.productName}</h3>
          <p>{product.content}</p>
          <div className="container mt-5">
            <div className="row d-flex justify-content-end">
              <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>Trang chủ</button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          {
            listProducts.map(product => <div><Link key={product.productId} to={window.location.pathname.replace(
              `detail/${id}`,
              `detail/${product.productId}`
            )}>{product.productName}</Link></div>)
          }
        </div>
      </div>
    </div>
  );
}

export default Detail;
