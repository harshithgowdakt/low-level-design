# Parking Lot Management System

A TypeScript implementation of a parking lot management system that handles different vehicle types and parking spot sizes with intelligent spot allocation. This system demonstrates object-oriented design principles and provides a realistic simulation of parking lot operations.

## Features

- **Multiple Vehicle Types**: Support for cars, motorcycles, and trucks
- **Flexible Spot Sizes**: Compact, regular, and large parking spots
- **Smart Allocation**: Intelligent vehicle-to-spot matching based on size requirements
- **Real-time Tracking**: Monitor occupancy rates and available spots
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **Modular Design**: Clean separation of concerns with dedicated classes

## System Architecture

### Core Components

- **Vehicle**: Represents different types of vehicles with license plates
- **ParkingSpot**: Individual parking spaces with size constraints
- **ParkingLot**: Main management system that coordinates parking operations

### Vehicle Types

- **Motorcycle**: Can park in any spot size (compact, regular, or large)
- **Car**: Requires regular or large spots
- **Truck**: Requires large spots only

### Spot Sizes

- **Compact**: Suitable for motorcycles only
- **Regular**: Suitable for motorcycles and cars
- **Large**: Suitable for all vehicle types

## API Reference

### Vehicle Class

```typescript
class Vehicle {
  constructor(licensePlate: string, type: VehicleType)
}
```

### ParkingSpot Class

#### `canFitVehicle(vehicle: Vehicle): boolean`
Checks if a vehicle can fit in this parking spot based on size requirements.

#### `park(vehicle: Vehicle): boolean`
Parks a vehicle in this spot. Returns `true` if successful, `false` if the spot is occupied or incompatible.

#### `leave(): Vehicle | null`
Removes the vehicle from this spot and returns the vehicle object.

### ParkingLot Class

#### `addSpot(spot: ParkingSpot): void`
Adds a new parking spot to the lot.

#### `parkVehicle(vehicle: Vehicle): string | null`
Finds an available compatible spot and parks the vehicle. Returns the spot ID if successful, `null` if no suitable spot is available.

#### `removeVehicle(spotId: string): Vehicle | null`
Removes a vehicle from the specified spot and returns the vehicle object.

#### `findAvailableSpot(vehicle: Vehicle): ParkingSpot | null`
Finds the first available spot that can accommodate the given vehicle.

#### `getAvailableSpots(): ParkingSpot[]`
Returns an array of all currently available parking spots.

#### `getOccupancyRate(): number`
Returns the current occupancy rate as a percentage (0-100).

## Usage Examples

### Basic Setup

```typescript
import { ParkingLot } from "./parking-lot";
import { ParkingSpot } from "./parking-spot";
import { Vehicle, VehicleType, SpotSize } from "./vehicle";

// Create a parking lot
const lot = new ParkingLot("Downtown Parking");

// Add different types of spots
lot.addSpot(new ParkingSpot("A1", SpotSize.COMPACT));
lot.addSpot(new ParkingSpot("A2", SpotSize.REGULAR));
lot.addSpot(new ParkingSpot("A3", SpotSize.LARGE));
```

### Parking Vehicles

```typescript
// Create vehicles
const car = new Vehicle("ABC123", VehicleType.CAR);
const motorcycle = new Vehicle("XYZ789", VehicleType.MOTORCYCLE);
const truck = new Vehicle("DEF456", VehicleType.TRUCK);

// Park vehicles
const carSpotId = lot.parkVehicle(car);
const motoSpotId = lot.parkVehicle(motorcycle);
const truckSpotId = lot.parkVehicle(truck);

console.log(`Car parked at: ${carSpotId}`);        // "A2" or "A3"
console.log(`Motorcycle parked at: ${motoSpotId}`); // "A1", "A2", or "A3"
console.log(`Truck parked at: ${truckSpotId}`);     // "A3" only
```

### Monitoring and Management

```typescript
// Check occupancy
console.log(`Occupancy rate: ${lot.getOccupancyRate()}%`);

// Get available spots
const availableSpots = lot.getAvailableSpots();
console.log(`Available spots: ${availableSpots.length}`);

// Remove a vehicle
const removedVehicle = lot.removeVehicle("A2");
if (removedVehicle) {
  console.log(`Removed vehicle: ${removedVehicle.licensePlate}`);
}
```

### Complete Example

```typescript
const lot = new ParkingLot("City Center Parking");

// Setup parking spots
lot.addSpot(new ParkingSpot("C1", SpotSize.COMPACT));
lot.addSpot(new ParkingSpot("C2", SpotSize.COMPACT));
lot.addSpot(new ParkingSpot("R1", SpotSize.REGULAR));
lot.addSpot(new ParkingSpot("R2", SpotSize.REGULAR));
lot.addSpot(new ParkingSpot("L1", SpotSize.LARGE));

// Park different vehicles
const vehicles = [
  new Vehicle("BIKE001", VehicleType.MOTORCYCLE),
  new Vehicle("CAR001", VehicleType.CAR),
  new Vehicle("TRUCK001", VehicleType.TRUCK),
  new Vehicle("CAR002", VehicleType.CAR),
];

vehicles.forEach(vehicle => {
  const spotId = lot.parkVehicle(vehicle);
  if (spotId) {
    console.log(`${vehicle.type} ${vehicle.licensePlate} parked at ${spotId}`);
  } else {
    console.log(`No suitable spot for ${vehicle.type} ${vehicle.licensePlate}`);
  }
});

console.log(`Final occupancy: ${lot.getOccupancyRate()}%`);
```

## Running the Code

### Prerequisites

- Node.js (version 14 or higher)
- TypeScript compiler

### Running the Example

```bash
# Navigate to the parking-lot directory
cd parking-lot

# Compile and run with TypeScript
tsc main.ts && node main.js

# Or using ts-node
npx ts-node main.ts
```

## Design Patterns

### Strategy Pattern
The vehicle fitting logic uses a strategy pattern where each vehicle type has specific rules for which spots it can occupy.

### Encapsulation
Each class maintains its own state and provides controlled access through public methods.

### Single Responsibility
- `Vehicle`: Represents vehicle data
- `ParkingSpot`: Manages individual spot state and rules
- `ParkingLot`: Coordinates overall parking operations

## Parking Rules

1. **Motorcycles** can park in any available spot (compact, regular, or large)
2. **Cars** can only park in regular or large spots
3. **Trucks** can only park in large spots
4. Spots can only hold one vehicle at a time
5. Vehicles are assigned to the first available compatible spot

## Future Enhancements

- **Pricing System**: Different rates for different spot sizes
- **Reservation System**: Allow advance booking of spots
- **Time Tracking**: Monitor parking duration
- **Payment Integration**: Handle parking fees
- **Spot Optimization**: Prefer smaller spots when possible to maximize capacity
- **Multi-level Support**: Handle multiple floors or sections

## License

This project is open source and available under the MIT License.
