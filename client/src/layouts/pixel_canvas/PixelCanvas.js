import "./PixelCanvas.css";

import { useState, useRef, useEffect } from "react";

export default function PixelCanvas ({ pixelSize, pixelScale, setCurrentPixelPosition }) {
    const [drawCanvasContext, setDrawCanvasContext] = useState(null);
    const [hoverCanvasContext, setHoverCanvasContext] = useState(null);

    const drawCanvasRef = useRef(null);
    const hoverCanvasRef = useRef(null);

    function getPosition (event) {
        const { x, y } = hoverCanvasRef.current.getBoundingClientRect();
        const { clientX, clientY } = event;
        const positionX = Math.floor((clientX - x) / pixelScale);
        const positionY = Math.floor((clientY - y) / pixelScale);

        setCurrentPixelPosition({
            x: positionX,
            y: positionY,
        });

        return {
            positionX: positionX,
            positionY: positionY,
        };
    }

    function drawHoverSquare (event) {
        const { positionX, positionY } = getPosition(event);

        hoverCanvasContext.fillStyle = "#dddddd";
        hoverCanvasContext.globalAlpha = "0.5";

        hoverCanvasContext.clearRect(0, 0, pixelSize * pixelScale, pixelSize * pixelScale);
        hoverCanvasContext.fillRect(positionX * pixelScale, positionY * pixelScale, pixelScale, pixelScale);
    }

    function drawPixel (event) {
        if (event.buttons !== 1) {
            return;
        }

        const { positionX, positionY } = getPosition(event);

        drawCanvasContext.fillStyle = "#ffffff";

        drawCanvasContext.fillRect(positionX * pixelScale, positionY * pixelScale, pixelScale, pixelScale);
        drawCanvasContext.save();
    }

    useEffect(() => {
        drawCanvasRef.current.style.width = `${ pixelSize }px`;
        drawCanvasRef.current.style.height = `${ pixelSize }px`;
        hoverCanvasRef.current.style.width = `${ pixelSize }px`;
        hoverCanvasRef.current.style.height = `${ pixelSize }px`;
    }, [pixelSize]);

    useEffect(() => {
        setDrawCanvasContext(drawCanvasRef.current.getContext("2d"));
        setHoverCanvasContext(hoverCanvasRef.current.getContext("2d"));
    }, []);

    useEffect(() => {
        
    }, [pixelScale]);

    return (
        <div id="pixel-canvas-container">
            <canvas
                ref={ drawCanvasRef }
                id="draw-canvas"
                width={ pixelSize * pixelScale }
                height={ pixelSize * pixelScale }
                style={{ transform: `translate(-50%, -50%) scale(${ pixelScale })` }}
            >
            </canvas>
            <canvas
                onMouseMove={(event) => {
                    drawHoverSquare(event);
                    drawPixel(event);
                }}
                onMouseLeave={() => {
                    hoverCanvasContext.clearRect(0, 0, pixelSize * pixelScale, pixelSize * pixelScale);
                    setCurrentPixelPosition({
                        x: null,
                        y: null
                    });
                }}
                onClick={(event) => {
                    drawPixel(event);
                }}
                ref={ hoverCanvasRef }
                id="hover-canvas"
                width={ pixelSize * pixelScale }
                height={ pixelSize * pixelScale }
                style={{ transform: `translate(-50%, -50%) scale(${ pixelScale })` }}
            >
            </canvas>
        </div>
    );
}