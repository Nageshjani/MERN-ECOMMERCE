import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserApi from './api/UserApi'
import CategoriesAPI from './api/CategoriesAPI'


import axios from 'axios'
axios.defaults.withCredentials=true


export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    const res = axios.get('user/refresh_token')
    //setToken(res.data.accesstoken)
    console.log('token',res)


    
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