import { Scroll, ScrollControls, RoundedBox } from "@react-three/drei";
import RoundedBoxWithScroll from './RoundedBoxWithScroll';
import { useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import PromoBox from './PromoBox';

const AnimatedRoundedBox = animated(RoundedBox);

const RoundedBoxScroll = ({ scale }) => {
    const [active, setActive] = useState(null);

    const handleClick = (index) => {
        setActive(active === index ? null : index);
    };

    const springs = {
        0: useSpring({
            scale: active === 0 ? [3, 3, 1] : [1, 1, 1],
            position: active === 0 ? [0, 1, 2] : [-1, -1, 1],
            opacity: active === 0 ? 1 : 0
        }),
        1: useSpring({
            scale: active === 1 ? [3, 3, 1] : [1, 1, 1],
            position: active === 1 ? [0, 1, 2] : [0, -1, 1],
            opacity: active === 1 ? 1 : 0
        }),
        2: useSpring({
            scale: active === 2 ? [3, 3, 1] : [1, 1, 1],
            position: active === 2 ? [0, 1, 2] : [1, -1, 1],
            opacity: active === 2 ? 1 : 0
        })
    };

    return (
        <group>
            {scale == '1' ? (
                <ScrollControls pages={2} damping={0.001}>
                    <Scroll>
                        {[0, 1, 2].map((index) => (
                            <RoundedBoxWithScroll
                                key={index}
                                index={index}
                                color={index === 0 ? '#6c757d' : '#adb5bd'}
                                scale={scale}
                                spring={springs[index]}
                            />
                        ))}
                    </Scroll>
                </ScrollControls>
            ) : (
                [0, 1, 2].map((index) => (
                    <AnimatedRoundedBox
                        key={index}
                        args={[scale * 2, scale * 2, 0]}
                        radius={0.05}
                        smoothness={4}
                        {...springs[index]}
                        onClick={() => handleClick(index)}
                        visible={active === null || active === index}
                    >
                        <PromoBox index={index} scale={scale} />
                        <meshBasicMaterial color={index === 0 ? '#6c757d' : '#adb5bd'} />
                    </AnimatedRoundedBox>
                ))
            )}
        </group>
    );
};

export default RoundedBoxScroll;
