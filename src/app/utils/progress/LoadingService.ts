import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingState } from './loading.interface';
 

@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  private loadingState = new BehaviorSubject<LoadingState>({
    message: '',
    isError: false,
    progressPercentage: null
  });

  loadingState$ = this.loadingState.asObservable();

  showLoading(message: string = 'Loading...', progressPercentage: number | null = null): void {
    this.loadingState.next({ message, isError: false, progressPercentage });
  }

  hideLoading(): void {
    this.loadingState.next({ message: '', isError: false, progressPercentage: null });
  }

  showError(message: string): void {
    this.loadingState.next({ message, isError: true, progressPercentage: null });
    
    // Automatically hide the error message after 3 seconds
    setTimeout(() => {
      this.hideError();
    }, 3000);
  }

  hideError(): void {
    this.loadingState.next({ message: '', isError: false, progressPercentage: null });
  }

  showSuccess(message: string): void {
    this.loadingState.next({ message, isError: false, progressPercentage: null });
     // Automatically hide the error message after 3 seconds
     setTimeout(() => {
      this.hideError();
    }, 3000);
  }
}