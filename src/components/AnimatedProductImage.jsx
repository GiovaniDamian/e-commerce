import React, { useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import products from './../data/products.json'
import Image from 'next/image';

const AnimatedProductImage = ({ imageUrl, altText, productId, expanded, onClick, style, isSmallScreen, expandedProduct }) => {
    const [showModal, setShowModal] = useState(false)
    const [springProps, api] = useSpring(() => ({
        transform: 'scale(1)',
        zIndex: 1,
    }));

    const isMediumScreen = window.innerWidth > 450 && window.innerWidth <= 1300;

    const translateDetail = (key) => {
        const translations = {
            power: 'Potência',
            voltage: 'Voltagem',
            luminous_flux: 'Fluxo Luminoso',
            color_temperature: 'Temperatura de Cor',
            lifespan: 'Duração',
            features: 'Características',
            sensor_range: 'Alcance do Sensor',
            delay_time: 'Tempo de Atraso',
            current: 'Corrente',
            usb_output: 'Saída USB',
        };

        return translations[key] || key;
    };

    const translateSpecification = (key) => {
        const translations = {
            material: 'Material',
            size: 'Tamanho',
            weight: 'Peso',
        };

        return translations[key] || key;
    };

    useEffect(() => {
        const element = document.getElementById(`product-${productId}`)
        if (expanded && element) {
            const rect = element.getBoundingClientRect();
            const xOffset = (rect.width / 200) * (-productId * 2);
            const yOffset = (rect.top / 200) + (productId * 2);
            const topPosition = 200 + (productId * 8);

            let leftPosition;
            if (isSmallScreen) {
                leftPosition = productId === 1 ? 60 :( [2, 4, 6, 8].includes(productId)) ? -60 : 100;
            } else if (isMediumScreen) {
                leftPosition = (productId === 1 || [2, 3, 4].includes(productId)) ? -150 : 200;
            } else {
                leftPosition = 120;
            }

            api.start({
                transform: `scale(5) translate(${xOffset}px, ${yOffset - (productId * 6)}px)`,
                zIndex: 2,
                top: `${topPosition}px`,
                left: `${leftPosition}px`,
            });
            setShowModal(true);
        } else {
            api.start({
                transform: 'scale(1) translate(0px, 0px)',
                zIndex: 1,
                top: '0px',
                left: '0px'
            });
            setShowModal(false);
        }
    }, [expanded, productId, api, isSmallScreen, isMediumScreen]);

    const product = products.find(item => item.id === productId);

    return (
        <div className="relative">
            <animated.div
                id={`product-${productId}`}
                className="w-20 h-20 mx-auto m-2 rounded-lg relative overflow-hidden cursor-pointer"
                onClick={onClick}
                style={{ ...style, ...springProps }}
            >
                {!expandedProduct && (
                    <Image
                        src={imageUrl}
                        alt={altText}
                        width={500} height={500}
                        className="w-full h-full object-cover"
                    />
                )}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 text-white text-xss p-4" onMouseLeave={onClick}>
                        <button
                            className="absolute top-1 right-1 text-white px-1"
                            onClick={onClick}
                        >
                            x
                        </button>
                        <div className="w-full">
                            <h3 className="font-bold">{product.name}</h3>
                            <p className="mt-0.5">{product.description}</p>
                            <div className="flex">
                                {product.details && (
                                    <div className="mt-0.5 mr-1">
                                        <h4 className="font-bold underline">Detalhes</h4>
                                        <ul>
                                            {Object.keys(product.details).map((key, index) => (
                                                <li key={index} className="mt-0.5">
                                                    <strong>{translateDetail(key)}</strong>: {Array.isArray(product.details[key]) ? product.details[key].join(', ') : product.details[key]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {product.specifications && (
                                    <div className="mt-0.5 ml-1">
                                        <h4 className="font-bold underline">Especificações</h4>
                                        <ul>
                                            {Object.keys(product.specifications).map((key, index) => (
                                                <li key={index} className="mt-0.5">
                                                    <strong>{translateSpecification(key)}</strong>: {product.specifications[key]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </animated.div>
        </div>
    );
};

export default AnimatedProductImage;
