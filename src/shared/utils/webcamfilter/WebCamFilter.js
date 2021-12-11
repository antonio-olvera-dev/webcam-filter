import { ProcessCamera } from "./ProcessCamera";
import { ShowWebCam } from "./ShowWebCam";

export class WebCamFilter {

    heightCamera = 720;
    widthCamera = 720;
    colorToReplace = { r: 57, g: 39, b: 19 };
    distanceAcceptableColor = 50;
    showWebCam = null;
    video = null;
    canvas = null;

    constructor(video, canvas) {
        this.video = video;
        this.canvas = canvas;
        this.start();
    }

    start() {

        this.showWebCam = new ShowWebCam(this.widthCamera, this.heightCamera, this.video, this.canvas);
        const processCamera = () => {

            const processCamera = new ProcessCamera(this.heightCamera, this.widthCamera, this.colorToReplace, this.distanceAcceptableColor, this.showWebCam);
            processCamera.processCamera();
        }
        this.showWebCam.showCamera(processCamera);
    }
}