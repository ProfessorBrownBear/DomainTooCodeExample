Here's the TypeScript code and instructions to build and run the app, formatted for easy copying into Visual Studio Code:
typescriptCopy// File: Building.ts
export interface IBuilding {
  id: string;
  name: string;
  energyConsumption: number;
  temperature: number;
  occupancy: number;
  lightingLevel: number;
  monitorEnergy(): void;
  adjustLighting(): void;
  updateOccupancy(): void;
}

export class Building implements IBuilding {
  constructor(
    public id: string,
    public name: string,
    public energyConsumption: number = 0,
    public temperature: number = 20,
    public occupancy: number = 0,
    public lightingLevel: number = 50
  ) {}

  monitorEnergy(): void {
    console.log(`Monitoring energy for ${this.name}`);
  }

  adjustLighting(): void {
    console.log(`Adjusting lighting in ${this.name}`);
  }

  updateOccupancy(): void {
    console.log(`Updating occupancy for ${this.name}`);
  }
}

// File: EnergyManagementService.ts
import { Building } from './Building';

export class EnergyManagementService {
  optimizeEnergy(building: Building): void {
    if (building.occupancy === 0) {
      building.adjustLighting();
      console.log(`Optimizing energy for empty building ${building.name}`);
    }
  }
}

// File: app.ts
import express from 'express';
import { Building } from './Building';
import { EnergyManagementService } from './EnergyManagementService';

const app = express();
const port = 3000;

app.use(express.json());

const buildings: Building[] = [];
const energyService = new EnergyManagementService();

app.get('/buildings', (req, res) => {
  res.json(buildings);
});

app.post('/buildings', (req, res) => {
  const newBuilding = new Building(
    req.body.id,
    req.body.name
  );
  buildings.push(newBuilding);
  res.status(201).json(newBuilding);
});

app.post('/optimize/:id', (req, res) => {
  const building = buildings.find(b => b.id === req.params.id);
  if (building) {
    energyService.optimizeEnergy(building);
    res.json({ message: 'Energy optimized', building });
  } else {
    res.status(404).json({ message: 'Building not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
Instructions to build and run the app:

Set up the project:
Copymkdir smart-campus-energy
cd smart-campus-energy
npm init -y
npm install typescript @types/node express @types/express
npm install --save-dev ts-node nodemon

Create a tsconfig.json file:
jsonCopy{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}

Create the TypeScript files (Building.ts, EnergyManagementService.ts, and app.ts) with the content provided above.
Run the application:
Copynpx ts-node app.ts

Test the API:

Add a building:
Copycurl -X POST -H "Content-Type: application/json" -d '{"id":"1","name":"Science Building"}' http://localhost:3000/buildings

Get all buildings:
Copycurl http://localhost:3000/buildings

Optimize energy for a building:
Copycurl -X POST http://localhost:3000/optimize/1




This setup provides a basic Express.js application with TypeScript, implementing the core functionality of the Smart Campus Energy Management System. You can extend this further by adding more features and components as needed.
