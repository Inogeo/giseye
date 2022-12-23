import React, {
    useRef,
} from "react";

export default function LegendLayer(props){

    const opacityRangeRef = useRef(null)
    
    function handleLegendLayerOpacity(e, layer){
       props.handleMapLayerOpacity(e, layer)
    }

    function handleLegendLayerVisibility(e, layer){
        // Lock opacity range bar
        if (opacityRangeRef.current.disabled){
            opacityRangeRef.current.disabled = false
        }
        else {
            opacityRangeRef.current.disabled = true
        }
        console.log(opacityRangeRef.current.disabled)

        // TODO: Change icon style to red

        // Toggle layer opacity in map component
        props.handleMapLayerVisibility(e, layer)
    }

    return (
        <li key={props.layer.uuid} className='uk-open uk-background-muted uk-padding-small'>
            <a className='uk-accordion-title' href="/" uk-tooltip="Drag/Drop to re-order layers; delay: 500">
                {/* <span className="uk-sortable-handle uk-margin-small-right uk-text-center" uk-icon="icon: table" uk-tooltip="Change layer order"></span> */}
                {props.layer.title}
            </a>
            <div className='uk-accordion-content'>
                <div uk-grid="">
                    <div className="uk-width-auto">
                        <button className="uk-margin-small-right uk-text-center" uk-icon="icon: ban" uk-tooltip="Toggle visibility" onClick={(e) => { handleLegendLayerVisibility(e, props.layer) }}></button>
                    </div>
                    <div className="uk-width-expand uk-padding-remove-left">
                        <input ref={opacityRangeRef} className="uk-range" type="range" defaultValue="100" min="0" max="100" step="0.1" aria-label="Range" onChange={(e) => { handleLegendLayerOpacity(e, props.layer) }}></input>
                    </div>
                </div>
            </div>
        </li>
    )
}