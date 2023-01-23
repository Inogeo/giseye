// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from '!maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// Import REACT
import  {
    useRef,
    useState,
    useEffect
} from "react";

// Import REDUX
import {
    useSelector,
    useDispatch
} from "react-redux";

// Import REDUX custom selectors
import { layerSliceStateGetLayerListWithoutStyle, mapSliceGet } from './utils/ReduxSelectors';
import { setMapLocation } from './slices/MapSlice';

// Import debouncer hook
import { useDebouncedCallback } from "use-debounce";

// JSX components
import MapLayer from './MapLayer';

export default function Map() {

    // Refs mandatory to render map
    const mapContainer = useRef(null);
    const map = useRef(null);
    const dispatch = useDispatch()
    
    // Attaching layers to REDUX Store State
    const mapCenter = useSelector((state) => mapSliceGet(state))
    const layers = useSelector(state => layerSliceStateGetLayerListWithoutStyle(state));

    // UseFul to display background layer
    const [API_KEY] = useState(process.env.REACT_APP_MAPBOX_API_KEY);

    // DEBOUNCED FUNCTIONS
    // Resize map (debounced)
    const mapResizeDebounced = useDebouncedCallback(() => {
        map.current.resize();
    }, 20);

    // Update URL coordinates (debounced)
    const mapUpdateURLDebounced = useDebouncedCallback(() => {
        
        // Fetch map coordinates 
        const currentMap = map.current
        const payload = {
            x : currentMap.getCenter().lng.toFixed(6),
            y : currentMap.getCenter().lat.toFixed(6),
            z : currentMap.getZoom().toFixed(6)
        }

        // Send them to REDUX reducer
        dispatch(setMapLocation(payload))

    }, 20)
    
    // USEEFFECT
    // Set up the map
    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once

        // initial map configuration
        const initialMapConfig = {
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/bright-v2/style.json?key=${API_KEY}`,
            trackResize: true,
            scrollZoom: true,
            center: [18.411385, 25.850485],
            zoom: 1.766200
        }

        map.current = new maplibregl.Map(initialMapConfig);
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        // Fires debounced resize when map is resized
        const resizer = new ResizeObserver(entries => {
            if (map.current) mapResizeDebounced();
        });
        resizer.observe(mapContainer.current);

        // Fires debounced coordinates updates in get params when map is moved
        map.current.on('moveend', function () { mapUpdateURLDebounced() });

        // Fires map centering when browser window back and forward navigation buttons are used
        // window.addEventListener('popstate', e => mapUpdateCenterFromURLDebounced(e))

    }, [API_KEY, mapResizeDebounced, mapUpdateURLDebounced, layers])

    // Adjust the map config depending on state
    useEffect(() => {

        // Fetch map coordinates 
        const currentMap = map.current
        const mapCurrentCenter = {
            x: currentMap.getCenter().lng.toFixed(6),
            y: currentMap.getCenter().lat.toFixed(6),
            z: map.current.getZoom().toFixed(6)
        }

        // If state coordinates are different from map current coordinates, we move the map
        console.log('map location update')
        if (JSON.stringify(mapCurrentCenter) !== JSON.stringify(mapCenter)){
            map.current.flyTo({
                center: [mapCenter.x, mapCenter.y],
                zoom: mapCenter.z
            })
        }

    },[mapCenter])

    // RENDER

    // Fetch the list of layers and render them
    const layersDOM = []
    for (var i = 0; i < layers.length; i++) {
        const layer = layers[i]
        layersDOM.push(
            <MapLayer key={layer.pk} layerPK={layer.pk} targetMap={map}></MapLayer>
        )
    }

    return (
        <div className="uk-height-1-1">
            <div className="uk-height-1-1" ref={mapContainer} >
                {layersDOM}
            </div>
        </div>
    );
}