// ModalProducts.js
import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import products from './../data/products.json';
import AnimatedProductImage from './AnimatedProductImage'

const ModalProducts = ({ product, onClose}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [expandedProduct, setExpandedProduct] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 450);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleOpenProduct = (productId) => {
        setExpandedProduct(productId === expandedProduct ? null : productId);
    };

    if (!product) return null;

    const getProductDetails = (product) => {
        switch (product) {
            case "switches":
                return {
                    position: isSmallScreen ? [-1.65, 3.5, 0] : [-6, 3.7, 0], // Ajuste para switches
                    zIndex: 1, // Z-index inicial
                    xOffset: isSmallScreen ? 0 : -4, // Ajuste para xOffset
                    yOffset: isSmallScreen ? 0 : -1, // Ajuste para yOffset
                };
            case "sockets":
                return {
                    position: isSmallScreen ? [-1.5, 3.5, 0] : [1, 3.5, 0],
                    zIndex: 1,
                    xOffset: 0,
                    yOffset: 0,
                };
            case "bulbs":
                return {
                    position: isSmallScreen ? [-1.5, 3.5, 0] : [3.5, 3, 0],
                    zIndex: 1,
                    xOffset: 0,
                    yOffset: 0,
                };
            default:
                return { position: [0, 0, 0], zIndex: 1, xOffset: 0, yOffset: 0 };
        }
    };

    const { position, zIndex, xOffset, yOffset } = getProductDetails(product);

    const renderProducts = (items) =>
        items.map((item, index) => (
            <div
                key={index}
                className={`text-center my-2 dark:text-gray-200 ${isSmallScreen ? "m-1" : "m-4"
                    }`}
            >
                <AnimatedProductImage
                    imageUrl={item.image_url}
                    altText={item.name}
                    productId={item.id}
                    expanded={item.id === expandedProduct}
                    onClick={() => handleOpenProduct(item.id)}
                    style={{
                        transform: expandedProduct === item.id ? `translate(${xOffset}rem, ${yOffset}rem)` : "",
                        zIndex: expandedProduct === item.id ? 2 : zIndex,
                    }}
                />
                <div className="flex w-full items-center">
                    <p className="text-xs p-1 m-1 grow">
                        {product !== "switches"
                            ? item.name.split(" ").slice(0, 4).join(" ")
                            : item.name.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <p className="text-xs font-semibold align-center p-1 m-1">
                        R${item.price}
                    </p>
                </div>
            </div>
        ));

    const switchesProducts = products.filter(
        (item) => item.category === "switches"
    );

    return (
        <>
            <Html position={position}>
                <div
                    className={`relative bg-transparent pt-5 pb-3 shadow-lg border-black rounded-lg ${product == "sockets" && "flex"
                        } ${isSmallScreen && "flex"}`}
                >
                    <button
                        className="absolute text-xs top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 rounded"
                        onClick={onClose}
                    >
                        X
                    </button>
                    {product === "switches" && isSmallScreen ? (
                        <>
                            {renderProducts(switchesProducts.slice(0, 2))}
                        </>
                    ) : (
                        renderProducts(
                            products.filter((item) => item.category === product)
                        )
                    )}
                </div>
            </Html>
            {product === "switches" && isSmallScreen && (
                <Html
                    position={position.map(
                        (pos, index) => (index === 1 ? pos - 1.5 : pos)
                    )}
                >
                    <div className="relative bg-transparent pt-5 pb-3 shadow-lg border-black rounded-lg flex">
                        <button
                            className="absolute text-xs top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 rounded"
                            onClick={onClose}
                        >
                            X
                        </button>
                        {renderProducts(switchesProducts.slice(2))}
                    </div>
                </Html>
            )}
        </>
    );
};

export default ModalProducts;
