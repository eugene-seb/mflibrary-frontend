import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-avatar',
  imports: [],
  templateUrl: './icon-avatar.component.html',
  styleUrl: './icon-avatar.component.css',
})
export class IconAvatarComponent {
  @Input() avatarLabel = '';
}
