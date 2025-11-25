import { Injectable } from '@angular/core';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';

import { ToasterComponent } from '../../components/toaster/toaster.component';
import { IToasterData } from '../../models/toaster-data.model';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  toast!: MatSnackBarRef<ToasterComponent>;

  constructor(private readonly matSnackBar: MatSnackBar) { }

  openToast(data: IToasterData): void {
    this.toast = this.matSnackBar.openFromComponent(ToasterComponent, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'toaster-container',
      duration: data.duration ?? 3000,
      data: {
        type: data.type,
        title: data.title,
        details: data.details,
        close: () => {
          this.toast.dismiss();
        },
      },
    });
  }
}
