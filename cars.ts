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

export const cars: Car[] = [
  {
    id: 1,
    name: "Tesla Model 3",
    make: "Tesla",
    model: "Model 3",
    price: 25,
    distance: 0.5,
    image: require("./assets/cars/tesla.png"),
    specs: {
      modelYear: 2024,
      firstRegistration: "1/2024",
      mileage: "—",  // you may leave blank or unknown
      fuelType: "Electric",
      fuelConsumption: "—",
      range: "560 km",  // example WLTP / EPA approximate
      batteryCapacity: "75 kWh",
      energyConsumption: "15 kWh/100 km",
      co2Emissions: "0 g/km",
      euroStandard: "—",
      annualRoadTax: "—",
      powerOutput: "283 hp",  // depends on version
      acceleration: "5.8 sec",
      topSpeed: "225 km/h",
      transmission: "Single-speed (fixed)",
      gears: 1,
      towingCapacity: "1,000 kg",
      color: "White",
    },
    location: { latitude: 55.3686, longitude: 10.4275 },
  },
  {
    id: 2,
    name: "BMW 330i",
    make: "BMW",
    model: "3 Series",
    price: 22,
    distance: 0.8,
    image: require("./assets/cars/bmw.png"),
    specs: {
      modelYear: 2022,
      firstRegistration: "1/2022",
      mileage: "—",
      fuelType: "Petrol",
      fuelConsumption: "12.8 km/l",
      range: "650 km",
      batteryCapacity: "—",
      energyConsumption: "—",
      co2Emissions: "—",
      euroStandard: "6",
      annualRoadTax: "—",
      powerOutput: "255 hp",
      acceleration: "5.6 sec",
      topSpeed: "250 km/h",
      transmission: "Automatic",
      gears: 8,
      towingCapacity: "1,500 kg",
      color: "Black",
    },
    location: { latitude: 55.3959, longitude: 10.3883 },
  },
  {
    id: 3,
    name: "Toyota Corolla",
    make: "Toyota",
    model: "Corolla",
    price: 15,
    distance: 1.5,
    image: require("./assets/cars/toyota.png"),
    specs: {
      modelYear: 2024,
      firstRegistration: "1/2024",
      mileage: "69,000 km",
      fuelType: "Hybrid",
      fuelConsumption: "(NEDC) 25.7 km/l",
      range: "900 km",
      batteryCapacity: "1.3 kWh",
      energyConsumption: "15 kWh/100 km",
      co2Emissions: "106 g/km",
      euroStandard: "6",
      annualRoadTax: "1,260 DKK / year",
      powerOutput: "140 hp",
      acceleration: "9.4 sec",
      topSpeed: "175 km/h",
      transmission: "Automatic",
      gears: 1,
      towingCapacity: "750 kg",
      color: "Gray metallic",
    },
    location: { latitude: 55.4035, longitude: 10.3830 },
  },
];

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