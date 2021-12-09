import { useEffect, useRef} from "react";
import { WebCamFilter } from "../../shared/utils/webcamfilter/WebCamFilter";
import './Home.css';

export default function Home() {

  const refVideo = useRef(null);
  const refCanvas = useRef(null);

  useEffect(() => {
    new WebCamFilter(refVideo.current, refCanvas.current);
  });

  return (
    <div>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
        voluptatum.
      </p>

      <video ref={refVideo} autoPlay  ></video>
      <canvas ref={refCanvas} width="475" height="475"></canvas>
    </div>
  );
}
