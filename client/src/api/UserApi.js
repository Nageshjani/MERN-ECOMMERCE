import {useState, useEffect} from 'react'
import axios from 'axios'
axios.defaults.withCredentials=true

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('https://mern-ecommerce-forall.herokuapp.com/user/infor', {
                        headers: {Authorization: token}
                    })
                   

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            const getHistory = async () =>{
                try {
                    const res = await axios.get('https://mern-ecommerce-forall.herokuapp.com/user/history', {
                        headers: {Authorization: token}
                    })
                    console.log('hist',res)
                    setHistory(res.data)

                   

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getHistory()

           
            
        }
    },[token])
    
    
    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('http://localhost:2500/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        }
    }

    


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart:addCart,
        history: [history, setHistory]

        
    
    }
}

export default UserAPI