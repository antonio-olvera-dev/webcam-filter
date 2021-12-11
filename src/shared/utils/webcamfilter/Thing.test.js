
import { Thing } from './Thing';
import 'jest-canvas-mock';

describe('Test Thing', () => {


    test('Successful initialization', () => {

        const thing = new Thing(10, 5);

        expect(thing).toBeTruthy()
        expect([{ x: 10, y: 5 }]).toEqual(thing.pixels);
        expect(10).toBe(thing.xMax);
        expect(10).toBe(thing.xMin);
        expect(5).toBe(thing.yMax);
        expect(5).toBe(thing.yMin);
    });

    test('Check addPixel(x, y)', () => {

        const thing = new Thing(10, 5);
        thing.addPixel(1, 2);

        expect(10).toBe(thing.xMax);
        expect(1).toBe(thing.xMin);
        expect(5).toBe(thing.yMax);
        expect(2).toBe(thing.yMin);
        expect([{ x: 10, y: 5 }, { x: 1, y: 2 }]).toEqual(thing.pixels);
    });

    test('Check isNear(x, y)', () => {

        const thing = new Thing(10, 5);
        thing.addPixel(1, 2);

        const isNear = thing.isNear(1, 2);
        expect(isNear).toBeTruthy();

        const isNotNear = thing.isNear(15, 2);
        expect(isNotNear).toBeFalsy();
    });

    test('drawSquare(ctx)', () => {

        const thing = new Thing(10, 5);
        const ctx = new CanvasRenderingContext2D();
        thing.drawSquare(ctx);

        const x = ctx.__getDrawCalls()[0].props.path[1].props.x;
        const y = ctx.__getDrawCalls()[0].props.path[1].props.y;
        expect(x).toBe(10);
        expect(y).toBe(5);
    });

    test('drawCircle(ctx)', () => {

        const thing = new Thing(10, 5);
        const ctx = new CanvasRenderingContext2D();
        thing.drawCircle(ctx);

        const x = ctx.__getDrawCalls()[0].props.path[1].props.x;
        const y = ctx.__getDrawCalls()[0].props.path[1].props.y;
        expect(x).toBe(10);
        expect(y).toBe(5);
    });
    
});

