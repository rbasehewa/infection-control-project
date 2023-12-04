import { VaccinationRecord } from "./vaccination-record.model";

export interface Staff {
    id: number;
    name: string;
    contactInfo: {
      email: string;
      phone: string;
      address: string;
    };
    role: string;
    medicalHistory: string[];
    vaccinationStatus: VaccinationRecord[]
}



