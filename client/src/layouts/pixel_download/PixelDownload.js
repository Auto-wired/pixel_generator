import "./PixelDownload.css";

import { useState, useRef, useEffect } from "react";

import PixelButton from "../../components/pixel_button/PixelButton.js";
import PixelInput from "../../components/pixel_input/PixelInput.js";
import PixelModal from "../../components/pixel_modal/PixelModal.js";

export default function PixelDownload ({ resultCanvasRef }) {
    const [isOpen, setIsOpen] = useState(false);
    const [fileName, setFileName] = useState("");

    const fileNameInputRef = useRef(null);

    function download () {
        if (!fileName) {
            fileNameInputRef.current.focus();

            alert("파일 이름을 입력해주세요.");

            return;
        }

        const link = document.createElement("a");

        link.download = `${ fileName }.png`;
        link.href = resultCanvasRef.current.toDataURL("image/png");

        link.click();
        link.remove();

        setIsOpen(false);
    }

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        fileNameInputRef.current.focus();

        setFileName("");
    }, [isOpen]);

    return (
        <button id="pixel-download-container">
            <PixelModal
                isOpen={ isOpen }
                setIsOpen={ setIsOpen }
            >
                <p id="pixel-download-title">Download</p>
                <div id="pixel-download">
                    <PixelInput
                        pixelInputValue={ fileName }
                        pixelInputRef={ fileNameInputRef }
                        setPixelInputValue={ setFileName }
                        width={ 180 }
                        height={ 32 }
                    >
                    </PixelInput>
                    <PixelButton
                        width={ 80 }
                        height={ 32 }
                        onClickEvent={ download }
                    >
                        <p>Download</p>
                    </PixelButton>
                </div>
            </PixelModal>
        </button>
    );
}