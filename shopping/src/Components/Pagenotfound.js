import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
function Pagenotfound() {

    return (
        <div className='my-3'>
            <h1>Oops! You seem to be lost.</h1>

            {localStorage.getItem('token') ? <form className="d-flex" role="search">

                <ul class="list-group">
                    <p>here are some helpful links</p>
                    <div className='container'>
                        <li> <Link to="/cart" role="button">View Cart</Link></li>
                        <li><Link to="/product" role="button">View Products</Link></li>
                    </div>

                </ul>
            </form> : ''}
            <div className='my-3'>
                <p>please click the above buttons in navigation section to perform any action</p>
            </div>



        </div>
    )
}

export default Pagenotfound
