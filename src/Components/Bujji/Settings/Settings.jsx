import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Source from './Source';

const Settings = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-60">
            <div className="relative bg-gray-800 p-6 w-full h-full">
                {/* Cross icon for closing the modal */}
                <FaTimes
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white cursor-pointer text-2xl"
                />

                <h2 className="text-xl font-semibold mb-4">Settings</h2>

                <div className='max-w-7xl mx-auto'>
                    <Source />
                </div>
            </div>
        </div>
    );
};

export default Settings;
