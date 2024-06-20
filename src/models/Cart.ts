import { ProductCart } from "./Product"

export interface CartItem {
    product: ProductCart
    quantity: number
}

export interface ShoppingCart {
    items: CartItem[]
    totalPrice: number
}
