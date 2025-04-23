import React from "react";
import CardProd from "./CardProd";

const fallbackProducts = [];

const ListProd = ({ products, isProfile }) => {
  const toDisplay = products && products.length > 0 ? products : fallbackProducts;

  return (
    <div className="product-list">
      {toDisplay.map((elt) => (
        <CardProd product={elt} key={elt._id} />
      ))}
    </div>
  );
};

export default ListProd;
