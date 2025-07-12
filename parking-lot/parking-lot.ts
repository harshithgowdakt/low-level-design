
import { ParkingSpot } from "./parking-spot";
import { Vehicle } from "./vehicle";

export class ParkingLot {
  private spots: Map<string, ParkingSpot> = new Map();

  constructor(public name: string) {}

  addSpot(spot: ParkingSpot): void {
    this.spots.set(spot.id, spot);
  }

  findAvailableSpot(vehicle: Vehicle): ParkingSpot | null {
    for (const spot of this.spots.values()) {
      if (spot.canFitVehicle(vehicle)) {
        return spot;
      }
    }
    return null;
  }

  parkVehicle(vehicle: Vehicle): string | null {
    const spot = this.findAvailableSpot(vehicle);
    if (!spot) return null;

    spot.park(vehicle);
    return spot.id;
  }

  removeVehicle(spotId: string): Vehicle | null {
    const spot = this.spots.get(spotId);
    return spot ? spot.leave() : null;
  }

  getAvailableSpots(): ParkingSpot[] {
    return Array.from(this.spots.values()).filter((spot) => !spot.isOccupied);
  }

  getOccupancyRate(): number {
    const total = this.spots.size;
    const occupied = Array.from(this.spots.values()).filter(
      (s) => s.isOccupied
    ).length;
    return total > 0 ? (occupied / total) * 100 : 0;
  }
}
