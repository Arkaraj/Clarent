import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container, ButtonGroup, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: theme.breakpoints.up("xs") ? "170px" : "220px",
  lineHeight: "60px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  borderColor: "white",
  color: "black",
}));

const StyledInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 0,
    },
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
    "& input": {
      textAlign: "center",
      width: 60,
    },
  },
});

const CartCard = ({ prod, setCart, setPrice }) => {
  const [count, setCount] = useState(1);
  const handleChange = (e) => {
    setCount(Math.max(Number(e.target.value), 1));
  };
  return (
    <Item key={prod.id} elevation={4} className="OrderItems" xs={10}>
      <div>
        <img
          src={prod.image}
          alt={prod.title}
          loading="lazy"
          width="100"
          height="170"
        />
      </div>
      <div className="OrderItemsRight">
        <Typography variant="body1" color="text.secondary">
          {prod.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹ {prod.amount}
        </Typography>
        <Container>
          <ButtonGroup>
            <StyledButton
              onClick={() => {
                setCount((prev) => prev + 1);
                setPrice((p) => p + parseInt(prod.amount));
              }}
            >
              <AddIcon fontSize="small" />
            </StyledButton>
            <StyledInput size="small" onChange={handleChange} value={count} />
            <StyledButton
              onClick={() => {
                setCount((prev) => prev - 1);
                setPrice((p) => p - parseInt(prod.amount));
              }}
              disabled={count === 1}
            >
              <RemoveIcon fontSize="small" />
            </StyledButton>
          </ButtonGroup>
        </Container>
      </div>
    </Item>
  );
};

export default CartCard;
