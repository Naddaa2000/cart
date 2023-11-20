import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar(props) {

    let history = useNavigate();

    let location = useLocation();
    // console.log(location.pathname);
    const handleLogout = () => {
        //props.showAlert("logged out", "success");
        localStorage.removeItem('token')
        history('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand" >Shopping.PK</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/product' ? "active" : "d-none"}`} aria-current="page" to="/product">Home</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className={`btn btn-primary mx-2 ${location.pathname === '/login' ? "d-none" : ""}`} to="/signup" role="button">Sign-up</Link>
                            <Link className={`btn btn-primary mx-2 ${location.pathname === '/login' ? "d-none" : ""}`} to="/login" role="button">Login</Link>s
                        </form> : <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
                        <Link className={`btn btn-primary mx-2 ${location.pathname === '/product' ? "" : "d-none"}`} to='/cart' role='cart'>View cart</Link>


                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar