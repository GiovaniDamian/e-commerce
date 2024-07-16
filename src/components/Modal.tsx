interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-gray-300 dark:bg-gray-800 rounded-lg overflow-hidden text-xs shadow-xl transform transition-all sm:max-w-3xl w-full">
                <div className="p-2">{children}</div>
                <div className="p-1 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xsm"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    )
}
