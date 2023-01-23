// Import UIKIT (front-end css framework)
import UIkit from 'uikit'
import WMSCapabilities from 'ol/format/WMSCapabilities.js';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import fetchWithTimeout from './FetchWithTimeout'
import { v4 as uuidv4 } from 'uuid';

export class AdapterWMTS {
    /**
    * Adapter that handle all interactions with WMS/WMTS servers. It does contains all preformated functions.
    */

    constructor(baseurl) {
        const baseurl_new = new URL(baseurl)
        this.baseurl = new URL(baseurl_new.origin + baseurl_new.pathname)
    }

    /**
    * Load the list of layers in JSON format.
    */
    loadLayers(handleLoadLayerCallback) {

        // Preparing baseurl parameters
        var CapabilitiesURL = this.baseurl
        CapabilitiesURL.searchParams.append('SERVICE', 'WMTS')
        CapabilitiesURL.searchParams.append('REQUEST', 'GetCapabilities')

        const capabilitiesParser = new WMTSCapabilities();

        fetchWithTimeout(this.baseurl).then(function (response) {
            return response.text()
        }).then(function (response) {
            
            // Get capabilities with openLayer parser
            const capabilities = capabilitiesParser.read(response);

            // Parsing XML to load essential elements
            const layersCapabilities = capabilities.Contents.Layer
            const layersJSON = []
            for (let i = 0; i < layersCapabilities.length; i++) {
                // Fetching element
                const layerCapabilities = layersCapabilities[i]

                // Add identifier
                const layerURL = new URL(CapabilitiesURL.origin + CapabilitiesURL.pathname)

                // Adding layer to layer list
                layersJSON.push({
                    type: 'WMTS',
                    sourceUUID: uuidv4(),
                    title: layerCapabilities.Title,
                    abstract: layerCapabilities.Abstract,
                    identifier: layerCapabilities.Identifier,
                    url: layerURL.href,
                })

            }

            // Send layers to callback function
            handleLoadLayerCallback(layersJSON)

        }).catch((error) => {
            UIkit.notification(`Error loading WMTS service. ${error}`, { status: 'danger' })
        })
    }

}

export class AdapterWMS {
    /**
    * Adapter that handle all interactions with WMS/WMTS servers. It does contains all preformated functions.
    */

    constructor(baseurl) {
        const baseurl_new = new URL(baseurl)
        this.baseurl = new URL(baseurl_new.origin + baseurl_new.pathname)
    }

    /**
    * Load the list of layers in JSON format.
    */
    loadLayers(handleLoadLayerCallback) {

        // Preparing baseurl parameters
        var CapabilitiesURL = this.baseurl
        CapabilitiesURL.searchParams.append('SERVICE', 'WMS')
        CapabilitiesURL.searchParams.append('REQUEST', 'GetCapabilities')

       
        const capabilitiesParser = new WMSCapabilities();

        fetchWithTimeout(this.baseurl).then(function (response) {
            return response.text()
        }).then(function (response) {
            
            const capabilities = capabilitiesParser.read(response);

            // Parsing XML to load essential elements
            const layersCapabilities = capabilities.Capability.Layer.Layer
            const layersJSON = []
            for (let i = 0; i < layersCapabilities.length; i++) {
                // Fetching element
                const layerCapabilities = layersCapabilities[i]

                // Add identifier
                const layerURL = new URL(CapabilitiesURL.origin + CapabilitiesURL.pathname)

                // Adding layer to layer list
                layersJSON.push({
                    type: 'WMS',
                    sourceUUID: uuidv4(),
                    title: layerCapabilities.Title,
                    abstract: layerCapabilities.Abstract,
                    identifier: layerCapabilities.Name, 
                    url: layerURL.href,
                })

            }

            // Send layers to callback function
            handleLoadLayerCallback(layersJSON)

        }).catch((error) => {
            UIkit.notification(`Error loading WMS service. ${error}`, { status: 'danger' })
        })
    }

}