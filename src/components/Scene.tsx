import {
    OrbitControls,
    useGLTF,
    Scroll,
    ScrollControls,
    useScroll,
    CameraControls,
} from "@react-three/drei";
import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";


const Scene = ({light, setLight }) => {
    const modelCouch = useGLTF("./model/couch2.glb");
    const modelLamp = useGLTF("./model/lamp.glb")
    const modelPendente = useGLTF("./model/lamp_02_lowpoly.glb")
    const modelSwitches = useGLTF("./model/outlets_and_switches.glb")

    return (
        <>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={light} />
            <pointLight position={[5, 5, 5]} intensity={1} castShadow />
            <directionalLight
                position={[0, 10, 10]}
                intensity={0.5}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <spotLight
                position={[0, 5, 5]}
                angle={0.3}
                penumbra={0.5}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                target-position={[0, 0, -0.8]} 
            />

            <primitive object={modelLamp.scene} scale={1.5} position={[3, -0.6, 0]} />
            <primitive object={modelPendente.scene} scale={1} position={[-1.5, 0.5, 0]}  />


            <primitive object={modelCouch.scene} scale={0.02} position={[5, -1, 0]} />
            <primitive object={modelSwitches.scene} scale={0.04} position={[-2, 0, -1]} rotation-y={3.1} />


        </>
    );
};

export default Scene;
