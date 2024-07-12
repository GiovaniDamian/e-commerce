import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import products from './../data/products.json';
import AnimatedProductImage from './AnimatedProductImage';
import usePortal from '../data/hook/usePortal';

const ModalProducts = ({ product, onClose }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const [expandedProduct, setExpandedProduct] = useState(null);
    const { portalState, activatePortal } = usePortal();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
            setIsMediumScreen(window.innerWidth >= 600 && window.innerWidth <= 1000);
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

    const handleView3DModel = (itemSelected) => {
        activatePortal(itemSelected);
    };

    if (!product) return null;

    const getProductDetails = (product) => {
        switch (product) {
            case "switches":
                return {
                    position: isSmallScreen ? [-1.65, 3.5, 0] : isMediumScreen ? [-2.7, 3, 0] : [-6, 3.6, 0], // Ajuste para switches
                    zIndex: 1, // Z-index inicial
                    xOffset: isSmallScreen ? 0 : isMediumScreen ? -2 : -4, // Ajuste para xOffset
                    yOffset: isSmallScreen ? 0 : isMediumScreen ? -0.5 : -1, // Ajuste para yOffset
                };
            case "sockets":
                return {
                    position: isSmallScreen ? [-1.5, 3.5, 0] : [0.5, 3.5, 0],
                    zIndex: 1,
                    xOffset: 0,
                    yOffset: 0,
                };
            case "bulbs":
                return {
                    position: isSmallScreen ? [-1.5, 3.5, 0] : [3, 3, 0],
                    zIndex: 1,
                    xOffset: 0,
                    yOffset: 0,
                };
            default:
                return { position: [0, 0, 0], zIndex: 1, xOffset: 0, yOffset: 0 };
        }
    };

    const { position } = getProductDetails(product);

    const renderProducts = (items) =>
        items.map((item, index) => (
            <div key={index}>
                <button onClick={() => handleView3DModel(item)}>View 3D Model</button>
               <AnimatedProductImage
                    imageUrl={item.image_url}
                    altText={item.name}
                    productId={item.id}
                    scale={2}
                    expanded={item.id === expandedProduct}
                    onClick={() => handleOpenProduct(item.id)}
                    style={{
                        transform: expandedProduct === item.id ? "translate(0, -6rem)" : "",
                        zIndex: expandedProduct === item.id ? 2 : 1,
                    }}
                    isSmallScreen={isSmallScreen}
                    expandedProduct={expandedProduct}
                />
                <div className="flex w-full items-center">
                    <p className="text-xs p-1 m-1">
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
                    className={`relative bg-transparent pt-5 pb-3 shadow-lg border-black rounded-lg ${product == "sockets" && "flex"} ${isSmallScreen && "flex"}`}
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
                    <div className={`relative ${!expandedProduct && 'bg-gray-300 bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-80'} pt-5 pb-3 shadow-lg border-black mt-16 rounded-lg flex`}>
                        {!expandedProduct &&
                            <button
                                className="absolute text-xs top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 rounded"
                                onClick={onClose}
                            >
                                X
                            </button>
                        }
                        {renderProducts(switchesProducts.slice(2))}
                    </div>
                </Html>
            )}
        </>
    );
};

export default ModalProducts;
