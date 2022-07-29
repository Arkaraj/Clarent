import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import { Grid, Typography, Button, Box } from "@mui/material";
import CartCard from "./CartCard";
import ProductService from "../Services/ProductService";
import Backdrop from "@mui/material/Backdrop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [price, setPrice] = useState(0);
  const discount = 100,
    delivery = 50; // gonna be static
  const {
    user: { id },
    accessToken,
    setCartItems,
  } = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    AuthService.getUsersCartProducts(id).then((data) => {
      setCart(data);
      let sum = 0;
      data.map((d) => {
        sum += parseInt(d.product.amount);
      });
      setPrice(sum);
      // setTotal(sum - discount + delivery); // sum - 50
    });
  }, []);

  const handleOrder = () => {
    let order = {
      productId: [],
      userId: id,
      "total-amount": price - 50,
    };
    cart.map((c) => {
      order.productId.push(c.product.id);
    });
    // delete all the cart items now
    cart.map((c) => {
      // delete
      ProductService.removeFromCart(c.id, accessToken).then((data) => {});
    });
    ProductService.order(order, accessToken).then((data) => {
      if (data.success) {
        setOpen(!open);
        setCartItems(0);
        setCart([]);
        setPrice(0);
      } else {
        alert("Some Error Occured!" + data.data);
      }
    });
  };

  return (
    <div style={{ margin: "1rem 5rem" }}>
      {cart ? (
        <Grid container spacing={2}>
          <Grid item xs={false} sm={4} md={7} elevation={6}>
            <Box
              sx={{
                p: 2,
                bgcolor: "white",
                display: "grid",
                gridTemplateColumns: { md: "1fr" },
                gap: 1,
              }}
            >
              <Typography fontSize={"1.2rem"}>My Cart:</Typography>
              {cart.length > 0 ? (
                cart.map((c) => (
                  <CartCard
                    prod={c.product}
                    key={c.id}
                    setCart={setCart}
                    setPrice={setPrice}
                  />
                ))
              ) : (
                <Typography>Empty</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            sx={{
              display: {
                md: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              },
            }}
            height={"70%"}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: "white",
                display: "grid",
                gridTemplateColumns: { md: "1fr" },
                gap: 1,
              }}
            >
              <Typography
                variant="body1"
                fontSize={"1.5rem"}
                color="text.secondary"
              >
                Price Details
              </Typography>
              <div className="orderPrice">
                <Typography>Price</Typography>
                {price}
              </div>
              <div className="orderPrice">
                <Typography>Discount</Typography>
                {discount}
              </div>
              <div className="orderPrice">
                <Typography>Delivery Charge </Typography>
                {delivery}
              </div>

              <hr />
              <Typography my={"5%"}>
                Total: {price == 0 ? 0 : price - 50}
              </Typography>
            </Box>
          </Grid>
          <Button
            variant="contained"
            size="small"
            height="5px"
            sx={{ m: "1rem" }}
            onClick={handleOrder}
            disabled={cart.length == 0}
          >
            PLACE ORDER
          </Button>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CheckCircleIcon
                size="large"
                fontSize="large"
                style={{ color: "green" }}
              />
              <Typography variant="h4" color="black">
                Order Placed Successfully
              </Typography>
              <Typography variant="caption" color="black">
                It will delivered in 5 days
              </Typography>
            </Box>
          </Backdrop>
        </Grid>
      ) : (
        <p className="loading"></p>
      )}
    </div>
  );
};

export default CartPage;
