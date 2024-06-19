import { ProductCart } from "./Product"

// Interface for cart item which includes a product and quantity
export interface CartItem {
    product: ProductCart
    quantity: number
}

// Interface for the shopping cart
export interface ShoppingCart {
    items: CartItem[]
    totalPrice: number
}
