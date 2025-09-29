export interface Car {
    id: number;
    name: string;
    make: string;
    model: string;
    year: number;
    price: number;
    image: any;
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Tesla Model 3",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 49999,
    image: require("./assets/cars/bmw.png"),
  },
  {
    id: 2,
    name: "BMW 330i",
    make: "BMW",
    model: "3 Series",
    year: 2021,
    price: 41999,
    image: require("./assets/cars/bmw.png"),
  },
  {
    id: 3,
    name: "Toyota Corolla",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    price: 19999,
    image: require("./assets/cars/toyota.png"),
  },
];