import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-indicator',
  standalone : true,
  imports: [CommonModule, FormsModule],
  template: `
    <div 
      [@progressAnimation]="animationState"
      class="fixed z-50 progress-container"
      [ngClass]="positionClass"
    >
      <div class="progress-wrapper bg-blue-600/80 text-white rounded-lg shadow-lg">
        <div class="flex items-center p-3">
          <div class="mr-3">
            <svg 
              *ngIf="!isError"
              class="animate-spin h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                class="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                stroke-width="4"
              ></circle>
              <path 
                class="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg 
              *ngIf="isError" 
              class="h-5 w-5 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium">{{ message }}</p>
            <div 
              *ngIf="progressPercentage !== null" 
              class="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700"
            >
              <div 
                class="bg-white h-1.5 rounded-full" 
                [ngStyle]="{'width.%': progressPercentage}"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  
  animations: [
    trigger('progressAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition(':enter', [
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({
          opacity: 0,
          transform: 'translateY(20px)'
        }))
      ])
    ])
  ]
})
export class ProgressIndicatorComponent {
  @Input() message: string = 'Loading...';
  @Input() progressPercentage: number | null = null;
  @Input() isError: boolean = false;
  @Input() position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-right';

  get positionClass(): string {
    const positionClasses = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4'
    };
    return positionClasses[this.position];
  }

  get animationState(): string {
    return this.isError ? 'error' : 'loading';
  }
}