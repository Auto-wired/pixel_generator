import "./PixelCanvas.css";

import { useState, useRef, useEffect } from "react";

export default function PixelCanvas ({ pixelSize, pixelScale, pixelColor, setCurrentPixelPosition }) {
    const [resultCanvasContext, setResultCanvasContext] = useState(null);
    const [drawCanvasContext, setDrawCanvasContext] = useState(null);
    const [hoverCanvasContext, setHoverCanvasContext] = useState(null);

    const resultCanvasRef = useRef(null);
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
        if (event.type === "mousemove" && event.buttons === 0) {
            return;
        }

        const { positionX, positionY } = getPosition(event);
        const currentColor = event.buttons === 1 ? pixelColor.left : pixelColor.right;

        resultCanvasContext.fillStyle = currentColor;
        drawCanvasContext.fillStyle = currentColor;

        resultCanvasContext.fillRect(positionX, positionY, 1, 1);
        drawCanvasContext.fillRect(positionX * pixelScale, positionY * pixelScale, pixelScale, pixelScale);
    }

    function drawAssistancePixel () {

    }

    useEffect(() => {
        resultCanvasRef.current.style.width = `${ pixelSize }px`;
        resultCanvasRef.current.style.height = `${ pixelSize }px`;
        drawCanvasRef.current.style.width = `${ pixelSize }px`;
        drawCanvasRef.current.style.height = `${ pixelSize }px`;
        hoverCanvasRef.current.style.width = `${ pixelSize }px`;
        hoverCanvasRef.current.style.height = `${ pixelSize }px`;
    }, [pixelSize]);

    useEffect(() => {
        setResultCanvasContext(resultCanvasRef.current.getContext("2d"));
        setDrawCanvasContext(drawCanvasRef.current.getContext("2d"));
        setHoverCanvasContext(hoverCanvasRef.current.getContext("2d"));
    }, []);

    useEffect(() => {
        if (!drawCanvasContext) {
            return;
        }

        for (let row = 0; row < pixelSize; row++) {
            for (let column = 0; column < pixelSize; column++) {
                const { data } = resultCanvasContext.getImageData(column, row, 1, 1);

                drawCanvasContext.fillStyle = `rgba(${ data[0] }, ${ data[1] }, ${ data[2] }, ${ data[3] })`;
                drawCanvasContext.fillRect(column * pixelScale, row * pixelScale, pixelScale, pixelScale);
            }
        }

        // drawCanvasContext.drawImage(resultCanvasRef.current, 0, 0);
    }, [pixelScale]);

    return (
        <div id="pixel-canvas-container">
            <canvas
                ref={ resultCanvasRef }
                id="result-canvas"
                width={ pixelSize }
                height={ pixelSize }
            >
            </canvas>
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
                onMouseDown={(event) => {
                    drawPixel(event);
                }}
                onContextMenu={(event) => {
                    event.preventDefault();
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