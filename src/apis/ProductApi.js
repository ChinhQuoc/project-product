const URL = "http://study.imic.edu.vn/api/product";

class ProductApi {
  createProduct = async (product) => {
    const requestBody = {
      ProductName: product.productName,
      Image: product.image,
      Content: product.content,
      Price: product.price
    };
    return await fetch(`${URL}/add`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
  };

  removeProduct = async (id) => {
    return await fetch(`${URL}/delete/${id}`, {
      method: 'delete',
    });
  };
};

export const productApi = new ProductApi();
