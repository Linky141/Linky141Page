import { Component } from "@angular/core";

@Component({
  selector: "app-login",
  standalone: true,
  template: `
    <div class="flex justify-center items-center">
      <table class="mt-20">
        <tr>
          <td>login</td>
          <td><input /></td>
        </tr>
        <tr>
          <td>password</td>
          <td><input /></td>
        </tr>
      </table>
    </div>
    <div class="flex justify-center items-center">
      <button>Login</button>
      <button>Dont have account, register there</button>
    </div>
  `,
})
export class LoginPageComponent {}
