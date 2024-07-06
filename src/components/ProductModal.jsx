import React, { useEffect, useState } from 'react';
import { Html, Text } from '@react-three/drei';
import products from './../data/products.json';


export default function ProductModal() {
    return (
        <Text
            key={`combo-`}
            fontSize={0.08}
            color="black"
            font="./fonts/Inter-Bold.ttf"
            position-z={0.5}
            maxWidth={1}
            textAlign="center"
            anchorY={-0.56 }
        >
            
        </Text>
    )
}
