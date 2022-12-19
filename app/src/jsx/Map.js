import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Import REACT
import React, {
    //useEffect,
    useRef,
    useState,
    useEffect
} from "react";

//import debounce from './utils/Debounce';

// import useResizeObserver from "@react-hook/resize-observer";


export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(2.213749);
    const [lat] = useState(46.227638);
    const [zoom] = useState(4);
    const [API_KEY] = useState(process.env.REACT_APP_MAPBOX_API_KEY);

    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [lng, lat],
            zoom: zoom,
            trackResize: true,
            scrollZoom: true,
        });

        console.log('map resized')
        const resizer = new ResizeObserver(entries => {
            if (map.current) map.current.resize();    
        });
        resizer.observe(mapContainer.current);

    }, [API_KEY, lat, lng, zoom])

    return (
        <div ref={mapContainer} id='test' className="uk-height-1-1">
            <div  className="uk-height-1-1"></div>
        </div>
    );

}