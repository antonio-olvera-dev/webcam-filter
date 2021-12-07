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

        if (x < this.xMin) {
            this.xMin = x;
        }
        if (x > this.xMax) {
            this.xMax = x;
        }

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

        if (x >= this.xMin && x <= this.xMax &&
            y >= this.yMin && y <= this.yMax) {

            return true;
        }

        let distX = 0;
        let distY = 0;

        if (x < this.xMin) {
            distX = this.xMin - x;
        }
        if (x > this.xMax) {
            distX = x - this.xMax;
        }
        if (y < this.yMin) {
            distY = this.yMin - y;
        }
        if (y > this.yMax) {
            distY = y - this.yMax;
        }

        const distancia = distX + distY;

        return distancia < 5;
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
}