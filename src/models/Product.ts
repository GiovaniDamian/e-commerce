
interface ProductDetails {
    power?: string;
    voltage?: string;
    luminous_flux?: string;
    color_temperature?: string;
    lifespan?: string;
    features?: string[];
    sensor_range?: string;
    delay_time?: string;
    current?: string;
    usb_output?: string;
}


interface ProductSpecifications {
    material: string
    size: string
    weight: string
}


export interface Product {
    id: number
    name: string
    price: number
    description: string
    details: ProductDetails
    specifications: ProductSpecifications
    category: string
    image_url: string
    product_url: string
    images: []
    options?: ProductOptions
}

export interface ProductCart {
    name: string
    price: number
    image_url: string
    options?: ProductOptions
}

export interface ProductPromo {
    products: [{name: string , quantity: number}]
    price: number
    image_url: string
}

interface ProductOptions {
    color?: string;
    power?: string;
    switches?: number;
}
