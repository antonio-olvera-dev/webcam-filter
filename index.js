class Index {

    heightCamera = 720;
    widthCamera = 720;
    colorToReplace = { r: 240, g: 240, b: 240 };
    distanceAcceptableColor = 100;
    showWebCam = null;

    constructor() {
        this.start();
    }

    start() {

        this.showWebCam = new ShowWebCam(this.widthCamera, this.heightCamera);
        const processCamera = () => {

            const processCamera = new ProcessCamera(this.heightCamera, this.widthCamera, this.colorToReplace, this.distanceAcceptableColor, this.showWebCam);
            processCamera.processCamera();
        }
        this.showWebCam.showCamera(processCamera);
    }
}
