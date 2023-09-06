import "./PixelInput.css";

export default function PixelInput ({ width, height, pixelInputValue, pixelInputRef, setPixelInputValue }) {
    return (
        <input
            ref={ pixelInputRef }
            onInput={(event) => {
                setPixelInputValue(event.target.value);
            }}
            value={ pixelInputValue }
            className="pixel-input"
            autoComplete="off"
            style={{
                width: width,
                height: height,
            }}
        >
        </input>
    );
}