export interface VaccinationRecord {
    vaccineName: string;
    dateAdministered: Date;
    boosterRequired: boolean;
    boosterDate?: Date;
}