import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProgressIndicatorComponent } from 'src/app/utils/progress/ProgressIndicatorComponent';
import { LoadingState, } from 'src/app/utils/loading.interface';
import { LoadingService } from 'src/app/utils/progress/LoadingService';
import { firstValueFrom } from 'rxjs';
import { ToastController } from '@ionic/angular';
// import { AngularSvgIconModule } from 'angular-svg-icon';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule, IonicModule,  ProgressIndicatorComponent ],
  
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
  loading = signal(false);
  loadingState: LoadingState = {
    message: '',
    isError: false,
    progressPercentage: null
  };

  constructor(private authService: AuthService, 
    private loadingService: LoadingService,
    private router: Router,
    private toastController: ToastController,
    private readonly _formBuilder: FormBuilder,) {}
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
  async login(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.authService.login(this.userData.email, this.userData.password)
      );
      await this.presentToast('Success Login', 'success');
 
      this.router.navigate(['/home']);
    } catch (error) {
      this.error = 'Invalid email or password';
     
      await this.presentToast('Invalid email or password', 'danger');
      console.error('Login failed:', error); // Optional: log the error for debugging
    }
  }
  private async presentToast(message: string, color: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      
      color,
    });
    await toast.present();
  }

}