import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public showNotification(
    title: string,
    type: 'none' | 'success' | 'warning' | 'error' | 'info' | undefined = 'info',
    horizontal: MatSnackBarHorizontalPosition = 'right',
    vertical: MatSnackBarVerticalPosition = 'top'
  ): void {
    this.snackBar.open(title, 'Dismiss', {
      duration: 3000, // Adjust duration as per your requirement
      horizontalPosition: horizontal,
      verticalPosition: vertical,
      panelClass: this.getPanelClass(type),
    });
  }

  private getPanelClass(type: string): string[] {
    switch (type) {
      case 'success':
        return ['success-snackbar'];
      case 'warning':
        return ['warning-snackbar'];
      case 'error':
        return ['error-snackbar'];
      case 'info':
        return ['info-snackbar'];
      default:
        return [];
    }
  }
}
