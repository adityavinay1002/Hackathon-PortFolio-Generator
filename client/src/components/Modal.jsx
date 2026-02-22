import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
                <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-purple-50 text-purple-600'}`}>
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 font-outfit">{title}</h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all font-outfit"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition-all font-outfit shadow-lg ${type === 'danger' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20'}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default Modal;
