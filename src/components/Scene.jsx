import {
    OrbitControls,
    useGLTF
} from "@react-three/drei";
import { useState, useEffect } from "react";
import RoundedBox from './RoundedBox';

const Scene = ({ light, setLight }) => {
    const modelCouch = useGLTF("./model/couch2.glb");
    const modelLamp = useGLTF("./model/lamp.glb");
    const modelChandelier = useGLTF("./model/lamp_02_lowpoly.glb");
    const modelSwitches = useGLTF("./model/outlets_and_switches.glb");

    const [scale, setScale] = useState(1);
    const [positions, setPositions] = useState({
        switches: [-2, 0, -1],
        chandelier: [0, 0.5, 0],
        couch: [5, -1, 0],
        lamp: [3, -0.6, 0]
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 450) {
                setScale(0.4);
                setPositions({
                    switches: [-0.9, 0, -0.25],
                    chandelier: [0, 0.15, 0],
                    couch: [2, -0.3, 0],
                    lamp: [1.4, -0.3, 0]
                });
            } else if (window.innerWidth < 950) {
                setScale(0.5);
                setPositions({
                    switches: [-1, 0, -0.5],
                    chandelier: [0, 0.25, 0],
                    couch: [2.5, -0.5, 0],
                    lamp: [1.5, -0.5, 0]
                });
            } else {
                setScale(1);
                setPositions({
                    switches: [-2, 0, -1],
                    chandelier: [0, 0.5, 0],
                    couch: [5, -1, 0],
                    lamp: [3, -1, 0]
                });
            }

        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


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

            <primitive object={modelSwitches.scene} scale={0.04 * scale} position={positions.switches} rotation-y={3.1} />
            <primitive object={modelChandelier.scene} scale={1 * scale} position={positions.chandelier} />
            <primitive object={modelCouch.scene} scale={0.02 * scale} position={positions.couch} />
            <primitive object={modelLamp.scene} scale={1.5 * scale} position={positions.lamp} />

            <RoundedBox scale={scale} setLight={setLight} />
        </>
    );
};

export default Scene;
