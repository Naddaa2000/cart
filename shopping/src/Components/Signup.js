import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
    useEffect(() => {

        props.setProgress(100)

    }, [])
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log("hi" + process.env.url);
        const { name, email, password, } = credentials;
        const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        // if (!(note.title && note.description)) {
        //     return console.log("cannot add empty data");
        // }


        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            console.log("account created sucessfully", "success")
            props.showAlert("account created sucessfully", "success")
            history('/login')
        }
        else {
            console.log("invalid data", "danger")
            props.showAlert("invalid data entered", "danger")
        }
    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container my-3 md-2 mx-2'>
            <h1>Welcome to Shop.pk</h1>

            <form className=" card row g-2  " onSubmit={handleSubmit}>
                <h3>Sign in</h3>
                <div className="col-md-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onchange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onchange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onchange} />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
