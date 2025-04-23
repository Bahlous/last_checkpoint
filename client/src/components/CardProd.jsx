import React from "react";
import { Link } from "react-router-dom";
// import { addToCart } from '../JS/actions/cartActions';
// import { useDispatch } from "react-redux";

const CardProd = ({ product }) => {
  
  //   const dispatch = useDispatch();

  // const handleAddToCart = () => {
  //   dispatch(addToCart(product._id));
  // };

  
  return (
    <div className="card-prod">
      <img src={product.image} alt={product.name} width="150"/>
      <div className="card-content">
        <h4>{product.name}</h4>
        <h4>{product.description}</h4>
        <p>{product.price} DT</p>
        <Link to={`/prod/${product._id}`}>
        <button>See product</button></Link>
      {/* <button onClick={handleAddToCart}>Add to Cart</button> */}
      </div>
    </div>
  );
};


export default CardProd;
