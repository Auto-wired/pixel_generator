import "./PixelButton.css";

export default function PixelButton ({ width, height, onClickEvent, children }) {
    return (
        <button
            onClick={(event) =>{
                event.stopPropagation();

                onClickEvent();
            }}
            className="pixel-button"
            style={{
                width: width,
                height: height,
            }}
        >
            <p>{ children }</p>
        </button>
    );
}