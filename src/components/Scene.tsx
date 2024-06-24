import {
    OrbitControls,
    useGLTF,
    Scroll,
    ScrollControls,
    useScroll,
} from "@react-three/drei";
import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";


const Scene = () => {
    const model = useGLTF("./model/couch.glb");
    

    return (
        <>
            <ScrollControls pages={1}>

                <primitive object={model.scene} scale={2} position-z={-0.8} rotation-x={0.5} rotation-y={1} />

                <Scroll html>
                    
                </Scroll>
            </ScrollControls>

        </>
    );
};

export default Scene;
