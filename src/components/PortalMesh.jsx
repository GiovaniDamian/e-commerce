import { useGLTF, RoundedBox, CameraControls, Html } from "@react-three/drei";
import usePortal from '../data/hook/usePortal';
import { useSpring, animated } from '@react-spring/three';
import { useRef, useEffect, useState } from 'react';

const AnimatedBox = animated(RoundedBox);

const PortalMesh = ({ scale, onClose }) => {
    const { product } = usePortal();
    const ref = useRef();
    const {images, setImages} = useState([])
    useEffect(() => {
        setImages(product.images)
    console.log(images)
    }, [product])
    return (
        <group>
            {product && product.images && product.images.map((image, index) => (
                <AnimatedBox
                    key={index}
                    imageUrl={`./images/products/${image}.webp`}
                    args={[1, 1, 0]}
                    position={[4.5-(index * 1.5 ), 5.2, 0]} // Ajuste a posição conforme necessário
                    scale={scale * 2}
                >
                </AnimatedBox>
            ))}
            <Html position={[3, 4.5, 0]}>
                <button
                    onClick={onClose}
                    className="absolute text-xs top-2 right-2 bg-red-500 text-white px-6 py-0.5 rounded"
                >
                    Fechar
                </button>
            </Html>
        </group>
    );
};

export default PortalMesh;
