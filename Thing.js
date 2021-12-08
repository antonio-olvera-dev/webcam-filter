class Thing {

    pixels = [];
    xMin = 0;
    xMax = 0;
    yMin = 0;
    yMax = 0;

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.addPixel(x, y);
        this.xMin = x;
        this.xMax = x;
        this.yMin = y;
        this.yMax = y;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    addPixel(x, y) {

        this.pixels.push({ x: x, y: y });

        this.xMin = x < this.xMin ? x : this.xMin;
        this.xMax = x > this.xMax ? x : this.xMax;
        this.yMin = y < this.yMin ? y : this.yMin;
        this.yMax = y > this.yMax ? y : this.yMax;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {boolean}
     */
    isNear(x, y) {

        let distanceX = 0;
        let distanceY = 0;

        if (x < this.xMin) {
            distanceX = this.xMin - x;
        }
        if (x > this.xMax) {
            distanceX = x - this.xMax;
        }
        if (y < this.yMin) {
            distanceY = this.yMin - y;
        }
        if (y > this.yMax) {
            distanceY = y - this.yMax;
        }

        const distance = distanceX + distanceY;
        return distance < 5;
    }

    /**
     * 
     * @param {object} ctx 
     */
    drawSquare(ctx) {

        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const x = this.xMin;
        const y = this.yMin;
        const width = this.xMax - this.xMin;
        const height = this.yMax - this.yMin;

        ctx.rect(x, y, width, height);
        ctx.stroke();
    }

    /**
    * 
    * @param {object} ctx 
    */
    drawCircle(ctx) {

        const color = "#ff0000";
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const x = this.xMin;
        const y = this.yMin;
        const width = this.xMax - this.xMin;
        const height = this.yMax - this.yMin;

        ctx.arc((x + width / 2), (y + height / 2), 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}