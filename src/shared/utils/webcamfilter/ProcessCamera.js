import { Thing } from "./Thing";

export class ProcessCamera {

    heightCamera = null;
    widthCamera = null;
    colorToReplace = null;
    distanceAcceptableColor = null;
    canvas = null;
    video = null;
    ctx = null;

    /**
     * 
     * @param {number} heightCamera 
     * @param {number} widthCamera 
     * @param {object} colorToReplace 
     * @param {number} distanceAcceptableColor 
     * @param {object} showWebCam 
     */
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
        this.fillThings(things, pixels);

        this.ctx.putImageData(imgData, 0, 0);

        const newThings = this.joinThings(things);
        this.drawCanvas(newThings);
    }

    /**
     * 
     * @param {object} newThings 
     */
    drawCanvas(newThings) {
        for (let i = 0; i < newThings.length; i++) {
            const width = newThings[i].xMax - newThings[i].xMin;
            const height = newThings[i].yMax - newThings[i].yMin;
            const area = width * height;

            if (area > 15) {
                newThings[i].drawSquare(this.ctx);
                newThings[i].drawCircle(this.ctx);
            }
        }
    }

    /**
     * 
     * @param {object} things 
     * @param {number[]} pixels 
     */
    fillThings(things, pixels) {
        for (let i = 0; i < pixels.length; i += 4) {
            let red = pixels[i];
            let green = pixels[i + 1];
            let blue = pixels[i + 2];
            // let alpha = pixels[i + 3];

            let distance = Math.sqrt(
                Math.pow(this.colorToReplace.r - red, 2) +
                Math.pow(this.colorToReplace.g - green, 2) +
                Math.pow(this.colorToReplace.b - blue, 2)
            );

            if (distance < this.distanceAcceptableColor) {
                this.changeFillColor(pixels, i);

                const y = Math.floor(i / 4 / this.canvas.width);
                const x = (i / 4) % this.canvas.width;

                if (things.length === 0) {

                    const thing = new Thing(x, y);
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
    }

    /**
    * 
    * @param {object} things 
    * @returns {object} things
    */
    joinThings(things) {
        let exit = false;

        for (const thing of things) {
            for (const [indexOfThing2, thing2] of things.entries()) {

                if (thing === thing2) continue;
                let { intersect } = compareIntersect(thing, thing2);

                if (intersect) {

                    for (const pixel of thing2.pixels) {
                        thing.addPixel(pixel.x, pixel.y);
                    }

                    things.splice(indexOfThing2, 1);
                    exit = true;
                    break;
                }
            }
            if (exit) break;
        }

        function compareIntersect(thing, thing2) {

            let intersect = thing.xMin < thing2.xMax &&
                thing.xMax > thing2.xMin &&
                thing.yMin < thing2.yMax &&
                thing.yMax > thing2.yMin;
            return { intersect };
        }

        return exit ? this.joinThings(things) : things;
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

    /**
     * 
     * @param {number[]} pixels 
     * @param {number} i 
     */
    changeFillColor(pixels, i) {
        pixels[i] = 255;
        pixels[i + 1] = 255;
        pixels[i + 2] = 255;
        // pixels[i + 3] = 255;
    }
}