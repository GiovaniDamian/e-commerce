import React from 'react'
import { ShoppingCart, CartItem } from '../models/Cart'
import Image from 'next/image'

export default function ShoppingCartComponent({ items = [], totalPrice }: ShoppingCart) {
    if (!items) {
        return <div>Loading...</div>
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Shopping Cart</h1>
            <div className="flex flex-row space-x-4">
                <div>
                    {items.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center p-4 m-1 bg-white dark:bg-gray-700 rounded-lg shadow">
                            <div className="w-20 h-20 mr-4">
                                <Image src={item.product.image_url} alt={item.product.name} width={80} height={80} className="rounded-lg object-cover" />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{item.product.name}</h2>
                                <p className="text-gray-600 dark:text-gray-300">Price: ${item.product.price.toFixed(2)}</p>
                                <p className="text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded mb-2">
                                    Remove
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                    Adjust Quantity
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    {items.slice(4).map((item, index) => (
                        <div key={index} className="flex items-center p-4 m-1 bg-white dark:bg-gray-700 rounded-lg shadow">
                            <div className="w-20 h-20 mr-4">
                                <Image src={item.product.image_url} alt={item.product.name} width={80} height={80} className="rounded-lg object-cover" />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{item.product.name}</h2>
                                <p className="text-gray-600 dark:text-gray-300">Price: ${item.product.price.toFixed(2)}</p>
                                <p className="text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded mb-2">
                                    Remove
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                    Adjust Quantity
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" mt-6 text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    )
}
