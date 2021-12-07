class ProcessCamera {

    heightCamera = null;
    widthCamera = null;
    colorToReplace = null;
    distanceAcceptableColor = null;
    canvas = null;
    video = null;
    ctx = null;

    constructor(heightCamera, widthCamera, colorToReplace, distanceAcceptableColor, showWebCam) {


        this.heightCamera = heightCamera || 720;
        this.widthCamera = widthCamera || 720;
        this.colorToReplace = colorToReplace || { r: 255, g: 255, b: 0 };
        this.distanceAcceptableColor = distanceAcceptableColor || 190;
        this.canvas = showWebCam.canvas;
        this.video = showWebCam.video;
    }

    processCamera() {

        this.ctx = this.canvas.getContext("2d");
        this.drawImage();

        let imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let pixels = imgData.data;

        let sumX = 0;
        let sumY = 0;
        let cuenta = 0;

        for (let p = 0; p < pixels.length; p += 4) {
            let red = pixels[p];
            let green = pixels[p + 1];
            let blue = pixels[p + 2];
            let alpha = pixels[p + 3];

            let distance = Math.sqrt(
                Math.pow(this.colorToReplace.r - red, 2) +
                Math.pow(this.colorToReplace.g - green, 2) +
                Math.pow(this.colorToReplace.b - blue, 2)
            );

            if (distance < this.distanceAcceptableColor) {
                pixels[p] = 255; //r
                pixels[p + 1] = 0; //g
                pixels[p + 2] = 0; //b

                let y = Math.floor(p / 4 / this.canvas.width);
                let x = (p / 4) % this.canvas.width;

                sumX += x;
                sumY += y;
                cuenta++;
            }
        }

        this.ctx.putImageData(imgData, 0, 0);

        if (cuenta > 0) {
            this.ctx.fillStyle = "rgb(201, 26, 172)";
            this.ctx.beginPath();
            this.ctx.arc(sumX / cuenta, sumY / cuenta, 10, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        setTimeout(this.processCamera.bind(this), 30);
    }


    drawImage() {
        this.ctx.drawImage(
            this.video,
            0,
            0,
            this.widthCamera,
            this.heightCamera,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }
}