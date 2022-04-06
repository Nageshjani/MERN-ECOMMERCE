import React, {createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ProductsAPI from './api/ProductsAPI'
import UserApi from './api/UserApi'
import CategoriesAPI from './api/CategoriesAPI'


import axios from 'axios'
axios.defaults.withCredentials=true


export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [callback,setCallback]=useState(false)
    const [token, setToken] = useState(false)
    const navigate=useNavigate()
    alert("inside Data Provider")
    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        alert("inside useefect")
        alert(firstLogin)
        if(firstLogin){
            const refreshToken = async () =>{
                alert('inside refresh token')
                const res = await axios.get('https://mern-ecommerce-forall.herokuapp.com/user/refresh_token')
        
                setToken(res.data.accesstoken)
                console.log('token',res)
               
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserApi(token),
        categoriesAPI: CategoriesAPI()
        
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}