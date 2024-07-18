Here's the code for both the server and client, ready to paste into Visual Studio Code:

// server.ts
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface Building {
    id: string;
    name: string;
    energyConsumption: number;
}

const buildings: Building[] = [];

app.get('/buildings', (req, res) => {
    res.json(buildings);
});

app.post('/buildings', (req, res) => {
    const newBuilding: Building = {
        id: Date.now().toString(),
        name: req.body.name,
        energyConsumption: Math.random() * 100
    };
    buildings.push(newBuilding);
    res.status(201).json(newBuilding);
});

app.get('/totalEnergyConsumption', (req, res) => {
    const total = buildings.reduce((sum, building) => sum + building.energyConsumption, 0);
    res.json({ totalConsumption: total.toFixed(2) });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// client.ts
import fetch from 'node-fetch';

async function runClient() {
    const baseUrl = 'http://localhost:3000';

    // Add buildings
    const buildings = ['Science Lab', 'Library', 'Dormitory'];
    for (const building of buildings) {
        await fetch(`${baseUrl}/buildings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: building })
        });
        console.log(`Added ${building}`);
    }

    // Get all buildings
    const buildingsResponse = await fetch(`${baseUrl}/buildings`);
    const buildingsData = await buildingsResponse.json();
    console.log('All buildings:', buildingsData);

    // Get total energy consumption
    const energyResponse = await fetch(`${baseUrl}/totalEnergyConsumption`);
    const energyData = await energyResponse.json();
    console.log('Total energy consumption:', energyData.totalConsumption);
}

runClient().catch(console.error);

To use this code:

Create two files in your project directory: server.ts and client.ts.
Paste the corresponding code into each file.
Make sure you have installed the necessary dependencies:
Copynpm install express @types/express node-fetch@2 @types/node-fetch@2
Note: We're using node-fetch@2 because version 3 and above is ESM-only and requires additional configuration.
Run the server with: npx ts-node server.ts
In a separate terminal, run the client with: npx ts-node client.ts

This setup provides a simple SOA demonstration for the Smart Campus Energy Management System.
