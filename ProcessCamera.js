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

        let things = [];
        for (let i = 0; i < pixels.length; i += 4) {
            let red = pixels[i];
            let green = pixels[i + 1];
            let blue = pixels[i + 2];
            let alpha = pixels[i + 3];

            let distance = Math.sqrt(
                Math.pow(this.colorToReplace.r - red, 2) +
                Math.pow(this.colorToReplace.g - green, 2) +
                Math.pow(this.colorToReplace.b - blue, 2)
            );

            if (distance < this.distanceAcceptableColor) {
                this.changeFillColor(pixels, i); 

                const y = Math.floor(i / 4 / this.canvas.width);
                const x = (i / 4) % this.canvas.width;

                if (things.length == 0) {

                    const thing = new Thing(x,y);
                    things.push(thing);

                }
                else {
                    let found = false;
                    for (let i = 0; i < things.length; i++) {
                        if (things[i].isNear(x, y)) {
                            things[i].addPixel(x, y);
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        const thing = new Thing(x, y);
                        things.push(thing);
                    }
                }


            }
        }

        this.ctx.putImageData(imgData, 0, 0);

        things = this.joinThings(things);

        for (let i = 0; i < things.length; i++) {
            const width = things[i].xMax - things[i].xMin;
            const height = things[i].yMax - things[i].yMin;
            const area = width * height;
            
            if (area > 15) {
                things[i].drawSquare(this.ctx);
            }
        }

        // console.log(things.length);

        setTimeout(this.processCamera.bind(this), 30);
    }


    changeFillColor(pixels, i) {
        pixels[i] = 255;
        pixels[i + 1] = 255;
        pixels[i + 2] = 255;
        // pixels[i + 3] = 255;
    }

    joinThings(things) {
        let exit = false;

        for (let i = 0; i < things.length; i++) {
            for (let i2 = 0; i2 < things.length; i2++) {

                if (i == i2) continue;

                let thing1 = things[i];
                let thing2 = things[i2];

                let intersect = thing1.xMin < thing2.xMax &&
                    thing1.xMax > thing2.xMin &&
                    thing1.yMin < thing2.yMax &&
                    thing1.yMax > thing2.yMin;

                if (intersect) {

                    for (let i3 = 0; i3 < thing2.pixels.length; i3++) {
                        thing1.addPixel(
                            thing2.pixels[i3].x,
                            thing2.pixels[i3].y
                        );
                    }

                    things.splice(i2, 1);
                    exit = true;
                    break;
                }

            }

            if (exit) {
                break;
            }
        }


        if (exit) {
            return this.joinThings(things);
        } else {

            return things;
        }
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