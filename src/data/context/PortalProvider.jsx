import React, { createContext, useState, useContext } from 'react';

const PortalContext = createContext();

export function PortalProvider ({ children }) {
    const [portalState, setPortalState] = useState(false);
    const [product, setProduct] = useState(false);

    const activatePortal = (item) => {
        setProduct(item)
        setPortalState(true);
    };

    const deactivatePortal = () => {
        setPortalState(false);
    };

    return (
        <PortalContext.Provider value={{ portalState, activatePortal, deactivatePortal, product }}>
            {children}
        </PortalContext.Provider>
    );
};

export default PortalContext
