import React, { createContext, useState, useContext } from 'react';

const PortalContext = createContext();

export function PortalProvider ({ children }) {
    const [portalState, setPortalState] = useState({ active: false, modelPath: '' });

    const activatePortal = (modelPath) => {
        setPortalState({ active: true, modelPath });
    };

    const deactivatePortal = () => {
        setPortalState({ active: false, modelPath: '' });
    };

    return (
        <PortalContext.Provider value={{ portalState, activatePortal, deactivatePortal }}>
            {children}
        </PortalContext.Provider>
    );
};

export default PortalContext
