import React, { useEffect, useState } from "react";
import ProductService from "../Services/ProductService";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
// import AuthService from "../Services/AuthService";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getAllProducts().then((data) => {
      setProducts(data);
    });
    // AuthService.getUsersCartProducts()
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <br />
      {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5}>
          {products.map((prod) => (
            <ProductCard product={prod} key={prod.id} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
