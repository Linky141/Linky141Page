import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [MatButtonModule, MatInputModule],
  template: `
    <!-- <div class="flex justify-center items-center mt-10"> -->
    <mat-form-field>
      <mat-label>Login</mat-label>
      <input matInput />
    </mat-form-field>
    <br />
    <mat-form-field>
      <mat-label>Password</mat-label>
      <input matInput />
    </mat-form-field>
    <!-- </div> -->
    <!-- <div class="flex justify-center items-center"> -->
    <button mat-flat-button color="primary">Login</button>
    <button>Dont have account, register there</button>
    <!-- </div> -->
  `,
})
export class LoginPageComponent {}
