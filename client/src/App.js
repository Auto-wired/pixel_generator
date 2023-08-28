import "./App.css";

import { useState } from "react";

import PixelCanvas from "./layouts/pixel_canvas/PixelCanvas.js";

export default function App () {
    const [pixelSize, setPixelSize] = useState(32);
    const [pixelScale, setPixelScale] = useState(1);
    const [pixelColor, setPixelColor] = useState({
        left: "#ffffff",
        right: "#000000",
    });
    const [currentPixelPosition, setCurrentPixelPosition] = useState({
        x: null,
        y: null,
    });

    function modifyPixelScale (event) {
        const increaseValue = event.deltaY > 0 ? -1 : 1;

        if ((pixelScale === 1 && increaseValue === -1) || (pixelScale === 25 && increaseValue === 1)) {
            return;
        }

        setPixelScale(pixelScale + increaseValue);
    }

    return (
        <>
            <div className="side"></div>
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
                    setCurrentPixelPosition={ setCurrentPixelPosition }
                >
                </PixelCanvas>
            </div>
            <div className="side">
                <p>X: { currentPixelPosition.x }</p>
                <p>Y: { currentPixelPosition.y }</p>
                <p>Scale: { pixelScale }</p>
            </div>
        </>
    );
}
