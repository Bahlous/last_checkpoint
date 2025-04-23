import { Route,  Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Erreur from './pages/Erreur';
import BareNav from './components/Navbar/Navbar';
// import Footer from './components/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { current } from './JS/actions/authAction';
import Dashboard from './pages/Dashboard';
import DescriptionProd from './pages/DescriptionProd'
// import Cart from './pages/Cart';


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state=>state.authReducer.isAuth)
  // console.log(isAuth);
  const user = useSelector(state=>state.authReducer.user)
  // console.log(user);
  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(current());
    }
  },[dispatch]);
  return (
    <div className="App">
      <BareNav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/prod/:id' element={<DescriptionProd/>}/>
       {user.isAdmin && <Route path='/dash' element={<Dashboard/>}/>}
        {isAuth?
        <Route path='/profile' element={<Profile/>}/> 
      :(
        <>
        (<Route path='/profile' element={<Login/>}/>
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>)
        </>
      )}
        <Route path='/*' element={<Erreur/>}/>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
