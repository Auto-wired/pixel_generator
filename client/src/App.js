import "./App.css";

import { useState } from "react";

import PixelCanvas from "./layouts/pixel_canvas/PixelCanvas.js";

export default function App () {
    const [pixelSize, setPixelSize] = useState(32);
    const [pixelScale, setPixelScale] = useState(10);

    function modifyPixelScale (event) {
        const increaseValue = event.deltaY > 0 ? 1 : -1;

        if ((pixelScale === 1 && increaseValue === -1) || (pixelScale === 20 && increaseValue === 1)) {
            return;
        }

        setPixelScale(pixelScale + increaseValue);

        console.log(pixelScale);
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
                    setPixelScale={ setPixelScale }
                >
                </PixelCanvas>
            </div>
            <div className="side"></div>
        </>
    );
}
