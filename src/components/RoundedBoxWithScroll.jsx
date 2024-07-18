import { useSpring, animated, useTransition } from '@react-spring/three';
import { RoundedBox } from '@react-three/drei';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import PromoBox from './PromoBox';

const AnimatedBox = animated(RoundedBox);

export default function RoundedBoxWithScroll({ index, color, scale, spring, setLight }) {
    const scroll = useScroll();
    const ref = useRef();
    const [isExpanded, setIsExpanded] = useState(false);

    const [scrollSprings, api] = useSpring(() => ({
        position: [index, -10, 0],
        opacity: 0,
    }));

    useEffect(() => {
        setLight(1)
    }, [isExpanded])

    const transitions = useTransition(isExpanded, {
        from: { scale: [1, 1, 1], position: [index, -10, 0], opacity: 1 },
        enter: { scale: [4, 4, 1], position: [0, -6.5, 1.5], opacity: 1 },
        leave: { scale: [1, 1, 1], position: [index, -10, 0], opacity: 0 },
    });

    useFrame(() => {
        if (window.innerWidth > 768 && !isExpanded) {
            const y = scroll.scroll.current;
            const threshold = index / 3;

            let newY = -8;
            let newOpacity = 0;

            if (y > threshold) {
                newY = index + (y - threshold) * 3 - 12.2;
                newOpacity = (y - threshold) * 1;
            }

            api.start({
                position: [(-1.5 * scale) + (scale * index * 1.5), newY, 1],
                opacity: Math.min(newOpacity, 1),
            });
        }
    });

    return transitions((props, item) =>
        item ? (
            <AnimatedBox
                ref={ref}
                args={[scale * 1.2, scale * 1.2, 0]}
                radius={0.05}
                smoothness={4}
                {...props}
                onClick={() => {
                    setIsExpanded(false)
                }}
            >
                <animated.meshStandardMaterial attach="material" color={color} opacity={props.opacity} transparent />

                <PromoBox index={index} />
            </AnimatedBox>
        ) : (
            <AnimatedBox
                ref={ref}
                args={[scale * 1.2, scale * 1.2, 0]}
                radius={0.05}
                smoothness={4}
                position={scrollSprings.position}
                scale={spring.scale}
                onClick={() => {
                    setIsExpanded(true)
                }}
                >
                <animated.meshStandardMaterial attach="material" color={color} opacity={scrollSprings.opacity} transparent />
            </AnimatedBox>
        )
    );
}
