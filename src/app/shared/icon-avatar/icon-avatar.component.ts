import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-avatar',
  imports: [],
  templateUrl: './icon-avatar.component.html',
  styleUrl: './icon-avatar.component.css',
})
export class IconAvatarComponent {
  @Input() avatarLabel = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';
  
  // Generate consistent color based on label
  get backgroundColor(): string {
    if (!this.avatarLabel) return 'bg-primary';
    
    const colors = [
      'bg-primary', 'bg-blue-500', 'bg-green-500', 
      'bg-yellow-500', 'bg-red-500', 'bg-purple-500'
    ];
    const index = this.avatarLabel.charCodeAt(0) % colors.length;
    return colors[index];
  }
  
  get avatarClass(): string {
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg'
    };
    return `${sizeClasses[this.size]} ${this.backgroundColor} border-circle flex align-items-center justify-content-center text-white font-bold`;
  }
}