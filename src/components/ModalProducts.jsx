import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import products from './../data/products.json';
import AnimatedProductImage from './AnimatedProductImage';
import usePortal from '../data/hook/usePortal';
import useAppData from '../data/hook/useAppData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ModalProducts = ({ product, onClose }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const [expandedProduct, setExpandedProduct] = useState(null);
    const { portalState, activatePortal } = usePortal();
    const [selectedOptions, setSelectedOptions] = useState({});
    const { addCart, updateCartQuantity } = useAppData();
    const [quantities, setQuantities] = useState({});

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

    const handleOptionSelect = (productId, optionType, optionValue) => {
        setSelectedOptions({
            ...selectedOptions,
            [productId]: {
                ...selectedOptions[productId],
                [optionType]: optionValue,
            }
        });
    };

    const handleIncrement = (productId) => {
        setQuantities({
            ...quantities,
            [productId]: (quantities[productId] || 1) + 1
        });
    };

    const handleDecrement = (productId) => {
        setQuantities({
            ...quantities,
            [productId]: Math.max((quantities[productId] || 1) - 1, 1)
        });
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        addCart({
            product: {
                name: product.name, price: product.price, image_url: product.image_url, options: selectedOptions[product.id]
            },
            quantity: quantity,
        })
    };

    if (!product) return null;

    const getProductDetails = (product) => {
        switch (product) {
            case "switches":
                return {
                    position: isSmallScreen ? [-2, 3.5, 0] : isMediumScreen ? [-2.7, 3, 0] : [-6, 3.6, 0],
                    zIndex: 1,
                    xOffset: isSmallScreen ? 0 : isMediumScreen ? -2 : -4,
                    yOffset: isSmallScreen ? 0 : isMediumScreen ? -0.5 : -1,
                };
            case "sockets":
                return {
                    position: isSmallScreen ? [-2, 3.5, 0] : [0.5, 3.5, 0],
                    zIndex: 1,
                    xOffset: 0,
                    yOffset: 0,
                };
            case "bulbs":
                return {
                    position: isSmallScreen ? [-2, 3.5, 0] : [3, 3, 0],
                    zIndex: 1,
                    xOffset: 0,
                    yOffset: 0,
                };
            default:
                return { position: [0, 0, 0], zIndex: 1, xOffset: 0, yOffset: 0 };
        }
    };

    const { position } = getProductDetails(product);

    const translateOption = (optionType) => {
        switch (optionType) {
            case "color":
                return "cor";
            case "power":
                return "potência";
            case "switches":
                return "tomadas";
            default:
                return optionType;
        }
    };

    const renderOptions = (item) => {
        const options = item.options;

        if (!options) return null;

        return (
            <div className="m-1 text-xsm">
                {Object.keys(options).map((optionType, index) => (
                    <div key={index} className="mb-2">
                        <strong>{translateOption(optionType.replace(/_/g, ' '))}</strong>
                        <div className={`flex ${isSmallScreen && 'flex-col'}`}>
                            {options[optionType].map((optionValue, idx) => (
                                <button
                                    key={idx}
                                    className={`px-1 m-0.5 rounded ${selectedOptions[item.id]?.[optionType] === optionValue
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-gray-700"
                                        }`}
                                    onClick={() => handleOptionSelect(item.id, optionType, optionValue)}
                                >
                                    {optionValue}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderProducts = (items) =>
        items.map((item, index) => (
            <div key={index} className="relative mt-5 mx-0.5 bg-gray-200 rounded-lg">
                <div className={`flex`}>
                    <div className="flex flex-col items-center m-2 bg-gray-400 dark:bg-gray-900 rounded">
                        {item.images.map((img, i) => (
                            <img
                                key={i}
                                src={`/images/products/${img}.webp`}
                                alt={`Thumbnail ${i + 1}`}
                                className="w-2.5 h-2.5 object-cover m-0.5 cursor-pointer"
                                onClick={() => handleView3DModel(item)}
                            />
                        ))}
                    </div>
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
                    {renderOptions(item)}
                </div>
                <div className="flex flex-col w-full items-center">
                    <p className={`${isSmallScreen ? 'text-xsm' : 'text-xs'} p-0.5 w-full mx-3 text-center truncate bg-gray-400 dark:bg-gray-700 rounded dark:text-white"`}>
                        {product !== "switches"
                            ? item.name.split(" ").slice(0, 4).join(" ")
                            : item.name.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <div className="flex flex-row">
                        <div className="flex items-center text-xsm">
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => handleDecrement(item.id)}
                            >
                                -
                            </button>
                            <span className="mx-2">{quantities[item.id] || 1}</span>
                            <button
                                className="bg-green-500 text-white px-2 py-1 rounded"
                                onClick={() => handleIncrement(item.id)}
                            >
                                +
                            </button>
                        </div>
                        <button
                            className="m-1 bg-blue-500 text-white px-1 py-0.5 rounded text-xsm"
                            onClick={() => handleAddToCart(item)}
                        >
                            + <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        </button>
                        <p className="text-xs font-semibold align-center p-1 m-1">
                            R${item.price.toFixed(2)}
                        </p>
                    </div>
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
                    className={`relative bg-gray-300/75 dark:bg-gray-700/50 dark:text-gray-400 pt-5 pb-3 shadow-lg border-black rounded-lg ${product == "sockets" && "flex"} ${isSmallScreen && "flex"}`}
                >
                    <button
                        className="absolute text-xs top-1 right-2 bg-red-500 text-white px-1.5  rounded"
                        onClick={onClose}
                    >
                        x
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
