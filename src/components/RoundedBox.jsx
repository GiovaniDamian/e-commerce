import {
    MeshPortalMaterial,
    Scroll,
    ScrollControls,
    RoundedBox
} from "@react-three/drei";
import RoundedBoxWithScroll from './RoundedBoxWithScroll';
import { useState, useRef, useEffect } from "react";

const RoundedBoxScroll = ({ scale, setLight }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
    }, [active])
    function clickHandler0() {
        setActive(!active);
    };
    function clickHandler1() {
        setActive(!active);
    };
    function clickHandler2() {
        setActive(!active);
    };

    if (scale == '1') {
        return (
            <>
                <ScrollControls pages={2} damping={0.001} children>
                    <Scroll>
                        <RoundedBoxWithScroll index={0} color='yellow' scale={scale} clickHandler={clickHandler0} >

                        </RoundedBoxWithScroll>
                        <RoundedBoxWithScroll index={1} color='orange' scale={scale} clickHandler={clickHandler1} >

                        </RoundedBoxWithScroll>
                        <RoundedBoxWithScroll index={2} color='orange' scale={scale} clickHandler={clickHandler2 } >

                        </RoundedBoxWithScroll>
                    </Scroll>
                </ScrollControls>
            </>
        );
    }
    else {
        return (
            <>
                <RoundedBox
                    args={[scale * 2, scale * 2, 0]}
                    radius={0.05}
                    smoothness={4}
                    position={[-1, -1, 1]}
                    onClick={clickHandler0}
                ><meshBasicMaterial color="yellow" />
                </RoundedBox>
                <RoundedBox args={[scale * 2, scale * 2, 0]}
                    radius={0.05}
                    smoothness={4}
                    position={[0, -1, 1]}
                    onClick={clickHandler1}
                ><meshBasicMaterial color="orange" />
                </RoundedBox>
                <RoundedBox args={[scale * 2, scale * 2, 0]}
                    radius={0.05}
                    smoothness={4}
                    position={[1, -1, 1]}
                    onClick={clickHandler2}
                ><meshBasicMaterial color="#111" />
                </RoundedBox>

            </>
        )
    }




};

export default RoundedBoxScroll;
