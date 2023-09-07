import "./PixelInfo.css";

export default function PixelInfo ({ pixelSize, pixelScale, currentPosition }) {
    return (
        <div id="pixel-info-container">
            <div id="pixel-info">
                {
                    currentPosition.x && currentPosition.y
                    &&
                    <p>{ currentPosition.x } : { currentPosition.y }</p>
                }
                <p>[{ pixelSize } X { pixelSize }] ({ pixelScale * 100 }%)</p>
            </div>
        </div>
    );
}