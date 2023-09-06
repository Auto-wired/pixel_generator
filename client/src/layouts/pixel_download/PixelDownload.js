import "./PixelDownload.css";

import { useState, useRef, useEffect } from "react";

import PixelModal from "../../components/pixel_modal/PixelModal.js";

export default function PixelDownload ({ resultCanvasRef }) {
    const [isOpen, setIsOpen] = useState(false);
    const [fileName, setFileName] = useState("");

    const fileNameInputRef = useRef(null);

    function download () {
        if (fileName.length === 0) {
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
                <div id="pixel-download">
                    <input
                        ref={ fileNameInputRef }
                        onInput={(e) => {
                            setFileName(e.target.value);
                        }}
                        value={ fileName }
                        id="file-name-input"
                        autoComplete="off"
                    >
                    </input>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                            download();
                        }}
                        id="download-button"
                    >
                        <p>Download</p>
                    </button>
                </div>
            </PixelModal>
        </button>
    );
}