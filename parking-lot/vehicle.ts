export enum VehicleType {
  CAR = "CAR",
  MOTORCYCLE = "MOTORCYCLE",
  TRUCK = "TRUCK",
}

export enum SpotSize {
  COMPACT = "COMPACT",
  REGULAR = "REGULAR",
  LARGE = "LARGE",
}

export class Vehicle {
  constructor(public licensePlate: string, public type: VehicleType) {}
}
