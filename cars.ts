export interface Car {
    id: number;
    name: string;
    make: string;
    model: string;
    price: number;
    distance: number;
    image: any;
    specs: CarSpecs;
    location: { latitude: number; longitude: number };
}

export interface CarSpecs {
  modelYear: number;
  firstRegistration: string;
  mileage: string;
  fuelType: string;
  fuelConsumption: string;
  range: string;
  batteryCapacity: string;
  energyConsumption: string;
  co2Emissions: string;
  euroStandard: string;
  annualRoadTax: string;
  powerOutput: string;
  acceleration: string;
  topSpeed: string;
  transmission: string;
  gears: number;
  towingCapacity: string;
  color: string;
  
}

export const labels: Record<keyof CarSpecs, string> = {
  modelYear: "Model year",
  firstRegistration: "First registration",
  mileage: "Mileage",
  fuelType: "Fuel type",
  fuelConsumption: "Fuel consumption",
  range: "Range",
  batteryCapacity: "Battery capacity",
  energyConsumption: "Energy consumption",
  co2Emissions: "CO₂ emissions",
  euroStandard: "Euro standard",
  annualRoadTax: "Annual road tax",
  powerOutput: "Power output",
  acceleration: "Acceleration",
  topSpeed: "Top speed",
  transmission: "Transmission",
  gears: "Number of gears",
  towingCapacity: "Towing capacity",
  color: "Color",
};