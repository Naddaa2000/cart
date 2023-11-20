import React from 'react'

function ProductItem(props) {
    const { product, handleCart } = props;

    return (
        <div className='col-md-4'>

            <div className="card my-3">


                <div className="card-body">
                    <h5 className="card-title"> </h5>
                    <h5 className="card-title"> Name: {product.name}</h5>
                    <p className="card-text">Price: {product.price}</p>
                    <i className="fa-solid fa-cart-plus" onClick={() => handleCart(product)}>
                        <div className="container my-2">

                        </div>
                    </i>


                </div>
            </div>

        </div>

    )
}

export default ProductItem
