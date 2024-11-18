import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email = new FormControl("");
  password = new FormControl("");
  authService = inject(AuthService);
  form!: FormGroup;
  loading = false;
  router = inject(Router);
  jwtService = inject(JwtHelperService);

  ngOnInit(): void {
    this.form = new FormGroup({
      email: this.email,
      password: this.password
    })
  }

  submit(): void {
    this.loading = true;
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.token);
        const userObject = this.jwtService.decodeToken(res.token);
        if (userObject.userType === "Patient") {
          this.router.navigate(['/patient']);
        } else {
          this.router.navigate(['/doctor']);
        }
      },
      error: (err) => {
        alert("Error: " + err.message);
        this.loading = false;
      }
    })
  }
}
