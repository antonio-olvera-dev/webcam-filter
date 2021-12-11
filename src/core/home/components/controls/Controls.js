import { useRef } from 'react';
import './Controls.css';
export default function Controls(props) {

    let colorHex = "#000000";
    const refPicker = useRef(null);

    colorHex = getColorHex(props, colorHex);

    return (
        <div className='controls'>
            <h1>Controls</h1>
            <div>
                <label>Color to replace </label>
                <input ref={refPicker} onChange={(event) => action(event, props)} type="color" defaultValue={colorHex}></input>
            </div>
        </div>
    )
}


function getColorHex(props, colorHex) {
    if (props.webCamFilter) {
        colorHex = colorsToHex(props.webCamFilter.colorToReplace);
    }
    return colorHex;
}

function colorsToHex(color) {
    return "#" + numberToHex(color.r) + numberToHex(color.g) + numberToHex(color.b);
}

function numberToHex(number) {
    let hex = number.toString(16);
    if (hex.length === 1) {
        hex = "0" + hex;
    }
    return hex;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function action(event, props) {

    const colorHex = event.target.value;
    const colorRgb = hexToRgb(colorHex);

    if (props.webCamFilter) {
        props.webCamFilter.colorToReplace = colorRgb;
    }
}