import React from 'react';
import MapGL, { CanvasOverlay } from 'react-map-gl';


function round(x: number, n: number) {
    const tenN = Math.pow(10, n);
    return Math.round(x * tenN) / tenN;
}

interface redrawOptions {
    width: number;
    height: number;
    project: (lnglat: number[]) => number[];
    unproject: (xy: number[]) => number[];
    ctx: CanvasRenderingContext2D;
}

function MapOverlay(props: {locations: [number, number][]}) {
    const locations = props.locations;
    const dotRadius = 4;
    const dotFill = '#1FBAD6';
    const compositeOperation = 'source-over';
    const redraw = (opts: redrawOptions) => {
        const { width, height, project, unproject, ctx } = opts;
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = compositeOperation;
        if (locations) {
            for (const location of locations) {
                const pixel = project(location);
                const pixelRounded = [round(pixel[0], 1), round(pixel[1], 1)];
                if (
                    pixelRounded[0] + dotRadius >= 0 &&
                    pixelRounded[0] - dotRadius < width &&
                    pixelRounded[1] + dotRadius >= 0 &&
                    pixelRounded[1] - dotRadius < height
                ) {
                    ctx.fillStyle = dotFill;
                    ctx.beginPath();
                    ctx.arc(pixelRounded[0], pixelRounded[1], dotRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }
    return <CanvasOverlay redraw={redraw}/>
}

export default MapOverlay;