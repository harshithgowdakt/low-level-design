import { SpotSize, Vehicle, VehicleType } from "./vehicle";

export class ParkingSpot {
  constructor(
    public id: string,
    public size: SpotSize,
    public isOccupied: boolean = false,
    public vehicle: Vehicle | null = null
  ) {}

  canFitVehicle(vehicle: Vehicle): boolean {
    if (this.isOccupied) return false;

    // Define fitting rules
    switch (vehicle.type) {
      case VehicleType.MOTORCYCLE:
        return true; // Can fit in any spot
      case VehicleType.CAR:
        return this.size === SpotSize.REGULAR || this.size === SpotSize.LARGE;
      case VehicleType.TRUCK:
        return this.size === SpotSize.LARGE;
      default:
        return false;
    }
  }

  park(vehicle: Vehicle): boolean {
    if (!this.canFitVehicle(vehicle)) return false;

    this.isOccupied = true;
    this.vehicle = vehicle;
    return true;
  }

  leave(): Vehicle | null {
    const vehicle = this.vehicle;
    this.isOccupied = false;
    this.vehicle = null;
    return vehicle;
  }
}
