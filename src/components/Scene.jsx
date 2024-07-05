import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import RoundedBox from './RoundedBox';
import ModalProducts from './ModalProducts';

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

    const initialRotations = {
        switches: [0, 3.1, 0],
        chandelier: [0, 0, 0],
        lamp: [0, 0, 0]
    };

    const [animationIndex, setAnimationIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const shakeAnimation = (initialRotation) => {
        return useSpring({
            from: { rotation: initialRotation },
            to: async (next) => {
                await next({ rotation: [initialRotation[0], initialRotation[1], initialRotation[2] - 0.1] });
                await next({ rotation: [initialRotation[0], initialRotation[1], initialRotation[2] + 0.1] });
                await next({ rotation: [initialRotation[0], initialRotation[1], initialRotation[2] - 0.1] });
                await next({ rotation: [initialRotation[0], initialRotation[1], initialRotation[2] + 0.1] });
                await next({ rotation: [initialRotation[0], initialRotation[1], initialRotation[2] - 0.1] });
                await next({ rotation: [initialRotation[0], initialRotation[1], initialRotation[2] + 0.1] });
                await next({ rotation: initialRotation });
            },
            config: { duration: 100 },
            reset: true,
        });
    };

    const animations = [
        shakeAnimation(initialRotations.switches),
        shakeAnimation(initialRotations.chandelier),
        shakeAnimation(initialRotations.lamp)
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationIndex((prev) => (prev + 1) % 3);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

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

    const handleMouseEnter = (productName) => {
        setSelectedProduct(productName);
        setShowModal(true);
    };

    const handleProductClick = (productName) => {
        setSelectedProduct(productName);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

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

            <animated.primitive
                object={modelSwitches.scene}
                scale={0.04 * scale}
                position={positions.switches}
                rotation={animationIndex === 0 ? animations[0].rotation : initialRotations.switches}
                onPointerEnter={() => handleMouseEnter("switches")}
                onClick={() => handleProductClick("switches")}
            />
            <animated.primitive
                object={modelChandelier.scene}
                scale={1 * scale}
                position={positions.chandelier}
                rotation={animationIndex === 1 ? animations[1].rotation : initialRotations.chandelier}
                onPointerEnter={() => handleMouseEnter("sockets")}
                onClick={() => handleProductClick("sockets")}
            />
            <animated.primitive
                object={modelLamp.scene}
                scale={1.5 * scale}
                position={positions.lamp}
                rotation={animationIndex === 2 ? animations[2].rotation : initialRotations.lamp}
                onPointerEnter={() => handleMouseEnter("bulbs")}
                onClick={() => handleProductClick("bulbs")}
            />

            <primitive object={modelCouch.scene} scale={0.02 * scale} position={positions.couch} />
            <RoundedBox scale={scale} setLight={setLight} />

            {showModal && <ModalProducts product={selectedProduct} onClose={handleCloseModal}/>}
        </>
    );
};

export default Scene;
