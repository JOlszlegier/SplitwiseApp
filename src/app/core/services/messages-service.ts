import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})

export class MessagesService {

  constructor(private snackBar: MatSnackBar) {

  }

  public openSuccessSnackBar(message: string, durationTime: number, isMobile?: boolean): void {
    if (isMobile != undefined) {
      this.snackBar.open(message, '', {
        panelClass: ['add-group-success-snackbar'],
        duration: durationTime,
        verticalPosition: isMobile ? "top" : "bottom",
        horizontalPosition: "left"
      })
    }
    this.snackBar.open(message, '', {
      panelClass: ['add-group-success-snackbar'],
      duration: durationTime,
      verticalPosition: "top",
      horizontalPosition: "left"
    })
  }

  public openErrorSnackBar(message: string, durationTime: number, isMobile?: boolean): void {
    if (isMobile != undefined) {
      this.snackBar.open(message, '', {
        panelClass: ['add-group-error-snackbar'],
        duration: durationTime,
        verticalPosition: isMobile ? "top" : "bottom",
        horizontalPosition: "left"
      })
    }
    this.snackBar.open(message, '', {
      panelClass: ['add-group-error-snackbar'],
      duration: durationTime,
      verticalPosition: "top",
      horizontalPosition: "left"
    })
  }


}
