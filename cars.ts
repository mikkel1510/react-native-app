export interface Car {
    id: number;
    name: string;
    make: string;
    model: string;
    year: number;
    price: number;
    image: any;
    specs: CarSpecs
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
    year: 2023,
    price: 25,
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
  },
  {
    id: 2,
    name: "BMW 330i",
    make: "BMW",
    model: "3 Series",
    year: 2021,
    price: 22,
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
  },
  {
    id: 3,
    name: "Toyota Corolla",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    price: 15,
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
  },
];