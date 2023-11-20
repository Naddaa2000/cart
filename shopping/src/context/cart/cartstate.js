import react, { useState } from "react";
import cartContext from "../cart/cartContext";


const NoteState = (props) => {
    const initialnotes = []

    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState(initialnotes)

    //display all cart
    const fetchCartItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cart/display`, {
                method: 'GET',
                headers: {
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                const data = await response.json();
                setCartItems(data);
            } else {
                console.error('Failed to fetch cart items');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error.message);
        }
    };
    //add item to cart
    const addtoCart = async () => {
        try {

            const response = await fetch(`${process.env.REACT_APP_url}/product/display`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },


            });
            const json = await response.json();
            setNotes(json)

        } catch (error) {
            console.log({ message: error.message });
        }

    }


    //delete item from cart
    const removeFromCart = async (productId) => {
        try {
            await fetch(`${process.env.REACT_APP_url}/cart/remove/${productId}`, {
                method: 'DELETE',
                headers: {
                    "auth-token": localStorage.getItem("token"),
                    "Content-Type": "application/json",

                },
            });

            setCartItems((prevCartItems) =>
                prevCartItems.map((item) => {
                    if (item.id === productId) {
                        const updatedItem = { ...item, quantity: item.quantity - 1 };
                        if (updatedItem.quantity === 0) {
                            // props.showAlert("item removed", "success");
                            return null; // Remove the item from cart when quantity is zero
                        }
                        // props.showAlert("item quantity decreased", "success");
                        return updatedItem;
                    }
                    return item;
                }).filter((item) => item !== null)
            );
        } catch (error) {
            console.error('Error removing item from the cart:', error.message);
        }
    };

    //increase quantity item from cart
    const increaseQuantity = async (productId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_url}/cart/increaseQuantity/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    //  "auth-token": localStorage.getItem("token"),

                },
            });

            if (response.ok) {
                setCartItems((prevCartItems) =>
                    prevCartItems.map((item) =>
                        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
                    )
                );
            } else {
                console.error('Failed to increase item quantity');
            }
        } catch (error) {

            console.error('Error increasing item quantity:', error.message);
        }
    };

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

    const state = {
        "name": 'nada'
    }



    return (
        <cartContext.Provider value={{ state, fetchCartItems }}>
            {props.children}
        </cartContext.Provider>
    )
}

export default NoteState