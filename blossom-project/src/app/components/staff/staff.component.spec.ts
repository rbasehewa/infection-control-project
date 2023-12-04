import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StaffComponent } from './staff.component';
import { StaffService } from '../../services/staff.service';
import { of } from 'rxjs';

class MockStaffService {
  getStaffMembers() {
    return of([
      {
        name: 'Heather',
        role: 'Nurse',
        contactInfo: { phone: '123-456-7890' },
      },
      { name: 'Jane', role: 'Doctor', contactInfo: { phone: '098-765-4321' } },
    ]);
  }
  getVaccines() {
    return of([]);
  }
}

describe('StaffComponent', () => {
  let component: StaffComponent;
  let fixture: ComponentFixture<StaffComponent>;
  let mockStaffService: MockStaffService;

  beforeEach(async () => {
    mockStaffService = new MockStaffService();

    await TestBed.configureTestingModule({
      imports: [FormsModule, StaffComponent],
      declarations: [],
      providers: [{ provide: StaffService, useValue: mockStaffService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;
    component.enableFetchVaccines(false);
    fixture.detectChanges();
  });

  it('should allow Jane to view Heather’s information', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    // Find Heather in the list of staff members
    const heather = component.filteredStaffMembers.find(
      (member) => member.name === 'Heather'
    );
    // Simulate clicking on Heather's details
    component.toggleDetails(heather);
    fixture.detectChanges();

    // Expect Heather's details to be visible
    expect(heather.showDetails).toBeTruthy();
    expect(heather.name).toBe('Heather');
    expect(heather.role).toBe('Nurse');
    expect(heather.contactInfo.phone).toBe('123-456-7890');
  }));
});
