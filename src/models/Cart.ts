import { ProductCart } from "./Product"

// Interface for cart item which includes a product and quantity
export interface CartItem {
    product: ProductCart
    quantity: number
}

// Interface for the shopping cart
export interface ShoppingCart {
    userId: string
    cartId: number
    items: CartItem[]
    totalPrice: number
}
