import React from 'react'

function cartItem(props) {
    const { item, increaseQuantity, removeFromCart } = props;

    return (

        <li className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
                <strong>{item.name}</strong>
                <div className="d-flex align-items-center">
                    <div className="badge bg-primary rounded-pill me-2">{item.price}</div>
                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => increaseQuantity(item.id)}>+</button>
                    <span className="me-2">{item.quantity}</span>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)}>-</button>
                </div>
            </div>
        </li>

    )
}

export default cartItem
