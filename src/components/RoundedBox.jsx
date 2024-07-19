import {
    Scroll,
    ScrollControls,
    RoundedBox
} from "@react-three/drei";
import RoundedBoxWithScroll from './RoundedBoxWithScroll';
import { useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import PromoBox from './PromoBox';

const AnimatedRoundedBox = animated(RoundedBox);

const RoundedBoxScroll = ({ scale, setLight }) => {
    const [active, setActive] = useState(null);

    const handleClick = (index) => {
        setActive(active === index ? null : index);
    };

    const springs = [0, 1, 2].map((i) =>
        useSpring({
            scale: active === i ? [3, 3, 1] : [1, 1, 1],
            position: active === i ? [0, 1, 2]
                : i === 0 ? [-1, -1, 1]
                    : i === 1 ? [0, -1, 1]
                        : [1, -1, 1],
            opacity: active === i ? 1 : 0
        })
    );

    return (
        <>
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
                                setLight={setLight}
                            />
                        ))}
                    </Scroll>
                </ScrollControls>
            ) : (
                springs.map((spring, index) => (
                    <AnimatedRoundedBox
                        key={index}
                        args={[scale * 2, scale * 2, 0]}
                        radius={0.05}
                        smoothness={4}
                        {...spring}
                        onClick={() => handleClick(index)}
                        visible={active === null || active === index}
                    >
                        <PromoBox index={index} scale={scale} />
                        <meshBasicMaterial color={index === 0 ? '#6c757d' : '#adb5bd'} />
                    </AnimatedRoundedBox>
                ))
            )}
        </>
    );
};

export default RoundedBoxScroll;
