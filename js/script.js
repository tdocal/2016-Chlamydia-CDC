var view = view;

require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Home",
    "esri/widgets/Legend",
    "dojo/domReady!"
], function (
    Map,
    SceneView,
    FeatureLayer,
    Home,
    Legend
) {
    
    var map = new Map({
            basemap: "dark-gray-vector"
            //basemap: "gray-vector",
            //basemap: "streets-vector",
            //basemap: "topo-vector",
            //basemap: "streets-night-vector",
            //basemap: "streets-relief-vector",
            //basemap: "streets-navigation-vector"
            //basemap: "oceans"
            //basemap: "topo"
            //ground: "world-elevation"
        });
    
    view = new SceneView({
        map: map,
        container: "viewDiv",
        constraints: {
            snapToZoom: false,
            //minZoom: 5,
            maxZoom: 21
        },
        
        //Caerma position for Colorado
        /*camera: {
            position: {
                longitude: -107.96521,
                latitude: 32.62916,
                z: 576683
            },
            tilt: 47,
            heading: 18
        }*/
        
        //Camera angle position for southern states
        /*camera: {
            position: {
                longitude: -87.135398,
                latitude: 16.625224,
                z: 2396823
            },
            tilt: 29.4,
            heading: 349
        }*/
        
        //Caerma postion for south atlantic region
        camera: {
            position: {
                longitude: -67.96718,
                latitude: 19.113637,
                z: 1789809.75
            },
            tilt: 46.42,
            heading: 317.59
        }
        
        //Camera position for viewing continental US
        /*camera: {
            position: {
                longitude: -98.390935,
                latitude: 23.5846293,
                z: 4606672
            },
            tilt: 15,
            heading: 0
        }*/
    });

    view.ui.remove("zoom");

    var homeButton = new Home({
        view: view
    });

    view.ui.add(homeButton, "top-left");
    
    view.ui.add("layerDiv", "bottom-right");
    
    view.popup.dockEnabled = true;
    view.popup.dockOptions = {
        buttonEnabled: false,
        breakpoint: false,
        position: "top-right",
        autoCloseEnabled: true
    };

    var sceneRenderer = {
            type: "simple",
            symbol: {
                type: "polygon-3d",
                symbolLayers: [{
                    type: "extrude"
                }]
            },
            visualVariables: [{
                type: "color",
                field: "Rate_per_1",
                legendOptions: {
                    title: "% of population with chlamydia"
                },
                stops: [{
                    value: 100,
                    color: "#f1eef6",
                    label: "<0.1%"
                }, {
                    value: 3000,
                    color: "#045a8d",
                    label: ">3%"
                }]
            }, {
                type: "size",
                field: "Cases",
                legendOptions: {
                    title: "Total # of reported cases"
                },
                stops: [{
                    value: 20,
                    size: 8000,
                    label: "20"
                }, {
                    value: 20000,
                    size: 200000,
                    label: ">20,000"
                }]
            }]
        };
    
    /*var countyDescr = function() {
        if (STATE_NAME === "Louisiana") {
            countyDescr = "Parrish";
        } if (STATE_NAME === "Alaska") {
            countyDescr = "Burrough";
        } else {
            countyDescr = "County";
        }
    };*/
    
    /*var countyDescr = "county";
    if ({STATE_NAME} === "Alaska"){
        countyDescr = "Burrough";
    } if ({STATE_NAME} === "Louisiana") {
        countyDescr = "Parrish";
    }*/
    
    var radios = document.getElementsByTagName("INPUT");
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener("change", function(e) {
            var censusLayer = e.target.value;
            if (censusLayer === "southAtl") {
                map.removeAll();                
                map.add(countyLayer);
            } if (censusLayer === "eastSouth") {
                map.removeAll();
                map.add(countyLayer_esouth);
            } if (censusLayer === "westSouth") {
                map.removeAll();
                map.add(countyLayer_wsouth);
            } if (censusLayer === "mountain") {
                map.removeAll();
                map.add(countyLayer_mountain);
            } if (censusLayer === "pacific") {
                map.removeAll();
                map.add(countyLayer_pacific);
            } if (censusLayer === "eastNorth") {
                map.removeAll();
                map.add(countyLayer_enorth);
            } if (censusLayer === "westNorth") {
                map.removeAll();
                map.add(countyLayer_wnorth);
            } if (censusLayer === "newEng") {
                map.removeAll();
                map.add(countyLayer_neweng);
            } if (censusLayer === "midAtl") {
                map.removeAll();
                map.add(countyLayer_midatl);
            }
        });
    }
    
    var countyLayer = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_US_STD_2016_Map/FeatureServer/0",
        definitionExpression: "Cases > 0 AND STATE_NAME = 'Delaware' OR STATE_NAME = 'District of Columbia' OR STATE_NAME = 'Florida' OR STATE_NAME = 'Georgia' OR STATE_NAME = 'Maryland' OR STATE_NAME = 'North Carolina' OR STATE_NAME = 'South Carolina' OR STATE_NAME = 'Virginia' OR STATE_NAME = 'West Virginia'",
        title: "South Atlantic Census Division",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAM}",
            content: "{Chlam_Perc}% of the population was diagnosed with chlamydia<br>{Cases} cases reported in {NAME} county",
            fieldInfos: [{
                fieldName: "Cases",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "POP2009",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    map.add(countyLayer);
    
    var countyLayer_esouth = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_US_STD_2016_Map/FeatureServer/0",
        definitionExpression: "Cases > 0 AND STATE_NAME = 'Alabama' OR STATE_NAME = 'Kentucky' OR STATE_NAME = 'Mississippi' OR STATE_NAME = 'Tennessee'",
        title: "East South Central Census Divison",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAM}",
            content: "{Chlam_Perc}% of the population was diagnosed with chlamydia<br>{Cases} cases reported in {NAME} County",
            fieldInfos: [{
                fieldName: "Cases",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "POP2009",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    var countyLayer_wsouth = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_US_STD_2016_Map/FeatureServer/0",
        definitionExpression: "Cases > 0 AND STATE_NAME = 'Arkansas' OR STATE_NAME = 'Louisiana' OR STATE_NAME = 'Oklahoma' OR STATE_NAME = 'Texas'",
        title: "West South Central Census Divison",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAM}",
            content: "{Chlam_Perc}% of the population was diagnosed with chlamydia<br>{Cases} cases reported in {NAME} County",
            fieldInfos: [{
                fieldName: "Cases",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "POP2009",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    var countyLayer_mountain = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_US_STD_2016_Map/FeatureServer/0",
        definitionExpression: "Cases > 0 AND STATE_NAME = 'Arizona' OR STATE_NAME = 'Colorado' OR STATE_NAME = 'Idaho' OR STATE_NAME = 'Montana' OR STATE_NAME = 'Nevada' OR STATE_NAME = 'New Mexico' OR STATE_NAME = 'Utah' OR STATE_NAME = 'Wyoming'",
        title: "Mountain Census Divison",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAM}",
            content: "{Chlam_Perc}% of the population was diagnosed with chlamydia<br>{Cases} cases reported in {NAME} County",
            fieldInfos: [{
                fieldName: "Cases",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "POP2009",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    var countyLayer_pacific = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_US_STD_2016_Map/FeatureServer/0",
        definitionExpression: "Cases > 0 AND STATE_NAME = 'Alaska' OR STATE_NAME = 'California' OR STATE_NAME = 'Hawaii' OR STATE_NAME = 'Oregon' OR STATE_NAME = 'Washington'",
        title: "Pacific Census Divison",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAM}",
            content: "{Chlam_Perc}% of the population was diagnosed with chlamydia<br>{Cases} cases reported in {NAME} County",
            fieldInfos: [{
                fieldName: "Cases",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "POP2009",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    var countyLayer_enorth = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_US_STD_2016_Map/FeatureServer/0",
        definitionExpression: "Cases > 0 AND STATE_NAME = 'Illinois' OR STATE_NAME = 'Indiana' OR STATE_NAME = 'Michigan' OR STATE_NAME = 'Ohio' OR STATE_NAME = 'Wisconsin'",
        title: "East North Central Census Divison",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAM}",
            content: "{Chlam_Perc}% of the population was diagnosed with chlamydia<br>{Cases} cases reported in {NAME} County",
            fieldInfos: [{
                fieldName: "Cases",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "POP2009",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    var countyLayer_wnorth = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_US_STD_2016_Map/FeatureServer/0",
        definitionExpression: "Cases > 0 AND STATE_NAME = 'Iowa' OR STATE_NAME = 'Kansas' OR STATE_NAME = 'Minnesota' OR STATE_NAME = 'Missouri' OR STATE_NAME = 'Nebraska' OR STATE_NAME = 'North Dakota' OR STATE_NAME = 'South Dakota'",
        title: "West North Central Census Divison",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAM}",
            content: "{Chlam_Perc}% of the population was diagnosed with chlamydia<br>{Cases} cases reported in {NAME} County",
            fieldInfos: [{
                fieldName: "Cases",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "POP2009",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    var countyLayer_neweng = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_US_STD_2016_Map/FeatureServer/0",
        definitionExpression: "Cases > 0 AND STATE_NAME = 'Connecticut' OR STATE_NAME = 'Maine' OR STATE_NAME = 'Massachusetts' OR STATE_NAME = 'New Hampshire' OR STATE_NAME = 'Rhode Island' OR STATE_NAME = 'Vermont'",
        title: "New England Census Divison",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAM}",
            content: "{Chlam_Perc}% of the population was diagnosed with chlamydia<br>{Cases} cases reported in {NAME} County",
            fieldInfos: [{
                fieldName: "Cases",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "POP2009",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    var countyLayer_midatl = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_US_STD_2016_Map/FeatureServer/0",
        definitionExpression: "Cases > 0 AND STATE_NAME = 'New Jersey' OR STATE_NAME = 'New York' OR STATE_NAME = 'Pennsylvania'",
        title: "Mid-Atlantic Census Divison",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAM}",
            content: "{Chlam_Perc}% of the population was diagnosed with chlamydia<br>{Cases} cases reported in {NAME} County",
            fieldInfos: [{
                fieldName: "Cases",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "POP2009",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    //view.whenLayerView(stateLayer).then(setupHoverTooltip);
    //view.whenLayerView(countyLayer || countyLayer_esouth).then(setupHoverTooltip);
    //view.whenLayerView(countyLayer).then(setupHoverTooltip);
    
    //Create a Tooltip that displays the name of the county when the mouse hovers over a region of the map
    /*function setupHoverTooltip(layerview) {
        var promise;
        var highlight;

        var tooltip = createTooltip();
        view.on("pointer-move", function (event) {
            if (promise) {
                promise.cancel();
            }
            promise = view.hitTest(event.x, event.y)
                .then(function (hit) {
                    promise = null;

                    if (highlight) {
                        highlight.remove();
                        highlight = null;
                    }

                    var results = hit.results.filter(function (result) {
                            //return result.graphic.layer === stateLayer;
                            //return result.graphic.layer == (countyLayer || countyLayer_esouth);
                            return result.graphic.layer == countyLayer;
                        });
                    if (results.length) {
                        var graphic = results[0].graphic;
                        var screenPoint = hit.screenPoint;

                        highlight = layerview.highlight(graphic);
                        //tooltip.show(screenPoint, graphic.getAttribute("STATE_NAME"));
                        tooltip.show(screenPoint, graphic.getAttribute("COUNTY_NAM"));
                    } else {
                        tooltip.hide();
                    }
                });
        });
    }
    
    function createTooltip() {
        var tooltip = document.createElement("div");
        var style = tooltip.style;

        tooltip.setAttribute("role", "tooltip");
        tooltip.classList.add("tooltip");

        var textElement = document.createElement("div");
        textElement.classList.add("esri-widget");
        tooltip.appendChild(textElement);

        view.container.appendChild(tooltip);

        var x = 0;
        var y = 0;
        var targetX = 0;
        var targetY = 0;
        var visible = false;

        function move() {
            x += (targetX - x) * 0.1;
            y += (targetY - y) * 0.1;

            if (Math.abs(targetX - x) < 1 && Math.abs(targetY - y) < 1) {
                x = targetX;
                y = targetY;
            } else {
                requestAnimationFrame(move);
            }

            style.transform = "translate3d(" + Math.round(x) + "px," + Math.round(y - 30) + "px, 0)";
        }

        return {
            show: function (point, text) {
                if (!visible) {
                    x = point.x;
                    y = point.y;
                }

                targetX = point.x;
                targetY = point.y;
                style.opacity = 1;
                visible = true;
                textElement.innerHTML = text;

                move();
            },

            hide: function () {
                style.opacity = 0;
                visible = false;
            }
        };
    }*/

    var legend = new Legend({
            view: view
        });
    
    view.ui.add(legend, "bottom-left");
});