import React from 'react'
import {useState, useEffect} from 'react'
import { GlobalState } from '../GlobalState'
import {useContext} from 'react'
import axios from 'axios'

const AddcartApi = async (product) => {
    
    


    const state = useContext(GlobalState)
    const [token] = state.token
    const [isLogged] = state.userAPI.isAdmin
    const [isAdmin] = state.userAPI.isLogged
    const [cart, setCart] = state.userAPI.cart
    if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        }
  
}

export default AddcartApi
