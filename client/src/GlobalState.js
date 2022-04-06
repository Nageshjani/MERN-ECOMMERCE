import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserApi from './api/UserApi'
import CategoriesAPI from './api/CategoriesAPI'
import axios from 'axios'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                try{
                    const res = await axios.get('user/refresh_token')
                    setToken(res.data.accesstoken)
                    console.log('token',res)
                    setTimeout(() => {
                        refreshToken()
                    }, 10 * 60 * 1000)

                }catch(err){
                    alert(err.response.data.msg)

                }
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