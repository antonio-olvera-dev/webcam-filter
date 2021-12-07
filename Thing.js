class Thing {

    pixels = [];
    xMin = 0;
    xMax = 0;
    yMin = 0;
    yMax = 0;

    /**
     * 
     * @param {*} x 
     * @param {*} y 
     */
    constructor(x, y) {
        console.log("Thing");
        this.addPixel(x, y);
        this.xMin = x;
        this.xMax = x;
        this.yMin = y;
        this.yMax = y;
    }

    /**
     * 
     * @param {*} x 
     * @param {*} y 
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
     * @param {*} x 
     * @param {*} y 
     * @returns {boolean}
     */
    isNear(x, y) {

        if (x >= this.xMin && x <= this.xMax &&
            y >= this.yMin && y <= this.yMax) {

            return true;
        }

        var distX = 0;
        var distY = 0;

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

        var distancia = distX + distY;

        return distancia < 50;
    }

    /**
     * 
     * @param {*} ctx 
     */
    draw(ctx) {

        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 4;
        ctx.beginPath();
        var x = this.xMin;
        var y = this.yMin;
        var width = this.xMax - this.xMin;
        var height = this.yMax - this.yMin;

        ctx.rect(x, y, width, height);
        ctx.stroke();
    }
}