import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/utils/progress/LoadingService';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api';
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor(private http: HttpClient,   private loadingService: LoadingService,) {
    this.currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('Login response:', response.status);
          if(response.status == 400) {
            this.loadingService.showError(response.message);
            return
          }
          
         
          if (response && response.token) {
            localStorage.setItem('currentUser', response.token);
            this.currentUserSubject.next(response.token);
            this.loadingService.showSuccess("Success Login");
          }
        })
      );
  }


  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('https://api.npoint.io/a79dbef6b464a2809a4c');
  }

   
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}