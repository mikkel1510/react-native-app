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
  color: string;
  transmission: string;
  fuelType: string;
  topSpeed: string;
  mileage: string;
  gears: number;
  acceleration: string;
  firstRegistration: string;
  batteryCapacity: string;
  fuelConsumption: string;
  range: string;
  energyConsumption: string;
  co2Emissions: string;
  euroStandard: string;
  annualRoadTax: string;
  powerOutput: string;
  towingCapacity: string;
}

export const labels: Record<keyof CarSpecs, string> = {
  modelYear: "Model year",
  color: "Color",
  fuelType: "Fuel type",
  topSpeed: "Top speed",
  batteryCapacity: "Battery capacity",
  fuelConsumption: "Fuel consumption",
  mileage: "Mileage",
  range: "Range",
  firstRegistration: "First registration",
  energyConsumption: "Energy consumption",
  co2Emissions: "CO₂ emissions",
  euroStandard: "Euro standard",
  annualRoadTax: "Annual road tax",
  powerOutput: "Power output",
  acceleration: "Acceleration",
  transmission: "Transmission",
  gears: "Number of gears",
  towingCapacity: "Towing capacity",
};