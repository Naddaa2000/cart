import React, { useState, useEffect, useContext } from 'react';
import { json, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert"
import ProductItem from './ProductItem';
function Product(props) {
    //const state = useContext(cartContext)
    // const { addtoCart } = state
    let history = useNavigate();
    const initialnotes = []
    const [product, setProduct] = useState(initialnotes)
    const [cart, setCart] = useState()

    useEffect(() => {
        const displayProduct = async () => {
            try {

                const response = await fetch(`${process.env.REACT_APP_url}product/display`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },


                });
                const json = await response.json();
                setProduct(json)


            } catch (error) {
                console.log({ message: error.message });
            }

        }
        props.setProgress(50)
        displayProduct()
        props.setProgress(100)

        // eslint-disable-next-line
    }, []);

    const handleCart = async (product) => {
        try {
            const cartItem = {
                name: product.name,
                price: product.price,
            };
            const response = await fetch(`${process.env.REACT_APP_url}cart/add`, {
                method: "POST",
                headers: {

                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),

                },
                body: JSON.stringify(cartItem)
            });

            const data = await response.json();
            //console.log(response.ok);
            if (response.ok) {
                props.showAlert("item added to Cart", "success")
                console.log("Item added to cart:", data);
                setCart(data);
            } else {
                props.showAlert("item not added to cart", "danger");
                history('/login')
                console.error("Error adding item to cart:", data.message);
            }
        } catch (error) {
            console.error("Error adding item to carts:", error.message);
        }
    };


    return (
        <>

            <Alert alert={alert} />
            <div className="row my-3">
                <h2>Products</h2>
                <div className="container ">
                    {/* if You dont have else condition we use && operator */}
                    {product.length === 0 && "No product to display"}

                </div>
                {product.map((product, index) => {

                    return (
                        <>
                            <ProductItem key={index} product={product} showAlert={props.showAlert} handleCart={handleCart}></ProductItem>
                        </>
                    );
                })}
            </div>
        </>
    )
}

export default Product
