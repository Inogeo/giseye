// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Import REACT
import React, {
    //useEffect,
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle
} from "react";

// Import debouncer hook
import { useDebouncedCallback } from "use-debounce";

const Map = forwardRef((props,ref) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [API_KEY] = useState(process.env.REACT_APP_MAPBOX_API_KEY);

    // Fetching params from window
    const queryParameters = new URLSearchParams(window.location.search)
    var x
    var y
    var z
    if (queryParameters.get("x") && queryParameters.get("y") && queryParameters.get("z")) {
        x = queryParameters.get("x")
        y = queryParameters.get("y")
        z = queryParameters.get("z")
    }
    else {
        x = 18.411385
        y = 25.850485
        z = 1.766200
    }

    // DEBOUNCED FUNCTIONS 

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
    }, 20);

    // USEEFFECT: Set up the map and launch all listeners
    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/bright-v2/style.json?key=${API_KEY}`,
            center: [x, y],
            zoom: z,
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

    }, [API_KEY, x, y, z, mapResizeDebounced, mapUpdateURLDebounced, mapUpdateCenterFromURLDebounced])

    // HANDLE FUNCTIONS
    useImperativeHandle(ref, (e, layer) => ({
        handleLayerAdd(e, layer) {
            map.current.addSource(
                layer.uuid + '_source',
                {
                    'type': 'raster',
                    'tiles': [
                        layer.url.href +'?bbox={bbox-epsg-3857}&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&format=image/png&transparent=true&width=256&height=256&styles=&layers='+layer.identifier 
                    ],
                    'tileSize': 256
                }
            );
            map.current.addLayer(
                {
                    'id': layer.uuid + '_layer',
                    'type': 'raster',
                    'source': layer.uuid + '_source',
                    'paint': {}
                },
            );
        },
    }));

    return (
        <div className="uk-height-1-1">
            <div className="uk-height-1-1" ref={mapContainer} ></div>
        </div>
    );

})

export default Map