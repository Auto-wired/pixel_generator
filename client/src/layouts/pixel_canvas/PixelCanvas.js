import "./PixelCanvas.css";

import { useState, useRef, useEffect } from "react";

export default function PixelCanvas ({ pixelSize, pixelScale }) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const drawCanvasRef = useRef(null);
    const hoverCanvasRef = useRef(null);

    function getPosition (event) {
        const { x, y } = hoverCanvasRef.current.getBoundingClientRect();
        const { clientX, clientY } = event;
        const positionX = Math.floor((clientX - x) / pixelScale);
        const positionY = Math.floor((clientY - y) / pixelScale);

        setPosition({
            x: positionX,
            y: positionY,
        });
    }

    function drawHoverSquare () {
        const hoverCanvasContext = hoverCanvasRef.current.getContext("2d");
        const { x, y } = position;

        hoverCanvasContext.clearRect(0, 0, pixelSize * pixelScale, pixelSize * pixelScale);
        
        hoverCanvasContext.fillStyle = "#dddddd";
        hoverCanvasContext.globalAlpha = "0.5";

        hoverCanvasContext.fillRect(x * pixelScale, y * pixelScale, pixelScale, pixelScale);
    }

    useEffect(() => {
        drawCanvasRef.current.style.width = `${ pixelSize }px`;
        drawCanvasRef.current.style.height = `${ pixelSize }px`;
        hoverCanvasRef.current.style.width = `${ pixelSize }px`;
        hoverCanvasRef.current.style.height = `${ pixelSize }px`;
    }, [pixelSize]);

    return (
        <div id="pixel-canvas-container">
            <canvas
                ref={ drawCanvasRef }
                id="draw-canvas"
                width={ pixelSize * pixelScale }
                height={ pixelSize * pixelScale }
                style={{ transform: `scale(${ pixelScale })` }}
            >
            </canvas>
            <canvas
                onMouseMove={(event) => {
                    getPosition(event);
                    drawHoverSquare();
                }}
                ref={ hoverCanvasRef }
                id="hover-canvas"
                width={ pixelSize * pixelScale }
                height={ pixelSize * pixelScale }
                style={{ transform: `scale(${ pixelScale })` }}
            >
            </canvas>
        </div>
    );
}