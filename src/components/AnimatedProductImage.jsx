// AnimatedProductImage.js
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import products from './../data/products.json';

const AnimatedProductImage = ({ imageUrl, altText, productId, expanded, onClick, style }) => {
    const [showModal, setShowModal] = useState(false);
    const [springProps, api] = useSpring(() => ({
        transform: 'scale(1)',
        zIndex: 1,
    }));

    // Atualiza a animação quando `expanded` muda
    useEffect(() => {
        if (expanded) {
            const element = document.getElementById(`product-${productId}`);
            const xOffset = 0;
            const yOffset = 0;

            api.start({
                transform: `scale(4) translate(${xOffset}px, ${yOffset}px)`,
                zIndex: 2,
                top: '50px',
                left: `120px`,
            });
            setShowModal(true);
        } else {
            api.start({
                transform: 'scale(1) translate(0px, 0px)',
                zIndex: 1,
                top: '0px',
                left:'0px'
            });
            setShowModal(false);
        }
    }, [expanded, productId, api]);

    const product = products.find(item => item.id === productId);

    return (
        <div className="relative">
            <animated.div
                id={`product-${productId}`}
                className="w-20 h-20 mx-auto m-2 rounded-lg relative overflow-hidden cursor-pointer"
                onClick={onClick}
                style={{
                    ...style,
                    ...springProps,
                }}
            >
                <img
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-full object-cover"
                />
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm p-4">
                        <button
                            className="absolute top-1 right-1 bg-red-500 text-white px-1 rounded"
                            onClick={() => onClick()}
                        >
                            X
                        </button>
                        <div className="max-w-lg">
                            <h3 className="font-bold">{product.name}</h3>
                            <p className="mt-2">{product.description}</p>
                            <p className="mt-2 font-semibold">{product.price}</p>
                        </div>
                    </div>
                )}
            </animated.div>
        </div>
    );
};

export default AnimatedProductImage;
