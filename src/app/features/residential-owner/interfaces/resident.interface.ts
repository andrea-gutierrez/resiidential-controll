export interface Resident {
  document: string;
  documentType:string;
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
  roles: string[];
  qrId: string;
  isActive: boolean;
}
