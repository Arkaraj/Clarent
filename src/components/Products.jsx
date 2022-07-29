import React, { useEffect, useState, useContext } from "react";
import ProductService from "../Services/ProductService";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import { AuthContext } from "../Context/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    ProductService.getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading ? (
        <div>
          <h1>Products</h1>
          <br />
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={5}>
              {products.map((prod) => (
                <ProductCard product={prod} key={prod.id} />
              ))}
            </Grid>
          </Grid>
        </div>
      ) : (
        <p className="loading"></p>
      )}
    </>
  );
};

export default Products;
