import {
    useGLTF,
    MeshPortalMaterial,
    CameraControls,
    Html,
} from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";

const PortalMesh = ({ modelPath, onClose, cameraControlsRef }) => {
    const [blendFactor, setBlendFactor] = useState(0); // Estado para controlar a suavização
    const meshPortalMaterialRef = useRef();
    const model = useGLTF('./model/led_lamp.glb');

    // Atualiza o blendFactor gradualmente para suavização
    useEffect(() => {
        const easeSpeed = 0.1; // Velocidade de suavização (ajuste conforme necessário)

        const updateBlend = () => {
            const targetBlend = 1; // Sempre visível ao ativar
            const delta = targetBlend - blendFactor;
            setBlendFactor(blendFactor + delta * easeSpeed);
        };

        const animationFrame = requestAnimationFrame(updateBlend);

        return () => cancelAnimationFrame(animationFrame);
    }, [blendFactor]);

    useEffect(() => {
        cameraControlsRef.current.setLookAt(0, 20, 15, 0, 0, 0, true); // Ajuste a posição da câmera para visualizar o modelo
    }, []);

    return (
        <>
            <CameraControls ref={cameraControlsRef} />

            <mesh>
                <primitive object={model.scene} scale={0.5} position-y={2}>
                    {/* Ajuste a opacidade ou outras propriedades do material aqui */}
                    <meshBasicMaterial
                        side={THREE.BackSide}
                        transparent
                        scale={0.2}
                        opacity={blendFactor} // Aplica a suavização ao opacity
                    />
                </primitive>
            </mesh>
            <Html position={[1.5, 2, 0]}>
                <button
                    onClick={onClose}
                    className="absolute text-xs top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 rounded"
                >
                    Fechar
                </button>
            </Html>
        </>
    );
};

export default PortalMesh;
