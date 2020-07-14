import React, { useState } from 'react';
import ReactMapGL, { WebMercatorViewport } from 'react-map-gl';
import styled from 'styled-components';

import GetLocations from 'core/GetLocations';
// import MapOverlay from './MapOverlay';
import Markers from './MapMarkers';


const Container = styled.div`
position: absolute;
`;

export default function(props: {extraInfoHandler: (extraInfo: any) => void, currentTerm: string}) {
    const { extraInfoHandler, currentTerm } = props;
    let [viewport, setViewport] = useState({
        latitude: 33.074760,
        longitude: -96.788420,
        zoom: 13,
    });
    let [prevViewport, setPrevViewport] = useState(viewport);
    const [places, setPlaces] = useState([] as [number, number, string, string][]);
    const [term, setTerm] = useState("");

    if (viewport !== prevViewport || term !== currentTerm) {
        setPrevViewport(viewport);
        setTerm(currentTerm);
        const maxMarkerNum = 100;

        const mercatorViewport = new WebMercatorViewport(viewport);
        const bottomLeft = mercatorViewport.unproject([0, 0]);
        const topRight = mercatorViewport.unproject([mercatorViewport.width, mercatorViewport.height]);
        const leftX = bottomLeft[0];
        const rightX = topRight[0];
        const bottomY = topRight[1];
        const topY = bottomLeft[1];

        const locations = GetLocations(currentTerm, viewport.longitude, viewport.latitude);
        locations.then(data => {
            let filteredLocations = data.filter(el => el[0] >= leftX && el[0] <= rightX && el[1] >= bottomY && el[1] <= topY);
            if (filteredLocations.length > maxMarkerNum) {
                filteredLocations = filteredLocations.splice(0, maxMarkerNum);
            }
            setPlaces(filteredLocations);
        });
    }

    return (
        <Container>
            <ReactMapGL width="100vw" height="100vh" {...viewport}
             onViewportChange={viewport => setViewport(viewport)}
             mapStyle="mapbox://styles/aephus/ckckyntll05jg1io32lfhe18d">
                <Markers data={places} extraInfoHandler={extraInfoHandler}/>
            </ReactMapGL>
        </Container>
    );
};
// <MapOverlay locations={coords}/>