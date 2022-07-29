import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Snackbar, Alert } from "@mui/material";
import ProductService from "../Services/ProductService";
import { AuthContext } from "../Context/AuthContext";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: "#00B700",
  // padding: theme.spacing(1),
  paddingLeft: 4,
  paddingRight: 4,
  borderRadius: 5,
  color: "white",
  width: "fit-content",
}));

const ProductCard = ({ product: prod }) => {
  const [cartClr, setCartClr] = useState(false);
  const [favClr, setFavClr] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("success");
  const [msg, setMsg] = useState("Successfully Rated!");

  const { user, accessToken, setCartItems } = useContext(AuthContext);
  const [cartId, setCartId] = useState(null);
  const handleFavourites = () => {
    setFavClr(!favClr);
  };

  const handleCart = () => {
    setCartClr(!cartClr);
    if (cartClr) {
      ProductService.removeFromCart(cartId, accessToken).then((data) => {
        if (data.success) {
          setCartItems((c) => c - 1);
          setStatus("success");
          setMsg(data.message);
        } else {
          setStatus("error");
          setMsg("Removed Product!");
        }
      });
    } else {
      ProductService.addToCart(
        { product: prod, userId: user.id },
        accessToken
      ).then((data) => {
        // console.log(data);
        if (data.success) {
          setCartId(data.data.id);
          setStatus("success");
          setMsg(data.message);
          setOpen(true);
          setCartItems((c) => c + 1);
        } else {
          setStatus("error");
          setMsg(data.message);
        }
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid key={prod.id} item width={320} height={340}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          loading="lazy"
          height="140"
          image={prod.image}
          alt={prod.title}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            component="a"
            href={`/product/${prod.id}`}
            style={{ textDecoration: "none" }}
          >
            {prod.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹ {prod.amount}
          </Typography>
          <Div>{prod.rating}</Div>
        </CardContent>
        <CardActions
          sx={{ display: { md: "flex", justifyContent: "space-between" } }}
        >
          <Tooltip title="Favourites" onClick={handleFavourites}>
            <IconButton>
              <FavoriteIcon style={{ color: favClr ? "red" : "gray" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to Cart" onClick={handleCart}>
            <IconButton>
              <AddShoppingCartIcon
                style={{ color: cartClr ? "red" : "gray" }}
              />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProductCard;
