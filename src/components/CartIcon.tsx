import useAppData from "../data/hook/useAppData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";
import { useState } from "react";
import ShoppingCart from "./ShoppingCart";

export default function CartIcon() {
    const { cart } = useAppData();
    const itemCount = cart.items.length;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="relative cursor-pointer" onClick={openModal}>
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {itemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-2.5 w-2.5 flex items-center justify-center text-xs">
                        {itemCount}
                    </span>
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ShoppingCart />
            </Modal>
        </>
    );
}
