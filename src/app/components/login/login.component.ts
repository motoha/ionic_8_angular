import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { AngularSvgIconModule } from 'angular-svg-icon';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule, IonicModule ],
  
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
 

  email: string = '';
  password: string = '';
  error: string = '';
  isPassword=true;
  resposeData : any;
  userData = {"email":"", "password":""};
  constructor(private authService: AuthService, private router: Router,private readonly _formBuilder: FormBuilder,) {}
  ngOnInit(): void {
     
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  login(): void {
    this.authService.login(this.userData.email, this.userData.password).subscribe(
      response => {
        this.router.navigate(['/home']);
      },
      error => {
        this.error = 'Invalid email or password';
      }
    );
  }
}