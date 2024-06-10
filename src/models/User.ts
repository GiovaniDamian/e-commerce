import { ShoppingCart } from "./Cart"

export interface User {
    uid: string
    email: string
    name: string
    token: string
    provider: string
    imageUrl: string
    cart?: ShoppingCart
}
