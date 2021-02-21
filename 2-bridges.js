
//default zoom & coordinates - currently centered on twin cities, change this
let mapCenterCoordinates = [42.597304, -97.866951]
let zoomLevel = 3.5


//bridge data
bridges = [
    {"name": "Verrazano-Narrows Bridge", "location": "New York, NY", "span": "1298.4", "coordinates": [40.6066, -74.0447]},
    {"name": "Golden Gate Bridge", "location": "San Francisco and Marin, CA","span": "1280.2", "coordinates": [37.8199, -122.4783]},
    {"name": "Mackinac Bridge", "location": "Mackinaw and St Ignace, MI", "span": "1158.0", "coordinates": [45.8174, -84.7278]},
    {"name": "George Washington Bridge", "location": "New York, NY and New Jersey, NJ", "span": "1067.0", "coordinates": [40.8517, -73.9527]},
    {"name": "Tacoma Narrows Bridge", "location": "Tacoma and Kitsap, WA", "span": "853.44", "coordinates": [47.2690, -122.5517]}
    ]


//map of bridges
let map = L.map("bridges-map").setView(mapCenterCoordinates, zoomLevel)

//map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//bridge icon
let bridgeIcon = L.icon({
    iconUrl: "001-bridge.png",

    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [0, -10]
})


//array for the bridge markers... just in case
bridgeMarkers = []

//arrays for the chart
bridgeLabels = []
bridgeData = []


bridges.forEach(function(bridge) {
    //add data for chart
    bridgeLabels.push(bridge.name)
    bridgeData.push(bridge.span)

    //add markers to map
    let marker = L.marker(bridge.coordinates, {icon: bridgeIcon})
        .bindPopup(`${bridge.name}<br>${bridge.location}<br>${bridge.span} meters.`)
        .addTo(map)
    
    //add markers to array
    bridgeMarkers.push(marker)
})

//chart!
let chartCanvas = document.querySelector("#bridges-chart")
let ctx = chartCanvas.getContext("2d")

let chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: bridgeLabels,
        datasets: [{
            label: "Span (Meters)",
            data: bridgeData,
            backgroundColor: ["salmon", "wheat", "slateblue", "olive", "teal"]
        }]
    },
    options: {
        scales: {
            yAxes: [ {
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})



