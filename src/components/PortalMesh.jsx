import { RoundedBox, Image,Html } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
import usePortal from '../data/hook/usePortal';
import { useEffect, useState } from 'react';

const AnimatedImage = animated(Image);
const AnimatedRoundedBox = animated(RoundedBox);

const PortalMesh = ({ scale, onClose }) => {
    const { product } = usePortal();
    const [images, setImages] = useState([]);
    const [expandedImage, setExpandedImage] = useState(null);

    useEffect(() => {
        if (product && product.images) {
            setImages(product.images);
        }
    }, [product]);

    const handleClick = (index) => {
        if (expandedImage === index) {
            setExpandedImage(null);
        } else {
            setExpandedImage(index);
        }
    };

    const imageProps = useSpring({
        scale: expandedImage !== null ? [4 * scale, 4 * scale, 1] : [1, 1, 1],
        config: config.stiff,
    });

    const isSmallScreen = scale < 1;

    return (
        <group>
            {images.map((image, index) => (
                <group key={index} position={[
                    isSmallScreen ? 1.5 + (index * scale * -1.5) : 4 + (index * scale * -1.5),
                    isSmallScreen ? (index % 2 === 0 ? 5.2 : 3.2) : 5.2,
                    0
                ]}>
                    <AnimatedRoundedBox
                        args={[1.1, 1.1, 0.1]}
                        scale={imageProps.scale}
                        onClick={() => handleClick(index)}
                        visible={expandedImage === null || expandedImage === index}
                    >
                        <meshStandardMaterial color="gray-300" />
                    </AnimatedRoundedBox>
                    <AnimatedImage
                        url={`/images/products/${image}.webp`}
                        scale={imageProps.scale}
                        onClick={() => handleClick(index)}
                        visible={expandedImage === null || expandedImage === index}
                        position={[0, 0, 0.06]} // Slight offset to bring the image in front of the RoundedBox
                    />
                </group>
            ))}
            {expandedImage === null && (
                <Html position={[4 * scale, 4 * scale, 0]}>
                    <button
                        onClick={onClose}
                        className="absolute text-xs top-2 right-2 bg-red-500 text-white px-6 py-0.5 rounded"
                    >
                        Fechar
                    </button>
                </Html>
            )}
        </group>
    );
};

export default PortalMesh;
