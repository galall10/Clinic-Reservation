import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  email = new FormControl("");
  password = new FormControl("");
  type = new FormControl("");
  name = new FormControl("");
  form!: FormGroup;
  loading = false;
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.form = new FormGroup({
      email: this.email,
      password: this.password,
      userType: this.type,
      name: this.name
    })
  }

  submit(): void {
    this.loading = true;
    this.authService.register(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.token);
        if (res.user.userType === "Patient") {
          this.router.navigate(['/patient']);
        } else {
          this.router.navigate(['/doctor']);
        }
      },
      error: (err) => {
        alert("Error: " + err.message);
        this.loading = false;
      }
    },
    )
  }
}
