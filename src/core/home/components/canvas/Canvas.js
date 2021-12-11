import './Canvas.css';
export default function Canvas(props) {
    return (
        <canvas ref={props.refCanvas} width={props.width} height={props.height}></canvas>
    )
}