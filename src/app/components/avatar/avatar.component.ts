import { Component, input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  imagePath = input.required<string>();
  backgroundColor = input('linear-gradient(to right, #630cd2, #f95f86)');
}
