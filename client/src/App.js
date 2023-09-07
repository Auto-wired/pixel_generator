import "./App.css";

import { useState, useRef } from "react";

import PixelCanvas from "./layouts/pixel_canvas/PixelCanvas.js";
import PixelDownload from "./layouts/pixel_download/PixelDownload.js";
import PixelInfo from "./layouts/pixel_info/PixelInfo.js";
import PixelSize from "./layouts/pixel_size/PixelSize.js";

export default function App () {
    const [pixelSize, setPixelSize] = useState(64);
    const [pixelScale, setPixelScale] = useState(1);
    const [pixelColor, setPixelColor] = useState({
        left: "#ffffff",
        right: "#000000",
    });
    const [currentPixelPosition, setCurrentPixelPosition] = useState({
        x: null,
        y: null,
    });

    const resultCanvasRef = useRef(null);

    function modifyPixelScale (event) {
        const increaseValue = event.deltaY > 0 ? -1 : 1;

        if ((pixelScale === 1 && increaseValue === -1) || (pixelScale === 25 && increaseValue === 1)) {
            return;
        }

        setPixelScale(pixelScale + increaseValue);
    }

    return (
        <>
            <div className="side">
            </div>
            <div
                onWheel={(event) => {
                    modifyPixelScale(event);
                }}
                id="main"
            >
                <PixelCanvas
                    pixelSize={ pixelSize }
                    pixelScale={ pixelScale }
                    pixelColor={ pixelColor }
                    resultCanvasRef={ resultCanvasRef }
                    setCurrentPixelPosition={ setCurrentPixelPosition }
                >
                </PixelCanvas>
            </div>
            <div className="side">
                <PixelSize
                    pixelSize={ pixelSize }
                    setPixelSize={ setPixelSize }
                >
                </PixelSize>
                <PixelDownload resultCanvasRef={ resultCanvasRef }></PixelDownload>
                <PixelInfo
                    pixelSize={ pixelSize }
                    pixelScale={ pixelScale }
                    currentPosition={ currentPixelPosition }
                >
                </PixelInfo>
            </div>
        </>
    );
}
