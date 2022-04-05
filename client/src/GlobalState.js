import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserApi from './api/UserApi'
import CategoriesAPI from './api/CategoriesAPI'


export const GlobalState = createContext()


import axios from 'axios'
axios.defaults.withCredentials=true

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('https://mern-ecommerce-forall.herokuapp.com/user/refresh_token')
        
                setToken(res.data.accesstoken)
                console.log('res',res)
               
    
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