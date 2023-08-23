import "./PixelCanvas.css";

import { useState, useRef, useEffect } from "react";

export default function PixelCanvas ({ pixelSize }) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const drawCanvasRef = useRef(null);
    const hoverCanvasRef = useRef(null);

    function getPosition (event) {
        const { x, y } = hoverCanvasRef.current.getBoundingClientRect();
        const { clientX, clientY } = event;
        const positionX = Math.floor((clientX - x) / 10);
        const positionY = Math.floor((clientY - y) / 10);

        setPosition({
            x: positionX,
            y: positionY,
        });
    }

    function drawHoverSquare () {
        const hoverCanvasContext = hoverCanvasRef.current.getContext("2d");
        const { x, y } = position;

        hoverCanvasContext.clearRect(0, 0, pixelSize * 10, pixelSize * 10);
        
        hoverCanvasContext.fillStyle = "#dddddd";
        hoverCanvasContext.globalAlpha = "0.5";

        hoverCanvasContext.fillRect(x * 10, y * 10, 10, 10);
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
                width={ pixelSize * 10 }
                height={ pixelSize * 10 }
            >
            </canvas>
            <canvas
                onMouseMove={(event) => {
                    getPosition(event);
                    drawHoverSquare();
                }}
                ref={ hoverCanvasRef }
                id="hover-canvas"
                width={ pixelSize * 10 }
                height={ pixelSize * 10 }
            >
            </canvas>
        </div>
    );
}