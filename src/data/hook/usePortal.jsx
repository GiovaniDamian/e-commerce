import { useContext } from "react";
import PortalContext from '../context/PortalProvider'

const usePortal = () => useContext(PortalContext)

export default usePortal
