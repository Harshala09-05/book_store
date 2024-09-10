export const addToCart = (item,id) => {
  console.log(item);
  console.log(id);
    return {
      type: 'ADD_TO_CART',
      payload: {item,id},
    };
  };
  
export const removeFromCart = (id) => {
  console.log(id);
    return {
      type: 'REMOVE_FROM_CART',
      payload: { id },
    };
  };
  
  export const setCartCount = (count) => {
    return {
      type: 'SET_CART_COUNT',
      payload: count,
    };
  };
  