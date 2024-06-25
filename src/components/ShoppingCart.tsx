import React, { useState } from 'react'
import { ShoppingCart, CartItem } from '../models/Cart'
import Image from 'next/image'
import useAppData from '../data/hook/useAppData'

export default function ShoppingCartComponent() {
    const { cart, removeCart, updateCartQuantity, resetCart } = useAppData()
    const [quantityInputs, setQuantityInputs] = useState<{ [key: string]: number }>({})
    const [tooltipState, setTooltipState] = useState<{ [key: string]: boolean }>({});
    const [resetTooltipState, setResetTooltipState] = useState<{ [key: string]: boolean }>({ restoreCart: false });

    const handleMouseEnter = (productName: string) => {
        setTooltipState({ ...tooltipState, [productName]: true });
    };

    const handleMouseLeave = (productName: string) => {
        setTooltipState({ ...tooltipState, [productName]: false });
    };

    const handleMouseEnterRestore = () => {
        setTooltipState({ ...tooltipState, restoreCart: true });
    };

    const handleMouseLeaveRestore = () => {
        setTooltipState({ ...tooltipState, restoreCart: false });
    };


    if (!cart || !cart.items || !updateCartQuantity || !removeCart) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (productName: string, quantity: number) => {
        setQuantityInputs({ ...quantityInputs, [productName]: quantity });
    };

    const handleUpdateQuantity = (productName: string, currentQuantity: number) => {
        const newQuantity = quantityInputs[productName] || currentQuantity;
        if (newQuantity !== currentQuantity) {
            updateCartQuantity(productName, newQuantity);
        }
    };

    const getButtonStyle = (productName: string) => {
        const currentQuantity = quantityInputs[productName] || cart.items.find(item => item.product.name === productName)?.quantity || 0;
        const originalQuantity = cart.items.find(item => item.product.name === productName)?.quantity || 0;
        if (currentQuantity !== originalQuantity) {
            return {
                display: 'block',
                backgroundColor: currentQuantity > originalQuantity ? '#4CAF50' : '#F44336',
            };
        } else {
            return {
                display: 'none',
            };
        }
    };
    return (
        <div className="flex flex-col mx-auto bg-gray-300 dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Shopping Cart</h1>
            <div className={`grid ${cart.items.length > 4 ? 'grid-cols-2' : 'grid-cols-1'} justify-center`}>
                    {cart.items.map((item, index) => (
                        <div key={index} className="flex items-center p-1 m-1 bg-white dark:bg-gray-700 rounded-lg shadow">
                            <div className="w-20 h-20 mr-4">
                                <Image src={item.product.image_url} alt={item.product.name} width={80} height={80} className="rounded-lg object-cover" priority={true} />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="font-semibold lg:text-sm text-gray-900 dark:text-gray-100">{item.product.name}</h2>
                                <div className="flex flex-row">
                                    <div className="w-full">
                                        <div className="flex flex-row mt-1 mr-2">
                                            <p className="text-gray-600 dark:text-gray-300 mr-1">Preço Unitário: ${item.product.price.toFixed(2)}</p>
                                            <p className="text-gray-600 dark:text-gray-300 ml-1">Preço Total/Item: <strong>${(item.product.price * item.quantity).toFixed(2)}</strong></p>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <p className="text-gray-600 dark:text-gray-300">Quantidade: {item.quantity} </p>
                                            <input
                                                type="number"
                                                value={quantityInputs[item.product.name] || item.quantity}
                                                onChange={(e) => handleQuantityChange(item.product.name, parseInt(e.target.value))}
                                                className="m-2 border dark:bg-gray-300 rounded p-1 w-1/5"
                                            />
                                            <div className="relative">
                                                <button
                                                    className="bg-transparent hover:bg-transparent text-white font-bold py-1 px-2 h-6 w-6 rounded relative"
                                                    style={getButtonStyle(item.product.name)}
                                                    onClick={() => handleUpdateQuantity(item.product.name, item.quantity)}
                                                    onMouseEnter={() => handleMouseEnter(item.product.name)}
                                                    onMouseLeave={() => handleMouseLeave(item.product.name)}
                                                >
                                                    {quantityInputs[item.product.name] > item.quantity ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                                                        </svg>
                                                    )}
                                                </button>
                                                {tooltipState[item.product.name] && (
                                                    <div className="absolute bg-black text-white px-2 py-1 rounded mt-2 -ml-8">
                                                        Atualize a quantidade
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center mt-1">
                                        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded mb-2" onClick={() =>
                                            removeCart({
                                                product: { name: item.product.name, price: item.product.price, image_url: item.product.image_url },
                                                quantity: 1,
                                            })
                                        } >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

            </div>
            <div className="flex flex-row mt-1 items-center">
                <div className="mt-1 mr-3 grow flex">
                    <button className="grow bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-4">
                        Ir para o pagamento
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold pl-4 py-2 pr-3 rounded flex items-center"
                        onMouseEnter={handleMouseEnterRestore}
                        onMouseLeave={handleMouseLeaveRestore}
                        onClick={resetCart}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4 mr-1">
                            <path d="M212.3 224.3H12c-6.6 0-12-5.4-12-12V12C0 5.4 5.4 0 12 0h48c6.6 0 12 5.4 12 12v78.1C117.8 39.3 184.3 7.5 258.2 8c136.9 1 246.4 111.6 246.2 248.5C504 393.3 393.1 504 256.3 504c-64.1 0-122.5-24.3-166.5-64.2-5.1-4.6-5.3-12.6-.5-17.4l34-34c4.5-4.5 11.7-4.7 16.4-.5C170.8 415.3 211.6 432 256.3 432c97.3 0 176-78.7 176-176 0-97.3-78.7-176-176-176-58.5 0-110.3 28.5-142.3 72.3h98.3c6.6 0 12 5.4 12 12v48c0 6.6-5.4 12-12 12z" />
                        </svg>
                        {tooltipState.restoreCart && (
                            <div className="absolute bg-black text-white px-2 py-1 rounded mt-16 ml-2">
                                Restaurar carrinho
                            </div>
                        )}
                    </button>
                </div>
                <p className="lg:text-xl font-bold text-gray-900 dark:text-gray-100">Total: R${cart.totalPrice.toFixed(2)}</p>
            </div>
        </div>
    )
}
