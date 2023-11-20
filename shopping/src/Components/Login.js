import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from './spinner';
import { useContext } from 'react';
import cartContext from '../context/cart/cartContext';
function Login(props) {
    const a = useContext('../context/cart/cartContext')
    let location = useLocation();
    let history = useNavigate();
    const [loading, setLoading] = useState(false)

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const [credentials, setCredentials] = useState({ email: '', password: "" })
    useEffect(() => {

        props.setProgress(100)
        if (localStorage.getItem('token')) {
            props.showAlert('you are already logged in', 'danger')
            history('/product')
        }

    }, [])
    const handleClick = async (e) => {
        props.setProgress(50)


        e.preventDefault();
        props.setProgress(100)

        try {
            const response = await fetch(`${process.env.REACT_APP_url}api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            // console.log(response);

            const json = await response.json();
            // console.log(json);

            if (json.success && !localStorage.getItem('token')) {
                // Redirect to homepage
                console.log(localStorage.getItem('token'));
                localStorage.setItem('token', json.authtoken);
                props.showAlert("logged in sucessfully", "success")
                console.log("logged in successfully");
                history("/product");

            } else {
                props.showAlert("invalid credentials", "danger")
                console.log("invalid credentials");
            }
        } catch (error) {

            props.showAlert(error, "danger")
        }
    };



    return (
        <div>
            <div className="card my-5 mx-3">

                <form onSubmit={handleClick} >

                    <h3>Log-in</h3>
                    <div className="container mx-2 my-3" >
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} />
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                        <div className='my-3'>
                            <h2><b>dont have an account?</b> click <Link to="/signup">Sign in</Link></h2>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login
