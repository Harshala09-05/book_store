import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { getBooks, getCartItems } from "../Services/admin_service";

export const  DataContext = createContext(null);


export default function DataProvider({children}) {

  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const response = await getCartItems();
      setCartCount(response.data.length); // Assuming the response data is an array of cart items
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const [books, setBooks] = useState({
    bookName: "",
    author: "",
    description: "",
    quantity: "",
    price: '',
    discountPrice: ''
  });
  useEffect(() => {
    getAllBooks()
    console.log('books', books);
    updateCartCount()
  }, [])
  
  const getAllBooks = async() => {
    let response = await getBooks();
    
    setBooks(response.data.result);
    console.log("books--------------------->", response.data.result)
    }
  


  return (
      <DataContext.Provider value={{
          books,
      setBooks,
      getAllBooks,
      cartCount, updateCartCount
      }}>
         {children} 
    </DataContext.Provider>
  )
}
