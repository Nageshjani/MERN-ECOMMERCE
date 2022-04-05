import React, {useContext} from 'react'
import Register from './auth/Register'
import { Routes ,Route } from 'react-router-dom';
import Login from './auth/Login';
import CreateProduct from './createProduct/CreateProduct';
import Products from './products/Products';
import Cart from './cart/Cart';
import { GlobalState } from '../../GlobalState';
import OrderHistory from './history/OrderHistory';
import NotFound from './utils/productItem/notfound/NotFound';
import OrderDetails from './history/OrderDetails';
import Categories from './categories/Categories';




function Pages() {
    
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    


    return (
        <Routes>
            <Route path="/edit_product/:id" element={<CreateProduct/>} /> 

            <Route path="/register" element={<Register/>} /> 
            <Route path="/" element={<Products/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/create_product" element={<CreateProduct/>} />
            <Route path="/cart" element={<Cart/>} />

            <Route path="/category" element={isAdmin ?<Categories/>:<NotFound/>} />
           


            

            <Route path="/history" element={isLogged ? <OrderHistory/> :<NotFound/>} />
            <Route path="/history/:id" element={isLogged ? <OrderDetails/> :<NotFound/>} />
           
           

 
            
        </Routes>    
            
       
    )
}

export default Pages
