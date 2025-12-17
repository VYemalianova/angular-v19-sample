import { Component, input } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-error-screen',
  imports: [RouterModule],
  templateUrl: './error-screen.component.html',
  styleUrl: './error-screen.component.scss'
})
export class ErrorScreenComponent {
  title = input.required<string>();
  message = input.required<string>();
}
