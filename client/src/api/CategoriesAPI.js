import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials=true

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)
    const navigate=useNavigate()

    useEffect(() =>{
        
        const getCategories = async () =>{
            alert("inside ctegory api")
            try{ 
                const res = await axios.get('https://mern-ecommerce-forall.herokuapp.com/api/category')
                console.log(res)
                setCategories(res.data)
                navigate('/category')

            } catch(err){
                window.location.href = "https://mern-full-auth.herokuapp.com";

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