import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import cartContext from '../context/cart/cartContext';

function Cart(props) {
    // const context = useContext(cartContext)
    // const { fetchCartItems } = context
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_url}cart/display`, {
                    method: 'GET',
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                } else {
                    console.error('Failed to fetch cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error.message);
            }
        }; props.setProgress(40)

        fetchCartItems();
        props.setProgress(100)
    }, []);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const removeFromCart = async (productId) => {
        try {
            await fetch(`${process.env.REACT_APP_url}cart/remove/${productId}`, {
                method: 'DELETE',
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });

            setCartItems((prevCartItems) =>
                prevCartItems.map((item) => {
                    if (item.id === productId) {
                        const updatedItem = { ...item, quantity: item.quantity - 1 };
                        if (updatedItem.quantity === 0) {
                            props.showAlert("item removed", "success");
                            return null;
                        }
                        props.showAlert("item quantity decreased", "success");
                        return updatedItem;
                    }
                    return item;
                }).filter((item) => item !== null)
            );
        } catch (error) {
            console.error('Error removing item from the cart:', error.message);
        }
    };

    const increaseQuantity = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_url}cart/increaseQuantity/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem("token"),

                },
            });

            if (response.ok) {
                setCartItems((prevCartItems) =>
                    prevCartItems.map((item) =>
                        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
                        props.showAlert("item quantity increased", "success")
                    )
                );
            } else {
                props.showAlert("Failed to increase item quantity", "danger")
                console.error('Failed to increase item quantity');
            }
        } catch (error) {
            props.showAlert(error.message, "danger")

            console.error('Error increasing item quantity:', error.message);
        }


    };
    const handleCheckout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_url}cart/checkout`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                setCartItems([]);
                props.showAlert('Checkout successful', 'success');
            } else {
                console.error('Failed to checkout');
                props.showAlert('Failed to checkout', 'danger');
            }
        } catch (error) {
            console.error('Error during checkout:', error.message);
            props.showAlert('Error during checkout', 'danger');
        }
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Your Cart</h2>
            <ul className="list-group mb-3">
                {cartItems.map((item, index) => (
                    <li className="list-group-item" key={index} >
                        <div className="d-flex justify-content-between align-items-center" >
                            <strong>{item.name}</strong>
                            <div className="d-flex align-items-center" >
                                <div className="badge bg-primary rounded-pill me-2">{item.price}</div>
                                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => increaseQuantity(item.id)}>+</button>
                                <span className="me-2">{item.quantity}</span>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>-</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="alert alert-info">
                <strong>Total Price: {calculateTotalPrice()}</strong>
            </div>
            <button type="button" className="btn btn-primary mx-2 my-2" onClick={handleCheckout}>
                Checkout
            </button>
            <Link className="btn btn-primary mx-2 my-2" to="/product" role="cart">
                Continue Shopping
            </Link>
        </div>
    );
}

export default Cart;
