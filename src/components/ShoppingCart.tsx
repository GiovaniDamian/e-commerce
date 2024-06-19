import { ShoppingCart } from "../models/Cart";

export default function ShoppingCartComponent({ items = [], totalPrice }: ShoppingCart) {
    if (!items) {
        return <div>Loading...</div>;
    }

    return (
        <div className="border-2">
            <h1>Shopping Cart</h1>
            <div className="cart-items">
                {items.map((item, index) => (
                    <div key={index} className="cart-item">
                        <div className="product-details">
                            <h2>{item.product.name}</h2>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p>Total Price: ${totalPrice?.toFixed(2) ?? "0.00"}</p>
        </div>
    )
}
