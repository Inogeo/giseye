// JSX components
import LegendLayer from "./LegendLayer";

import { 
    forwardRef,
    useState, 
    useImperativeHandle
} from "react"

const Legend = forwardRef((props, ref) => {

    const [layers, setLayers] = useState([])

    useImperativeHandle(ref, () => ({
        handleLayerAdd(e, newLayer){
            setLayers([...layers, newLayer])
        }
    }))

    const layersDOM = []
    for (var i = 0; i < layers.length; i++) {
        const layer = layers[i]
        layersDOM.push(
            <LegendLayer key={layer.pk} layer={layer} handleMapLayerOpacity={(e, layer) => { props.targetMapRef.current.handleMapLayerOpacity(e, layer) }} handleMapLayerVisibility={(e, layer) => { props.targetMapRef.current.handleMapLayerVisibility(e, layer)}}></LegendLayer>
        )
    }

    return(
        <div className='uk-width-1-6@l uk-width-1-5@m uk-padding-small uk-text-left uk-background-default' filter-catalog='true' filter-map='true'>
            <p className='uk-text-large'>Legend</p>
            <hr></hr>
            <div className="uk-overflow-auto" style={{ height: 'calc(100vh - 151px)' }} >
                <ul uk-accordion='multiple: true' uk-sortable="handle: .uk-sortable-handle">
                    {layersDOM}
                </ul>
            </div>
        </div>
    )
})

export default Legend