import "./App.css";

import { useState } from "react";

import PixelCanvas from "./layouts/pixel_canvas/PixelCanvas.js";

export default function App () {
    const [pixelSize, setPixelSize] = useState(32);
    const [pixelScale, setPixelScale] = useState(1);

    return (
        <>
            <div className="side"></div>
            <div id="main">
                <PixelCanvas pixelSize={ pixelSize }></PixelCanvas>
            </div>
            <div className="side"></div>
        </>
    );
}
