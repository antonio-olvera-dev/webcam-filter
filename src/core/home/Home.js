import { useEffect, useRef, useState } from "react";
import { WebCamFilter } from "../../shared/utils/webcamfilter/WebCamFilter";
import './Home.css';
import Description from './components/description/Description';
import Video from './components/video/Video';
import Canvas from './components/canvas/Canvas';
import Controls from "./components/controls/Controls";

export default function Home() {

  const refVideo = useRef(null);
  const refCanvas = useRef(null);
  const [webCamFilter, setWebCamFilter ] = useState(null);

  useEffect(() => {
    setWebCamFilter(new WebCamFilter(refVideo.current, refCanvas.current));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <Description />
      <Video refVideo={refVideo} width={150} height={150} />
      <Canvas refCanvas={refCanvas} width={475} height={475} />
      <Controls webCamFilter={webCamFilter}/>
    </div>
  );
}
