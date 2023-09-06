import "./PixelSize.css";

import { useState, useRef, useEffect } from "react";

import PixelButton from "../../components/pixel_button/PixelButton.js";
import PixelInput from "../../components/pixel_input/PixelInput.js";
import PixelModal from "../../components/pixel_modal/PixelModal.js";

export default function PixelSize ({ pixelSize, setPixelSize }) {
    const [isOpen, setIsOpen] = useState(false);
    const [temporaryPixelSize, setTemporaryPixelSize] = useState(pixelSize);
    
    const pixelSizeInputRef = useRef(null);

    function savePixelSize () {
        if (!temporaryPixelSize) {
            alert("크기를 지정해주세요.");

            return;
        }

        if (temporaryPixelSize == 0) {
            alert("크기는 1보다 작을 수 없습니다.");

            return;
        }

        setPixelSize(temporaryPixelSize);
        setIsOpen(false);
    }

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        pixelSizeInputRef.current.focus();

        setTemporaryPixelSize(pixelSize);
    }, [isOpen]);

    return (
        <button id="pixel-size-container">
            <PixelModal
                isOpen={ isOpen }
                setIsOpen={ setIsOpen }
            >
                <p id="pixel-size-title">Size</p>
                <div id="pixel-size">
                    <PixelInput
                        width={ 180 }
                        height={ 32 }
                        pixelInputValue={ temporaryPixelSize }
                        pixelInputRef={ pixelSizeInputRef }
                        setPixelInputValue={ setTemporaryPixelSize }
                    >
                    </PixelInput>
                    <PixelButton
                        width={ 80 }
                        height={ 32 }
                        onClickEvent={ savePixelSize }
                    >
                        <p>Save</p>
                    </PixelButton>
                </div>
            </PixelModal>
        </button>
    );
}