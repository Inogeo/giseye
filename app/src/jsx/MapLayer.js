// Import REACT
import { useEffect } from "react";

// Import REDUX
import { useSelector } from "react-redux";

// REDUX Selectors
import { layerSliceStateGetLayer } from "./utils/ReduxSelectors";


export default function MapLayer({targetMap, layerPK}){
    
    // Attaching layer to REDUX Store State
    const layer = useSelector(state => layerSliceStateGetLayer(state, layerPK));    
    
    // USEEFFECT: Creates and unmount MapLayer
    useEffect(() => {

        // Fetch targetMap
        const currentTargetMap = targetMap.current

        // Stops layer initializing more than once
        if (currentTargetMap.getLayer(layer.pk)) return; 

        // Create the source if layer is not existing
        var layerSourceLoaded = false;
        if (!currentTargetMap.getSource(layer.sourceUUID)) {
            switch (layer.type) {
                case 'WMS':
                    currentTargetMap.addSource(
                        layer.sourceUUID,
                        {
                            'type': 'raster',
                            'tiles': [
                                layer.url + '?bbox={bbox-epsg-3857}&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&format=image/png&transparent=true&width=256&height=256&styles=&layers=' + layer.identifier
                            ],
                            'tileSize': 256
                        }
                    );
                    layerSourceLoaded = true;
                    break;          
                default:
                    break;
            }
        }
        else {
            layerSourceLoaded = true
        }

        // We add the layer only if layerSource is loaded and not existing layer is here
        if (layerSourceLoaded && !currentTargetMap.getLayer(layer.pk)){
            currentTargetMap.addLayer(
                {
                    'id': layer.pk,
                    'type': 'raster',
                    'source': layer.sourceUUID,
                    'paint': {}
                },
            );
        }

        // This function is returned in case react element is unmounted
        // URL: https://fr.reactjs.org/docs/hooks-effect.html#example-using-hooks-1
        return function cleanup(){
            currentTargetMap.removeLayer(layer.pk)
        } 

    }, [targetMap, layer.pk, layer.sourceUUID, layer.identifier, layer.type, layer.url])

    // USEEFFECT: Setup MapLayer style
    useEffect(() => {

        // Fetch targetMap
        const currentTargetMap = targetMap.current

        // Raster layer (WMS) opacity
        currentTargetMap.setPaintProperty(
            layer.pk,
            'raster-opacity',
            layer.style.paint['raster-opacity']
        );
        
        // Raster layer (WMS) visibility
        currentTargetMap.setLayoutProperty(
            layer.pk,
            'visibility',
            layer.style.layout['visibility']
        )

    }, [ targetMap, layer.pk, layer.style])
    
    // Return EMPTY
    return (null)
}