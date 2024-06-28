import { useSpring, animated } from '@react-spring/three';
import { RoundedBox } from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const AnimatedBox = animated(RoundedBox);

export default function RoundedBoxWithScroll({ index, color, scale, clickHandler }) {
    const scroll = useScroll()
    const ref = useRef()

    const [springs, api] = useSpring(() => ({
        position: [index, -10, 0],
        opacity: 0,
    }));

    useFrame(() => {
        const y = scroll.scroll.current
        const threshold = index / 3

        let newY = -8
        let newOpacity = 0

        if (y > threshold) {
            newY = index + (y - threshold) * 3 - 12.2
            newOpacity = (y - threshold) * 1
        }

        api.start({
            position: [(-1.5 * scale) + (scale * index * 1.5), newY, 1],
            opacity: Math.min(newOpacity, 1),
        });
    });
        
    return (
        <>
            <AnimatedBox
                ref={ref}
                args={[scale * 1.2, scale * 1.2, 0]}
                radius={0.05}
                smoothness={4}
                position={springs.position}
                onClick={clickHandler}
            >
                <animated.meshStandardMaterial attach="material" color={color} opacity={springs.opacity} transparent />
            </AnimatedBox>
        </>
    );
};
