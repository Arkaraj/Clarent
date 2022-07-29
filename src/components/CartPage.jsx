import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState(50); // gonna be static
  const {
    user: { id },
  } = useContext(AuthContext);

  useEffect(() => {
    AuthService.getUsersCartProducts(id).then((data) => {
      setCart(data);
    });
  }, []);

  return (
    <div>
      {cart ? (
        <>
          <h1>Total: {price + discount + delivery}</h1>
          <pre>{JSON.stringify(cart, undefined, 2)}</pre>
        </>
      ) : (
        <p className="loading"></p>
      )}
    </div>
  );
};

export default CartPage;
