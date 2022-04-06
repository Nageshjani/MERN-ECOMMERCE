import {useState, useEffect} from 'react'

import axios from 'axios'
axios.defaults.withCredentials=true

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        
        const getCategories = async () =>{
            alert("inside ctegory api")
            try{ 
                const res = await axios.get('https://mern-ecommerce-forall.herokuapp.com/api/category')
                console.log(res)
                setCategories(res.data)
                

            } catch(err){
                window.location.href = "https://mern-ecommerce-forall.herokuapp.com";

            }
            
        }

        getCategories()
    },[callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI