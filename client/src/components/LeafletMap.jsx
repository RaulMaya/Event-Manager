import React, { useEffect, useRef } from 'react';
import './leafletStyles.css';
import { Box } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = ({ latitude, longitude, name }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = L.map(mapRef.current, {
                minZoom: 18,
                maxZoom: 21,
                maxBounds: L.latLngBounds([-90, -180], [90, 180]),
            }).setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            const marker = L.marker([latitude, longitude]).addTo(map);

            // Add a tooltip to the marker
            marker.bindTooltip(name, { permanent: false, direction: 'top' });
        }
    }, [latitude, longitude]);

    return (
        <Box height={["300px", "400px", "500px", "600px", "700px"]} width={["100%", "100%", "500px", "600px", "600px"]}>
            <div style={{ height: '100%' }} ref={mapRef}></div>
        </Box>
    );
};

export default LeafletMap;