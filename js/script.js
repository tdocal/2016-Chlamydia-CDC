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
        });
    
    var view = new SceneView({
        map: map,
        container: "viewDiv",
        constraints: {
            snapToZoom: false,
            //minZoom: 5,
            maxZoom: 21
        },
        //Default camera position
        camera: {
            position: {
                longitude: -70.0182656,
                latitude: 21.697644,
                z: 1468982
            },
            tilt: 43.6,
            heading: 314.49
        }
    });

    //Remove default zoom buttons from upper left;
    view.ui.remove("zoom");

    //Add home button to the upper left with the other UI buttons
    var homeButton = new Home({
        view: view
    });

    view.ui.add(homeButton, "top-left");
    
    //Add menu to lower left to hold radio buttons for displaying census regions
    view.ui.add("layerDiv", "bottom-right");
    
    //Anchor popup menu to upper right; remove ability for it to display in th center of screen
    view.popup.dockEnabled = true;
    view.popup.dockOptions = {
        buttonEnabled: false,
        breakpoint: false,
        position: "top-right",
        autoCloseEnabled: true
    };
    
    //Add legend to bottom left
    var legend = new Legend({
            view: view
        });
    
    view.ui.add(legend, "bottom-left");

    //Create renderer to display data in 3D columns based on county shape
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
                field: "RATE_PERC",
                legendOptions: {
                    title: "% of population with chlamydia"
                },
                stops: [{
                    value: 0.1,
                    color: "#f1eef6",
                    label: "<0.1%"
                }, {
                    value: 2.8,
                    color: "#045a8d",
                    label: ">2.8%"
                }]
            }, {
                type: "size",
                field: "CASES",
                legendOptions: {
                    title: "Total # of reported cases"
                },
                stops: [{
                    value: 20,
                    size: 3000,
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
    
    //Use radio buttons to determine which regions are displayed; remove other regions and move camera to each region
    var radios = document.getElementsByTagName("INPUT");
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener("change", function(e) {
            var censusLayer = e.target.value;
            if (censusLayer === "southAtl") {
                map.removeAll();
                countyLayer.definitionExpression = new String("CASES >= 0 AND STATE_NAME = 'Delaware' OR STATE_NAME = 'District of Columbia' OR STATE_NAME = 'Florida' OR STATE_NAME = 'Georgia' OR STATE_NAME = 'Maryland' OR STATE_NAME = 'North Carolina' OR STATE_NAME = 'South Carolina' OR STATE_NAME = 'Virginia' OR STATE_NAME = 'West Virginia'");
                view.goTo({
                    position: [-70.0182656, 21.697644, 1468982],
                    heading: 314.49,
                    tilt: 43.6
                });
            } if (censusLayer === "eastSouth") {
                map.removeAll();
                countyLayer.definitionExpression = new String("CASES >= 0 AND STATE_NAME = 'Alabama' OR STATE_NAME = 'Kentucky' OR STATE_NAME = 'Mississippi' OR STATE_NAME = 'Tennessee'");
                view.goTo({
                    position: [-85.000595, 23.971260, 1027984],
                    heading: 346.09,
                    tilt: 42.2
                });
            } if (censusLayer === "westSouth") {
                map.removeAll();
                countyLayer.definitionExpression = new String("CASES >= 0 AND STATE_NAME = 'Arkansas' OR STATE_NAME = 'Louisiana' OR STATE_NAME = 'Oklahoma' OR STATE_NAME = 'Texas'");
                view.goTo({
                    position: [-91.281626, 18.731395, 1416475],
                    heading: 344.11,
                    tilt: 41.7
                });
            } if (censusLayer === "mountain") {
                map.removeAll();
                countyLayer.definitionExpression = new String("CASES >= 0 AND STATE_NAME = 'Arizona' OR STATE_NAME = 'Colorado' OR STATE_NAME = 'Idaho' OR STATE_NAME = 'Montana' OR STATE_NAME = 'Nevada' OR STATE_NAME = 'New Mexico' OR STATE_NAME = 'Utah' OR STATE_NAME = 'Wyoming'");
                view.goTo({
                    position: [-122.252553, 25.69622, 1686595],
                    heading: 34.75,
                    tilt: 40.5
                });
            } if (censusLayer === "pacific") {
                map.removeAll();
                countyLayer.definitionExpression = new String("CASES >= 0 AND STATE_NAME = 'Alaska' OR STATE_NAME = 'California' OR STATE_NAME = 'Hawaii' OR STATE_NAME = 'Oregon' OR STATE_NAME = 'Washington'");
                view.goTo({
                    position: [-128.891211, 28.1493175, 1853437],
                    heading: 38.17,
                    tilt: 35.9
                });
            } if (censusLayer === "eastNorth") {
                map.removeAll();
                countyLayer.definitionExpression = new String("CASES >= 0 AND STATE_NAME = 'Illinois' OR STATE_NAME = 'Indiana' OR STATE_NAME = 'Michigan' OR STATE_NAME = 'Ohio' OR STATE_NAME = 'Wisconsin'");
                view.goTo({
                    position: [-93.211535, 32.614248, 1373359],
                    heading: 31.33,
                    tilt: 34.9
                });
            } if (censusLayer === "westNorth") {
                map.removeAll();
                countyLayer.definitionExpression = new String("CASES >= 0 AND STATE_NAME = 'Iowa' OR STATE_NAME = 'Kansas' OR STATE_NAME = 'Minnesota' OR STATE_NAME = 'Missouri' OR STATE_NAME = 'Nebraska' OR STATE_NAME = 'North Dakota' OR STATE_NAME = 'South Dakota'");
                view.goTo({
                    position: [-92.159829, 28.622827, 1517695],
                    heading: 348.15,
                    tilt: 38.3
                });
            } if (censusLayer === "newEng") {
                map.removeAll();
                countyLayer.definitionExpression = new String("CASES >= 0 AND STATE_NAME = 'Connecticut' OR STATE_NAME = 'Maine' OR STATE_NAME = 'Massachusetts' OR STATE_NAME = 'New Hampshire' OR STATE_NAME = 'Rhode Island' OR STATE_NAME = 'Vermont'");
                view.goTo({
                    position: [-68.420000, 35.013168, 780150],
                    heading: 346.08,
                    tilt: 47.8
                });
            } if (censusLayer === "midAtl") {
                map.removeAll();
                countyLayer.definitionExpression = new String("CASES >= 0 AND STATE_NAME = 'New Jersey' OR STATE_NAME = 'New York' OR STATE_NAME = 'Pennsylvania'");
                view.goTo({
                    position: [-70.801104, 34.410467, 830873],
                    heading: 329.58,
                    tilt: 44.4
                });
            } if (censusLayer === "all") {
                map.removeAll();
                countyLayer.definitionExpression = new String("Cases >= 0");
                view.goTo({
                    position: [-94.7388980, 22.6435973, 5487820],
                    heading: 0,
                    tilt: 13.9
                });
            }
            map.add(countyLayer);
        });
    }
    
    //Feature layer default region is mid atlantic 
    var countyLayer = new FeatureLayer({
        url: "https://services.arcgis.com/YseQBnl2jq0lrUV5/arcgis/rest/services/CDC_Chlamydia_2016/FeatureServer/0",
        definitionExpression: "CASES >= 0 AND STATE_NAME = 'Delaware' OR STATE_NAME = 'District of Columbia' OR STATE_NAME = 'Florida' OR STATE_NAME = 'Georgia' OR STATE_NAME = 'Maryland' OR STATE_NAME = 'North Carolina' OR STATE_NAME = 'South Carolina' OR STATE_NAME = 'Virginia' OR STATE_NAME = 'West Virginia'",
        title: "Reported Cases of Chlamydia 2016",
        renderer: sceneRenderer,
        popupTemplate: {
            title: "{COUNTY_NAME}",
            content: "{RATE_PERC}% of the population was diagnosed with {INDICATOR_}<br>{CASES} cases reported in {COUNTY_NAME} in 2016",
            fieldInfos: [{
                fieldName: "CASES",
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }]
        }
    });
    
    map.add(countyLayer);
    
    //Create a Tooltip that displays the name of the county when the mouse hovers over a region of the map
    view.whenLayerView(countyLayer).then(setupHoverTooltip);
    
    function setupHoverTooltip(layerview) {
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
                            return result.graphic.layer == countyLayer;
                        });
                    if (results.length) {
                        var graphic = results[0].graphic;
                        var screenPoint = hit.screenPoint;

                        highlight = layerview.highlight(graphic);
                        tooltip.show(screenPoint, graphic.getAttribute("COUNTY_NAME"));
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

            if (Math.abs(targetX) < 1 && Math.abs(targetY) < 1) {
                x = targetX;
                y = targetY;
            } else {
                requestAnimationFrame(move);
            }

            style.transform = "translate3d(" + Math.round(x) + "px," + Math.round(y - 50) + "px, 0)";
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
    }
});