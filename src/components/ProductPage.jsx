import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Snackbar, Alert } from "@mui/material";
import ProductService from "../Services/ProductService";
import { AuthContext } from "../Context/AuthContext";

const ProductPage = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const { user, setCartItems, accessToken } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("success");
  const [msg, setMsg] = useState("Successfully Rated!");
  useEffect(() => {
    ProductService.getSpecificProduct(id).then((data) => {
      setProd(data);
    });
  }, [id]);

  const handleCart = () => {
    ProductService.addToCart(
      { product: prod, userId: user.id },
      accessToken
    ).then((data) => {
      if (data.success) {
        setStatus("success");
        setMsg(data.message);
        setOpen(true);
        setCartItems((c) => {
          if (!c) {
            c = 1;
          } else {
            c += 1;
          }
        });
      } else {
        setStatus("error");
        setMsg(data.message);
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {prod ? (
        <div>
          <Card className="productPage">
            <CardContent>
              <img
                src={`${prod.image}`}
                alt={prod.title}
                loading="lazy"
                height="500"
                width="400"
              />
            </CardContent>
            <CardContent className="prooductSection">
              <div className="upperSection">
                <Typography variant="h4" component="div">
                  {prod.title}
                </Typography>
                <br />
                <Typography variant="caption" component="div">
                  {prod.description}
                </Typography>
                <br />
                <br />
                <Typography variant="h5" component="div">
                  ₹ {prod.amount}
                </Typography>
              </div>
              <div className="lowerSection">
                <Button variant="outlined" size="large">
                  Buy Now
                </Button>
                <Button variant="contained" size="large" onClick={handleCart}>
                  Add To Basket
                </Button>
              </div>
            </CardContent>
          </Card>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={status}
              sx={{ width: "100%" }}
            >
              {msg}
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <p className="loading"></p>
      )}
    </div>
  );
};

export default ProductPage;
