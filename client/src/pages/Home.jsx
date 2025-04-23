import React, { useEffect } from 'react';
import ListProd from '../components/ListProd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProd } from '../JS/actions/productAction';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    dispatch(getAllProd());
  }, [dispatch]);

  return (
    <div className='page'>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo1RjkXm_q-Blc7YijvxKQulYYm9ABNlG_wA&s"
        alt="home img"
      />
      <h1>Welcome to our store</h1>
      <ListProd products={products} isProfile={false} />
    </div>
  );
};

export default Home;
