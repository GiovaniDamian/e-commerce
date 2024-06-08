// Interface for product details
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

// Interface for product specifications
interface ProductSpecifications {
    material: string;
    size: string;
    weight: string;
}

// Interface for a product
export interface Product {
    name: string;
    price: string;
    description: string;
    details: ProductDetails;
    specifications: ProductSpecifications;
    category: string;
    image_url: string;
    product_url: string;
}

// Interface for the list of products categorized
interface ProductCategories {
    bulbs: Product[];
    sockets: Product[];
    outlets: Product[];
    switches: Product[];
}

// Interface for the overall product structure
export interface Products {
    products: ProductCategories;
}
