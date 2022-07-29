import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const SearchProducts = () => {
  const { productName } = useParams();
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/products?title=${productName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoaded(true);
      });
  }, [productName]);
  return (
    <>
      {loaded ? (
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={5}>
            {products.length > 0 ? (
              products.map((prod) => (
                <ProductCard product={prod} key={prod.id} />
              ))
            ) : (
              <p>No Results Found!</p>
            )}
          </Grid>
        </Grid>
      ) : (
        <p className="loading"></p>
      )}
    </>
  );
};

export default SearchProducts;
