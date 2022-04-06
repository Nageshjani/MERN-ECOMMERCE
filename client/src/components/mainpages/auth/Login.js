import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true;


function Login() {
    const [user, setUser] = useState({
        email:'', password: ''
    })
    const navigate=useNavigate()

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            const  res=await axios.post('user/login', {...user})
            console.log('res',res)

            localStorage.setItem('firstLogin', true)
            
            navigate('/')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login