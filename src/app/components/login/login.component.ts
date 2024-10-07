import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  loginError = '';

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          if(response.estado== 200){
            this.router.navigate(['/dashoboard']);
           localStorage.setItem("userId", response.respuesta)
            console.log('Login exitoso');
          }else{
            this.loginError = 'Usuario o contraseña incorrectos';
          }
  
        },
        (error) => {
          this.loginError = 'Usuario o contraseña incorrectos';
        }
      );
    }
  }


}


