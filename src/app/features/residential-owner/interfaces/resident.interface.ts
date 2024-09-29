export interface Resident {
  document: string;
  documentType: string;
  password: string;
  plate: string;
  vehicleType: string;
  vehicleActive: boolean;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  tower: string;
  apartment: string;
  role: string;
  qrId: string;
  isActive: boolean;
}

export interface ResidentDisplay extends Resident {
  fullName: string;
}
