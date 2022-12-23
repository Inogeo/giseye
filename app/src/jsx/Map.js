// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Import REACT
import React, {
    //useEffect,
    useRef,
    useState,
    useEffect,
} from "react";

// Import debouncer hook
import { useDebouncedCallback } from "use-debounce";

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(2.213749);
    const [lat] = useState(46.227638);
    const [zoom] = useState(4);
    const [API_KEY] = useState(process.env.REACT_APP_MAPBOX_API_KEY);

    const mapResizeDebounced = useDebouncedCallback(() => {
        map.current.resize();
    }, 20);

    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/bright-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom,
            trackResize: true,
            scrollZoom: true,
        });

        const resizer = new ResizeObserver(entries => {
            if (map.current) mapResizeDebounced();
        });

        resizer.observe(mapContainer.current);

    }, [API_KEY, lat, lng, zoom, mapResizeDebounced])

    return (
        <div className="uk-height-1-1">
            <div className="uk-height-1-1" ref={mapContainer} ></div>
        </div>
    );

}