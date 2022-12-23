// Import UIKIT (front-end css framework)
import UIkit from 'uikit'
import fetchWithTimeout from './FetchWithTimeout'
import { v4 as uuidv4 } from 'uuid';
//import { WMSTileLayer } from 'react-leaflet/WMSTileLayer'


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
    loadLayers(handleLoadLayerCallback){

        // Preparing baseurl parameters
        var CapabilitiesURL = this.baseurl
        CapabilitiesURL.searchParams.append('SERVICE', 'WMTS')
        CapabilitiesURL.searchParams.append('REQUEST', 'GetCapabilities')

        fetchWithTimeout(this.baseurl).then(function (response) {
            return response.text()
        }).then(function(response){
            const parser = new DOMParser()
            const doc = parser.parseFromString(response, "application/xml")
            const layersXML = doc.documentElement.getElementsByTagName('Contents')[0].getElementsByTagName('Layer')

            // Parsing XML to load essential elements
            const layersJSON = []
            for (let i = 0; i < layersXML.length; i++) {
                // Fetching element
                const element = layersXML[i]

                // Load title
                var title_xml = ''
                try {
                    title_xml = element.getElementsByTagName('ows:Title')[0].innerHTML
                } catch (error) {
                    UIkit.notification(`Error loading layer title. ${error}`, { status: 'danger' })
                }

                // Load abstract
                var abstract_xml = ''
                try {
                    abstract_xml = element.getElementsByTagName('ows:Abstract')[0].innerHTML
                } catch (error) {
                    // UIkit.notification(`${title_xml} Layer: Error loading abstract. ${error}`, { status: 'warning' })
                }

                // Add identifier
                const layerURL = new URL(CapabilitiesURL.origin + CapabilitiesURL.pathname)

                // Adding layer to layer list
                const currentUUID = uuidv4()
                layersJSON.push({
                    type: 'WMS',
                    uuid: currentUUID,
                    title: title_xml,
                    abstract: abstract_xml,
                    url: layerURL,
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

        fetchWithTimeout(this.baseurl).then(function (response) {
            return response.text()
        }).then(function (response) {
            const parser = new DOMParser()
            const doc = parser.parseFromString(response, "application/xml")
            const layersXML = doc.documentElement.getElementsByTagName('Layer')

            // Parsing XML to load essential elements
            const layersJSON = []
            for (let i = 0; i < layersXML.length; i++) {
                // Fetching element
                const element = layersXML[i]

                // Load title
                var title_xml = ''
                try {
                    title_xml = element.getElementsByTagName('Title')[0].innerHTML
                } catch (error) {
                    UIkit.notification(`Error loading layer title. ${error}`, { status: 'danger' })
                }

                // Load abstract
                var abstract_xml = ''
                try {
                    abstract_xml = element.getElementsByTagName('Abstract')[0].innerHTML
                } catch (error) {
                    // UIkit.notification(`${title_xml} Layer: Error loading abstract. ${error}`, { status: 'warning' })
                }

                // Load layer identifier
                var identifier_xml = ''
                try {
                    identifier_xml = element.getElementsByTagName('Name')[0].innerHTML
                } catch (error) {
                    UIkit.notification(`${title_xml} Layer: Error loading identifier. ${error}`, { status: 'danger' })
                }

                // Add identifier
                const layerURL = new URL(CapabilitiesURL.origin + CapabilitiesURL.pathname)

                // Adding layer to layer list
                const currentUUID = uuidv4()
                layersJSON.push({
                    type: 'WMS',
                    uuid: currentUUID,
                    title: title_xml,
                    abstract: abstract_xml,
                    identifier: identifier_xml, 
                    url: layerURL,
                })

            }

            // Send layers to callback function
            handleLoadLayerCallback(layersJSON)

        }).catch((error) => {
            UIkit.notification(`Error loading WMS service. ${error}`, { status: 'danger' })
        })
    }

}