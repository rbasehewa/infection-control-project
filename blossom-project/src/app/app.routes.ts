import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { StaffComponent } from './components/staff/staff.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'tasks', component: TaskListComponent, title: "Tasks" },
    { path: 'staff', component: StaffComponent, title: "Staff Vaccination" },
    { path: 'login', component: LoginComponent, title: "Login Page" },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', component: PageNotFoundComponent }
];
