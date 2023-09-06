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
                        onClick={(event) => {
                            event.stopPropagation();

                            setIsOpen(false);
                        }}
                        className="modal-background"
                    >
                    </div>
                    <div className="modal-content">
                        <div className="modal-title">
                            { children[0] }
                        </div>
                        <button
                            onClick={(event) => {
                                event.stopPropagation();

                                setIsOpen(false);
                            }}
                            className="close-button"
                        >
                        </button>
                        { children[1] }
                    </div>
                </div>
            }
        </div>
    );
}