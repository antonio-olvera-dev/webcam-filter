class ShowWebCam {
    video = null;
    canvas = null;
    widthCamera = null;
    heightCamera = null;

    constructor(widthCamera, heightCamera) {
        this.widthCamera = widthCamera;
        this.heightCamera = heightCamera;
    }

    async showCamera(processCamera) {
        try {
            this.video = document.getElementById("video");
            this.canvas = document.getElementById("canvas");

            const options = this.getOptions();
            const existGetUserMedia = navigator.mediaDevices.getUserMedia;

            await this.initStream(options, processCamera, existGetUserMedia);

        } catch (err) {
            console.log("An error occured! " + err);
        }
    }

    async initStream(options, processCamera, existGetUserMedia) {
        if (existGetUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia(options);
            this.video.srcObject = stream;
            processCamera();
            return;
        }

        console.log("No existe la funcion getUserMedia... oops :( ");
    }

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
