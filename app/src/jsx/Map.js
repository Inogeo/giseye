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

export default function Map({x,y,z}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng] = useState(x);
    const [lat] = useState(y);
    const [zoom] = useState(z);
    const [API_KEY] = useState(process.env.REACT_APP_MAPBOX_API_KEY);

    // Resize map (debounced)
    const mapResizeDebounced = useDebouncedCallback(() => {
        map.current.resize();
    }, 20);

    // Update URL coordinsate (debounced)
    const mapUpdateURLDebounced = useDebouncedCallback(() => {
        const nextURL = new URL(window.location.href)
        const nextTitle = document.title
        const currentMapCoords = map.current.getCenter()
        nextURL.searchParams.set('x', currentMapCoords.lng.toFixed(6))
        nextURL.searchParams.set('y', currentMapCoords.lat.toFixed(6))
        nextURL.searchParams.set('z', map.current.getZoom().toFixed(6))

        const nextState = { additionalInformation: currentMapCoords.lng.toFixed(6).toString() + '_' + currentMapCoords.lat.toFixed(6).toString() + "_" + map.current.getZoom().toFixed(6).toString() };
        
        // We update window history only if state is new
        if (window.history.state){
            if (window.history.state.additionalInformation !== nextState.additionalInformation) {
                window.history.pushState(nextState, nextTitle, nextURL);
                window.history.replaceState(nextState, nextTitle, nextURL);
            }
        }
        else {
            window.history.pushState(nextState, nextTitle, nextURL);
            window.history.replaceState(nextState, nextTitle, nextURL);
        }
    }, 50)

    // Update map extend (based on coordinates)
    const mapUpdateCenterFromURLDebounced = useDebouncedCallback((e) => {
        const mapURL = new URL(e.target.location.href)
        map.current.flyTo({
            center: [mapURL.searchParams.get('x'), mapURL.searchParams.get('y')],
            zoom: mapURL.searchParams.get('z')
        })
        // map.current.setCenter([
        //     mapURL.searchParams.get('x'),
        //     mapURL.searchParams.get('y')
        // ])
        // map.current.setZoom(mapURL.searchParams.get('z'))

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


        // Fires debounced resize when map is resized
        const resizer = new ResizeObserver(entries => {
            if (map.current) mapResizeDebounced();
        });
        resizer.observe(mapContainer.current);

        // Fires debounced coordinates updates in get params when map is moved
        map.current.on('moveend', function () { mapUpdateURLDebounced() });

        // Fires map centering when windows back navigation buttons are changed
        window.addEventListener('popstate', e => mapUpdateCenterFromURLDebounced(e))

    }, [API_KEY, lat, lng, zoom, mapResizeDebounced, mapUpdateURLDebounced, mapUpdateCenterFromURLDebounced])

    return (
        <div className="uk-height-1-1">
            <div className="uk-height-1-1" ref={mapContainer} ></div>
        </div>
    );

}