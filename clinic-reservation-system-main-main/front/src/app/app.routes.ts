import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "doctor",
        component: DoctorComponent
    },
    {
        path: "patient",
        component: PatientComponent
    }
];
