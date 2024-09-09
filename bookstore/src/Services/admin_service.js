import axios from 'axios';
function getHeaders() {
    return {
        headers: {
            Accept: 'application/json',
            Authorization: localStorage.getItem('token')
        }
    }
}

function getXAccessToken() {
  return {
      headers: {
          Accept: 'application/json',
          'x-access-token': localStorage.getItem('token')
      }
  }
}

export let UserLogin = async(data) => {
    let response = await axios.post('https://bookstore.incubation.bridgelabz.com/bookstore_user/admin/login',data)
    // console.log(response)
    return response
}

export let UserSignup = async(data) => {
    let response = await axios.post('https://bookstore.incubation.bridgelabz.com/bookstore_user/admin/registration',data)
    // console.log(response)
    return response
}

export let getBooks = async () => {
//   console.log(getHeaders);
  let response = await axios.get(
    "https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book",
    getHeaders()
  );
  console.log(response);
  return response;
};

export let updateBooks = async () => {
    //   console.log(getHeaders);
      let response = await axios.get(
        "https://bookstore.incubation.bridgelabz.com/bookstore_user/get/book",
        getHeaders()
      );
      console.log(response);
      return response;
};
    
export const addCartItem = async (id,data) => {
  console.log(id);
//   let headers= {
//     Accept: 'application/json',
//     'x-access-token': localStorage.getItem('token')
// }  
  let response = await axios.post(
    `https://bookstore.incubation.bridgelabz.com/bookstore_user/add_cart_item/${id}`,{},
    getXAccessToken()
  );
  console.log(response);
  return response;
};

export const getCartItems = async () => {
  let response = await axios.get(
    "https://bookstore.incubation.bridgelabz.com/bookstore_user/get_cart_items",getXAccessToken()
  );
  console.log(response)
  return response;
};

export const modifyCartItem = async (id, data) => {
  console.log(id);
  console.log(data);
  let modifyCartData = {
    quantityToBuy: data.quantityToBuy
  }
  let response = await axios.put(
    `https://bookstore.incubation.bridgelabz.com/bookstore_user/cart_item_quantity/${id}`,modifyCartData,
    getXAccessToken()
 
  );
  console.log(response)
  return response;
};

export const removeCartItem = async (id, data) => {
  console.log(id);
  let response = await axios.delete(
    `https://bookstore.incubation.bridgelabz.com/bookstore_user/remove_cart_item/${id}`,
    getXAccessToken()
    ()
  );
  console.log(response)
  return response;
};
