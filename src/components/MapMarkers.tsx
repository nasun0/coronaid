import React from 'react';
import { Marker } from 'react-map-gl';
import { motion } from 'framer-motion';


const ICON = "M 17 0 c -9 0 -16 7 -16 16 c 0 9 16 30 16 30 s 16 -21 16 -30 c 0 -9 -7 -16 -16 -16 z m 0 21 c -3 0 -5 -2 -5 -5 s 2 -5 5 -5 s 5 2 5 5 s -2 5 -5 5 z"

function Pin(props: {data: [number, number, string, string], extraInfoHandler: (extraInfo: any) => void}) {
    let pin = false;
    const { data, extraInfoHandler } = props;
    const size = 30;
    const onHoverStart = () => {
        extraInfoHandler([data[2], data[3]]);
    };
    const onHoverEnd = () => {
        if (!pin) {
            extraInfoHandler(null);
        }
    }
    return (
        <motion.div whileHover={{scale: 1.2}}
         whileTap={{scale: 0.9}} style={{transform: `translate(${-size / 2}, ${-size}px)`}}
         onHoverStart={onHoverStart} onHoverEnd={onHoverEnd} onClick={() => pin = !pin}>
            <svg height={size} viewBox="0 0 32 48" style={{cursor: 'pointer', fill: 'rgba(131, 255, 51, 0.7)', stroke: 'none'}}>
                <path d={ICON}/>
            </svg>
        </motion.div>
    );
}

function Markers(props: {data: [number, number, string, string][], extraInfoHandler: (extraInfo: any) => void}) {
    const { data, extraInfoHandler } = props;
    return <>{data.map(el => (
        <Marker key={el[2] + el[0] + el[1]} longitude={el[0]} latitude={el[1]}>
            <Pin data={el} extraInfoHandler={extraInfoHandler}/>
        </Marker>
    ))}</>;
};

export default Markers;