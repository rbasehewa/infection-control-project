import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffService } from '../../services/staff.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbAlert, HttpClientTestingModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss',
})
export class StaffComponent implements OnInit {
  public staffMembers: any[] = [];
  public filteredStaffMembers: any[] = [];
  public vaccines: any[] = [];
  public filteredVaccines: any[] = [];
  public showSuccessAlert: boolean = false;
  private callFetchVaccines: boolean = true;

  public searchStaffTerm: string = '';
  public searchVaccineTerm: string = '';

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.fetchStaffMembers();
    if (this.callFetchVaccines) {
      this.fetchVaccines();
    }
    this.staffMembers.forEach(member => {
      member.originalNotes = member.notes;
    });
  }

  public fetchStaffMembers() {
    this.staffService
      .getStaffMembers()
      .pipe(
        catchError((error) => {
          console.error('Error fetching staff members:', error);
          return throwError(error);
        })
      )
      .subscribe((data) => {
        this.staffMembers = data;
        // Assuming each member has a vaccinationStatus array
        this.filteredStaffMembers = this.staffMembers.map((member) => ({
          ...member,
          showDetails: false,
          vaccinationStatus: member.vaccinationStatus || ['Not assessed'], // default status if none is present
        }));
      });
  }

  public toggleDetails(member: any): void {
    member.showDetails = !member.showDetails;
  }

  public fetchVaccines() {
    this.staffService.getVaccines().subscribe((data) => {
      this.vaccines = data;
      this.filteredVaccines = data;
    });
  }

  public searchStaff(term: string): void {
    if (term) {
      this.filteredStaffMembers = this.staffMembers.filter((member) =>
        member.name.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      // Reset to original list and hide details
      this.filteredStaffMembers = this.staffMembers.map((member) => ({
        ...member,
        showDetails: false,
      }));
    }
  }

  public saveStaffDetails(member: any, index: number): void {
    // Here you would implement the logic to save the edited details
    const originalMember = this.staffMembers.find((m) => m.id === member.id);
    if (originalMember) {
      originalMember.medicalHistory = [...member.editingMedicalHistory];
      originalMember.vaccinationStatus = [...member.editingVaccinationStatus];
    }
    this.showSuccessAlert = true;
    setTimeout(() => (this.showSuccessAlert = false), 3000);
    member.isEditable = false;
  }

  public searchVaccines(term: string): void {
    this.filteredVaccines = term
      ? this.vaccines.filter((vaccine) =>
          vaccine.diseaseName.toLowerCase().includes(term.toLowerCase())
        )
      : this.vaccines;
  }

  public submitProfessionalNotes(member: any): void {
    console.log(
      'Submitting professional notes for',
      member.name,
      ':',
      member.notes
    );
    member.showSubmitSuccess = true;
    member.notes = '';
    setTimeout(() => {
      member.showSubmitSuccess = false;
      member.showDetails = false;
    }, 3000);
  }

  public enableFetchVaccines(enable: boolean): void {
    this.callFetchVaccines = enable;
  }

  public calculateRemainingCharacters(member: any): number {
    const maxLength = 1000;
    const currentLength = member.notes ? member.notes.length : 0;
    return maxLength - currentLength;
  }
}
