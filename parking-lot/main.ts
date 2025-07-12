import { ParkingLot } from "./parking-lot";
import { ParkingSpot } from "./parking-spot";
import { Vehicle, VehicleType, SpotSize } from "./vehicle";

const lot = new ParkingLot("Downtown Parking");

// Add spots
lot.addSpot(new ParkingSpot("A1", SpotSize.COMPACT));
lot.addSpot(new ParkingSpot("A2", SpotSize.REGULAR));
lot.addSpot(new ParkingSpot("A3", SpotSize.LARGE));

// Park vehicles
const car = new Vehicle("ABC123", VehicleType.CAR);
const motorcycle = new Vehicle("XYZ789", VehicleType.MOTORCYCLE);

const carSpotId = lot.parkVehicle(car);
const motoSpotId = lot.parkVehicle(motorcycle);

console.log(`Car parked at: ${carSpotId}`);
console.log(`Motorcycle parked at: ${motoSpotId}`);
console.log(`Occupancy: ${lot.getOccupancyRate()}%`);
