import { useRef } from 'react';
import './Controls.css';
import { useState } from 'react';
export default function Controls(props) {

    let colorHexToReplace = "#000000";
    let colorHexReplacementColor = "#000000";
    const [showCircle, setShowCircle] = useState(getShowCircle(props));
    const [showSquare, setShowSquare] = useState(getShowSquare(props));
    const refPicker = useRef(null);
    const refPickerReplacementColor = useRef(null);

    colorHexToReplace = getColorHexToReplace(props, colorHexToReplace);
    colorHexReplacementColor = getColorHexReplacementColor(props, colorHexToReplace);


    return (
        <div className='controls'>
            <h2>Controls</h2>
            <div>
                <label>Color to replace</label>
                <input ref={refPicker} onChange={(event) => actionToReplace(event, props)} type="color" defaultValue={colorHexToReplace}></input>
            </div>
            <div>
                <label>Replacement color</label>
                <input ref={refPickerReplacementColor} onChange={(event) => actionReplacementColor(event, props)} type="color" defaultValue={colorHexReplacementColor}></input>
            </div>
            <div>
                <label>Show circle</label>
                <input onChange={(event) => actionShowCircle(event, props, setShowCircle)} type="checkbox" checked={showCircle}></input>
            </div>
            <div>
                <label>Show square</label>
                <input onChange={(event) => actionShowSquare(event, props, setShowSquare)} type="checkbox" checked={showSquare}></input>
            </div>
        </div>
    )
}




function actionShowCircle(event, props, setShowCircle) {
    setShowCircle(event.target.checked);
    props.webCamFilter.showCircle = event.target.checked;
}

function actionShowSquare(event, props, setShowSquare) {
    setShowSquare(event.target.checked);
    props.webCamFilter.showSquare = event.target.checked;
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

function getShowCircle(props) {
    if (props.webCamFilter?.showCircle) {
        return true;
    } else {
        return false;
    }
}
function getShowSquare(props) {
    if (props.webCamFilter?.showSquare) {
        return true;
    } else {
        return false;
    }
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