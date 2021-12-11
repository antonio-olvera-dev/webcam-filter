import './Video.css';
export default function Video(props) {
    return (
        <video ref={props.refVideo} autoPlay width={props.width} height={props.height} ></video>
    )
}