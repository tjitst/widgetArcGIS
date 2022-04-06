import React, { createElement, useRef, useEffect } from 'react';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LayerList from "@arcgis/core/widgets/LayerList";
import Legend from "@arcgis/core/widgets/Legend";



export default function ArcGISMap() {
  
    const mapRef = useRef(null); //hiermee kan je refereren naar een element. We doen dit om hier de mapView aan te hangen en die vervolgens aan een Div te koppelen, zodat daar de MapView getoond kan worden

    useEffect (() => { //dit moet in een useEffect om werkend te zijn
        const myMap = new Map({
            basemap: "topo-vector"
        
        });

        // Create a MapView instance (for 2D viewing)
        const view = new MapView({
            map: myMap,  // References a Map instance
            container: mapRef.current,  // hier wordt de mapref gevuld met de MapView
            center: [4.4777, 51.9244], //welk punt als center moet worden gebruikt
            zoom: 12 //het zoomniveau
        });

        //SearchWidget toevoegen
        const searchWidget = new Search({
            view: view
        });
          // Adds the search widget below other elements in
          // the top left corner of the view
        view.ui.add(searchWidget, {
            position: "top-right",
            index: 2
        });

        // Create featurelayer from feature service
        const layer = new FeatureLayer({
            // URL to the service
            url: "https://services.arcgis.com/zP1tGdLpGvt2qNJ6/arcgis/rest/services/monumenten_demo/FeatureServer",
            
            //popup toevoegen
            popupTemplate: {
                title: "Pop-up",
                outFields: ["*"],
                content: [
                    {
                        type: "text",
                        text: "<div>Nummer: {UNIEKNR}</div>"
                    }
                ]
            }
            
        });

        myMap.layers.add(layer); //voeg de laag toe aan de kaart

        //Lijst met lagen widget toevoegen
        let layerList = new LayerList({
            view: view
        });

        view.ui.add(layerList, {
            position: "top-left"
        });

        // legenda toevoegen
        let legend = new Legend({
            view: view,
            visible: true
          });
          
        view.ui.add(legend, "bottom-right");
        
    
    }, [])
  
    return (
        <div style={{height: 600, width: 800}} ref={mapRef}></div>
  );
}
