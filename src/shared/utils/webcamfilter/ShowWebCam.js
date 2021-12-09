export class ShowWebCam {
    video = null;
    canvas = null;
    widthCamera = null;
    heightCamera = null;

    /**
     * 
     * @param {number} widthCamera 
     * @param {number} heightCamera 
     */
    constructor(widthCamera, heightCamera, video, canvas) {
        this.widthCamera = widthCamera;
        this.heightCamera = heightCamera;
        this.video = video;
        this.canvas = canvas;
    }

    /**
     * 
     * @param {Function} processCamera 
     */
    async showCamera(processCamera) {
        try {

            const options = this.getOptions();
            const existGetUserMedia = navigator.mediaDevices.getUserMedia;

            await this.initStream(options, processCamera, existGetUserMedia);

        } catch (err) {
            console.log("An error occured! " + err);
        }
    }

    /**
     * 
     * @param {object} options 
     * @param {object} processCamera 
     * @param {boolean} existGetUserMedia 
     */
    async initStream(options, processCamera, existGetUserMedia) {
        if (existGetUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia(options);
            this.video.srcObject = stream;
            processCamera();
            return;
        }

        console.log("No existe la funcion getUserMedia... oops :( ");
    }

    /**
     * 
     * @returns {object} options
     */
    getOptions() {

        return {
            audio: false,
            video: {
                width: this.widthCamera,
                height: this.heightCamera,
            },
        };
    }
}
