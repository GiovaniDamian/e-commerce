import { ShoppingCart } from "../models/Cart";

export default function ShoppingCartComponent({ userId, cartId, items = [], totalPrice }: ShoppingCart) {
    if (!items) {
        return <div>Loading...</div>;
    }

    return (
        <div className="border-2">
            <h1>Shopping Cart</h1>
            <p>User ID: {userId}</p>
            <p>Cart ID: {cartId}</p>
            <div className="cart-items">
                {items.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.product.image_url} alt={item.product.name} className="product-image" />
                        <div className="product-details">
                            <h2>{item.product.name}</h2>
                            <p>{item.product.description}</p>
                            <p>Price: ${item.product.price.toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p>Total Price: ${totalPrice?.toFixed(2) ?? "0.00"}</p>
        </div>
    )
}
