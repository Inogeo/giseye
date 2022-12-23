import React, {
    useEffect,
    useState,
} from "react";

import {AdapterWMTS, AdapterWMS} from './utils/Adapters'


export default function CatalogServiceConnect({ serviceConnect, handleLayerAdd }){

    var serviceConnectDOM
    const [serviceConnectLayers, setServiceConnectLayersList] = useState(
        {
            'loaded': false,
            'loading': false,
            'data':[]
        }
    )

    function handleLoadLayerListCallback(layers) {
        setServiceConnectLayersList(
            {
                'loaded': true,
                'loading': false,
                'data': layers
            }
        )
    }

    useEffect(() => {

        // Load layers with appropriate adapter depending on the stype of service used
        if ('url' in serviceConnect && !serviceConnectLayers.loaded && !serviceConnectLayers.loading){
            
            var serviceConnectAdapter

            if (serviceConnect.type ==='WMTS'){
                serviceConnectAdapter = new AdapterWMTS(serviceConnect.url)
            }
            else if (serviceConnect.type === 'WMS'){
                serviceConnectAdapter = new AdapterWMS(serviceConnect.url)
            }

            setServiceConnectLayersList(
                {
                    'loaded': false,
                    'loading': true,
                    'data': []
                }
            )
            serviceConnectAdapter.loadLayers(handleLoadLayerListCallback)
        }
        
    }, [serviceConnect, serviceConnectLayers.loaded, serviceConnectLayers.loading]);

    // IF no service is connected yet
    if (!('url' in serviceConnect)){
        serviceConnectDOM = (
            <div>
                <p className='uk-text-large'>No service connected</p>
                <hr></hr>
                <p>Please select one service to connect, or add a new service.</p>
            </div>
        )
    }
    // IF service is connected yet
    else {
        // If layers are not loaded
        if (serviceConnectLayers.loading){
            serviceConnectDOM = (
                <div>
                    <p className='uk-text-large'>{serviceConnect.type} Service: {serviceConnect.name}</p>
                    <hr></hr>
                    <p><span uk-spinner="ratio: 0.8"></span>&nbsp;Data is loading</p>
                </div>
            )
        }
        // If layers are loaded
        else {
            const layersDOM = []
            // Preparing the HTML for layer list
            serviceConnectLayers.data.forEach(layerElement => {
                layersDOM.push(
                    <div key={layerElement.sourceUUID} className="uk-background-muted uk-padding-small uk-margin-small-top" >
                        <div className="uk-grid-collapse" uk-grid="">
                            <div className="uk-width-3-4">
                                <p className="uk-padding-remove uk-margin-remove uk-text-bold">{layerElement.title}</p>
                            </div>
                            <div className="uk-width-1-4">
                                <ul className="uk-iconnav">
                                    <li><button uk-icon="icon: plus" uk-tooltip="title: Add to map" onClick={e => handleLayerAdd(e, layerElement)}></button></li>
                                </ul>
                            </div>
                        </div>
                        <p className="uk-padding-remove uk-margin-remove">{layerElement.abstract}</p>
                    </div>
                )
            })
            serviceConnectDOM = (
                <div>
                    <p className='uk-text-large'>{serviceConnect.type} Service: {serviceConnect.name}</p>
                    <hr></hr>
                    <p>Data loaded and listed below.</p>
                    <div className="uk-padding-remove uk-overflow-auto" style={{height:'calc(100vh - 150px)'}}>
                        {layersDOM}
                    </div>
                </div>
            )
        }

    }

    return serviceConnectDOM

}

