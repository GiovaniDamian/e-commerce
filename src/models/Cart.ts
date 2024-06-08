import { Product } from "./Product";

// Interface for cart item which includes a product and quantity
export interface CartItem {
    product: Product;
    quantity: number;
}

// Interface for the shopping cart
export interface ShoppingCart {
    userId: string;
    items: CartItem[];
    totalPrice: number;
}
