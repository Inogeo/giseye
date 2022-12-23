// Import REACT
import React, {
    //useEffect,
    //useRef,
    useState,
    //useEffect,
    forwardRef,
    useImperativeHandle
} from "react";

// JSX components
import LegendLayer from "./LegendLayer";

const Legend = forwardRef((props, ref) => {

    const [layers, setLayers] = useState([]) 

    // HANDLE FUNCTIONS (callable from parent)
    useImperativeHandle(ref, () => ({
        handleLayerAdd(e, newLayer) {
            const newLayers = [...layers, newLayer]
            setLayers(newLayers)
            
        },
    }));

    const layersDOM = []
    for (var i = 0; i < layers.length; i++) {
        const layer = layers[i]
        layersDOM.push(
            <LegendLayer key={layer.UUID} layer={layer} handleMapLayerOpacity={(e, layer) => { props.handleMapLayerOpacity(e, layer) }} handleMapLayerVisibility={(e, layer) => { props.handleMapLayerVisibility(e, layer)}}></LegendLayer>
        )
    }

    return(
        <div className='uk-width-1-6@l uk-width-1-5@m uk-padding-small uk-text-left uk-background-default' filter-catalog='true' filter-map='true'>
            <p className='uk-text-large'>Legend</p>
            <hr></hr>
            <ul uk-accordion='multiple: true' uk-sortable="handle: .uk-sortable-handle">
                {layersDOM}
            </ul>
        </div>
    )
})

export default Legend