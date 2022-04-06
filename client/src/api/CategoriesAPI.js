import {useState, useEffect} from 'react'
import axios from 'axios'
axios.defaults.withCredentials=true

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getCategories = async () =>{
            alert("inside ctegory api")
            const res = await axios.get('https://mern-ecommerce-forall.herokuapp.com/api/category')
            console.log('cat',res)
            setCategories(res.data)
        }

        getCategories()
    },[callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI