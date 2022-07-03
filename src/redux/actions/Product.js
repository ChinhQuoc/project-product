const URL = "http://study.imic.edu.vn/api/product";

export const getPagination = (pageSize, keyWord= "") => {
  const requestBody = {
    PageIndex: 1,
    PageSize: pageSize,
    KeyWord: keyWord
  };
  return dispatch => {
    fetch(`${URL}/get-pagination`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(product => product.json())
      .then((data) => {
        dispatch(GetPagination(data))
      })
  };
};

export const GetPagination = (data) => {
  return {
    type: "GET_PAGINATION",
    payload: data
  };
};

export const getDetail = (id) => {
  return dispatch => {
    fetch(`${URL}/${id}`, {
      method: 'get'
    })
      .then(product => product.json())
      .then((data) => {
        dispatch(GetDetail(data))
      })
      .catch((error) => console.log(error))
  };
};

export const GetDetail = (data) => {
  return {
    type: "GET_DETAIL",
    payload: data
  };
};

export const deleteProduct = (id) => {
  return dispatch => {
    fetch(`${URL}/delete/${id}`, {
      method: 'delete'
    })
      .then(product => product.json())
      .then((data) => {
        dispatch(DeleteProduct(data))
      })
      .catch((error) => console.log(error))
  };
};

export const DeleteProduct = (data) => {
  return {
    type: "DELETE",
    payload: data
  };
};



