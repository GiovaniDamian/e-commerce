import { Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import promos from '../data/promo.json';
import useAppData from '../data/hook/useAppData';

export default function PromoBox({ index, scale }) {
    const promo = promos[index];
    const lineRef = useRef();
    const [hovered, setHovered] = useState(false);
    const { addCart } = useAppData();

    let adjustedScale = 1;
    if (scale === 0.4) { adjustedScale = 0.6; }
    else if (scale === 0.5) { adjustedScale = 0.8; }

    useFrame(() => {
        if (lineRef.current) {
            lineRef.current.geometry.setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0.38 * adjustedScale, 0, 0)
            ]);
        }
    });

    const handleAddToCart = () => {
        const cartItem = {
            product: {
                name: `Combo ${index + 1}`,
                price: promo.price,
                image_url: promo.image_url,
            },
            quantity: 1
        };
        addCart(cartItem);
    };

    return (
        <>
            <Text
                key={`combo-${index}`}
                fontSize={0.08 * adjustedScale}
                color="black"
                font="./fonts/Inter-Bold.ttf"
                position-z={0.5}
                maxWidth={1}
                textAlign="center"
                anchorY={-0.55 * adjustedScale}
            >
                COMBO {index + 1}
            </Text>
            {promo.products.map((item, idx) => (
                <>
                    <Text
                        key={`item-name-${idx}`}
                        fontSize={0.059 * adjustedScale}
                        color="black"
                        font="./fonts/Inter-Bold.ttf"
                        position-z={0.5}
                        maxWidth={0.8}
                        textAlign="justify"
                        anchorY={-(idx * 0.2) * adjustedScale}
                        anchorX={0.55 * adjustedScale}
                    >
                        {item.name}
                    </Text>
                    <Text
                        key={`item-quantity-${idx}`}
                        fontSize={0.04 * adjustedScale}
                        color="black"
                        font="./fonts/Inter-Bold.ttf"
                        position-z={0.5}
                        maxWidth={1}
                        textAlign="right"
                        anchorY={-(idx * 0.17) * adjustedScale}
                        anchorX={-0.4 * adjustedScale}
                    >
                        ({item.quantity}un)
                    </Text>
                </>
            ))}
            <Text
                key={`old-price-${index}`}
                fontSize={0.06 * adjustedScale}
                color="black"
                font="./fonts/Inter-Bold.ttf"
                position-z={0.5}
                maxWidth={1}
                anchorY={0.3 * adjustedScale}
                anchorX={0.45 * adjustedScale}
            >
                {`De: R$${promo.price}`}
            </Text>
            <line ref={lineRef} position={[-0.45 * adjustedScale, -0.34 * adjustedScale, 0.55]}>
                <bufferGeometry />
                <lineBasicMaterial color="black" />
            </line>
            <Text
                key={`new-price-${index}`}
                fontSize={0.09 * adjustedScale}
                color="black"
                font="./fonts/Inter-Bold.ttf"
                position-z={0.5}
                maxWidth={1}
                anchorY={0.4 * adjustedScale}
                anchorX={0.45 * adjustedScale}
            >
                {`Por: R$${(promo.price * 0.8).toFixed(2)}`}
            </Text>
            <Text
                key={`new-price-shadow-${index}`}
                fontSize={0.089 * adjustedScale}
                color="red"
                font="./fonts/Inter-Bold.ttf"
                position-z={0.51}
                maxWidth={1}
                anchorY={0.4 * adjustedScale}
                anchorX={0.45 * adjustedScale}
            >
                {`Por: R$${(promo.price * 0.8).toFixed(2)}`}
            </Text>
            <group position={[0.35 * adjustedScale, -0.4 * adjustedScale, 0.5]}>
                <mesh
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={handleAddToCart}
                >
                    <boxGeometry args={[0.3 * adjustedScale, 0.1 * adjustedScale, 0.01]} />
                    <meshBasicMaterial color={hovered ? "#1E40AF" : "#2563EB"} />
                </mesh>
                <Text
                    fontSize={0.025 * adjustedScale}
                    color="white"
                    font="./fonts/Inter-Bold.ttf"
                    position-z={0.01}
                    textAlign="center"
                >
                    Adicionar ao Carrinho
                </Text>
            </group>
        </>
    );
}
