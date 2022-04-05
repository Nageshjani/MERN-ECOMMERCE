import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import axios from 'axios'
import './products.css'


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = useState([{
        "product_id": "Noise ColorFit Pro 2",
        "title": "colorfit pro 2",
        "price": 2000,
        "description": "ColorFit Pro 2 Smartwatch, Magnetic charger and user manual.",
        "content": "Heart Rate Monitor, Menstrual Cycle Tracking, Sleep & Step Tracking, Multi Sport Modes, Smart Notifications, 1.3\" IPS Touch Screen Display, IP68 Waterproof, Bluetooth v5.0 & Android and iOS compatible, 10 Day Battery - 45 Day Standby",
        "images": {
          "public_id": "test/qlh3hxpr98ckr4ua62xg",
          "url": "https://res.cloudinary.com/dhruvforall/image/upload/v1649077745/test/qlh3hxpr98ckr4ua62xg.png"
        },
        "category": "watch",
        "checked": false,
        "sold": 0
    }])
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [isCheck, setIsCheck] = useState(false)

    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
        try {
            
            const destroyImg = axios.post('http://localhost:2500/api/destroy', {public_id},{ 
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`http://localhost:2500/api/products/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deleteProduct
            setCallback(!callback)
           
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    
    return (
        <>
        
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete ALL</button>
            </div>
        }

        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
        </div>

       
       
        </>
    )
}

export default Products