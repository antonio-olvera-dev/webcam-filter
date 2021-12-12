import './Description.css';
export default function Description(props) {
    return (
        <div className='description'>
            <h1>Webcam filter</h1>
            <p>
                This is a small project that, based on a color and range, looks for those pixels on the canvas and replaces them with a given color. It also separates those searched pixels and separates them into groups based on the given range.
            </p>
        </div>
    )
}