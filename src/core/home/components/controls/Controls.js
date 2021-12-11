import { useRef } from 'react';
import './Controls.css';
export default function Controls(props) {

    let colorHexToReplace = "#000000";
    let colorHexReplacementColor = "#000000";
    const refPicker = useRef(null);
    const refPickerReplacementColor = useRef(null);

    colorHexToReplace = getColorHexToReplace(props, colorHexToReplace);
    colorHexReplacementColor = getColorHexReplacementColor(props, colorHexToReplace);

    return (
        <div className='controls'>
            <h1>Controls</h1>
            <div>
                <label>Color to replace </label>
                <input ref={refPicker} onChange={(event) => actionToReplace(event, props)} type="color" defaultValue={colorHexToReplace}></input>
            </div>
            <div>
                <label>Replacement color </label>
                <input ref={refPickerReplacementColor} onChange={(event) => actionReplacementColor(event, props)} type="color" defaultValue={colorHexReplacementColor}></input>
            </div>
        </div>
    )
}


function getColorHexToReplace(props, colorHexToReplace) {
    if (props.webCamFilter) {
        colorHexToReplace = colorsToHex(props.webCamFilter.colorToReplace);
    }
    return colorHexToReplace;
}

function getColorHexReplacementColor(props, colorHex) {
    if (props.webCamFilter) {
        colorHex = colorsToHex(props.webCamFilter.replacementColor);
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

function actionToReplace(event, props) {

    const colorHex = event.target.value;
    const colorRgb = hexToRgb(colorHex);

    if (props.webCamFilter) {
        props.webCamFilter.colorToReplace = colorRgb;
    }
}

function actionReplacementColor(event, props) {

    const colorHex = event.target.value;
    const colorRgb = hexToRgb(colorHex);

    if (props.webCamFilter) {
        props.webCamFilter.replacementColor = colorRgb;
    }
}