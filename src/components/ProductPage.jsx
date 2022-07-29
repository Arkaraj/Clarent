import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ProductService from "../Services/ProductService";

const ProductPage = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  useEffect(() => {
    ProductService.getSpecificProduct(id).then((data) => {
      setProd(data);
    });
  }, []);
  return (
    <div>
      {prod ? (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {prod.title}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <p className="loading"></p>
      )}
    </div>
  );
};

export default ProductPage;
