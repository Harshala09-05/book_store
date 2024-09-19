const initialState = {
    cartCount: 0,
  cartItems: [], // This will hold your cart items
    
  };
  
const cartReducer = (state = initialState, action) => {
  console.log(action);
  console.log(state);
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cartCount: state.cartCount + 1,
          cartItems: [...state.cartItems, action.payload],
        };
      case 'REMOVE_FROM_CART':
        debugger
        return {
          ...state,
          cartCount: state.cartCount - 1,
          cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
        };
      case 'SET_CART_COUNT':
        return {
          ...state,
          cartCount: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  