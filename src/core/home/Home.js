import { useEffect, useRef } from "react";
import { WebCamFilter } from "../../shared/utils/webcamfilter/WebCamFilter";
import './Home.css';
import Description from './components/description/Description';
import Video from './components/video/Video';
import Canvas from './components/canvas/Canvas';

export default function Home() {

  const refVideo = useRef(null);
  const refCanvas = useRef(null);

  useEffect(() => {
    new WebCamFilter(refVideo.current, refCanvas.current);
  });

  return (
    <div className="home">
      <Description />
      <Video refVideo={refVideo} width={150} height={150} />
      <Canvas refCanvas={refCanvas} width={475} height={475} />
    </div>
  );
}
