import "./PixelModal.css";

import { useState } from "react";

export default function PixelModal ({ isOpen, setIsOpen, children }) {
    return (
        <div
            onClick={() => {
                setIsOpen(true);
            }}
            className="pixel-modal-container"
        >
            {
                isOpen
                &&
                <div className="pixel-modal">
                    <div
                        onClick={(e) => {
                            e.stopPropagation();

                            setIsOpen(false);
                        }}
                        className="modal-background"
                    >
                    </div>
                    <div className="modal-content">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                
                                setIsOpen(false);
                            }}
                            className="close-button"
                        >
                        </button>
                        { children }
                    </div>
                </div>
            }
        </div>
    );
}