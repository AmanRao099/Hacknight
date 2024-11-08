// app.js

let map;
let markers = [];
let trafficData = []; // To store the traffic data
let trafficChart; // To store the reference to the chart
let infoWindows = []; // Store info windows to keep them updated

// Initialize the map and load traffic data
function initMap() {
    // Center the map around New York City (latitude 40.7128, longitude -74.0060)
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 40.7128, lng: -74.0060 }
    });

    // Fetch traffic data from the JSON file
    fetchTrafficData()
        .then(data => {
            trafficData = data; // Store the fetched traffic data

            // Loop through all locations and add a marker for each
            trafficData.forEach(location => {
                const marker = new google.maps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map: map,
                    title: location.name
                });

                // Store the marker in the markers array
                markers.push(marker);

                // Create info window
                const infowindow = new google.maps.InfoWindow({
                    content: `<div><strong>${location.name}</strong><br>Traffic Level: ${location.trafficLevel}%</div>`
                });

                // Store the infowindow for later updating
                infoWindows.push(infowindow);

                // Add an event listener to open the info window on marker click
                marker.addListener('click', () => {
                    infowindow.open(map, marker);
                });
            });

            // Create the traffic bar chart
            createTrafficChart();

            // Start the dynamic traffic simulation
            startDynamicTrafficSimulation();
        })
        .catch(error => console.error('Error loading traffic data:', error));
}

// Function to fetch traffic data from the JSON file
function fetchTrafficData() {
    return fetch('data/traffic-data.json')  // Ensure path is correct for your data file
        .then(response => response.json())
        .catch(error => {
            console.error("Error fetching traffic data:", error);
            return [];
        });
}

// Function to create the bar chart for traffic data
function createTrafficChart() {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    trafficChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: trafficData.map(location => location.name),
            datasets: [{
                label: 'Traffic Level (%)',
                data: trafficData.map(location => location.trafficLevel),
                backgroundColor: 'rgba(0, 123, 255, 0.5)', // Blue color for bars
                borderColor: 'rgba(0, 123, 255, 1)', // Border color for bars
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Traffic Level (%)'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Function to simulate dynamic traffic changes
function startDynamicTrafficSimulation() {
    setInterval(() => {
        trafficData.forEach((location, index) => {
            // Simulate random traffic level changes between -10% and +10%
            let randomChange = Math.floor(Math.random() * 21) - 10;
            location.trafficLevel = Math.max(0, Math.min(100, location.trafficLevel + randomChange));

            // Update the info window content with the new traffic level
            infoWindows[index].setContent(`<div><strong>${location.name}</strong><br>Traffic Level: ${location.trafficLevel}%</div>`);

            // Update the chart with the new traffic levels
            trafficChart.data.datasets[0].data = trafficData.map(location => location.trafficLevel);
            trafficChart.update();
        });
    }, 5000); // Update every 5 seconds
}
