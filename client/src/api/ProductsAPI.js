import {useState, useEffect} from 'react'
import axios from 'axios'
axios.defaults.withCredentials=true


function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
   

    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`https://mern-ecommerce-forall.herokuapp.com/api/products`) 
            setProducts(res.data.products)
            console.log("pro",products)
            
        }
        getProducts()
    },[callback])
    
    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        
    }
}

export default ProductsAPI