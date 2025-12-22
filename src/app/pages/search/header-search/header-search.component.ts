import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header-search',
  imports: [InputTextModule, ButtonModule],
  templateUrl: './header-search.component.html',
  styleUrl: './header-search.component.css',
})
export class HeaderSearchComponent {}
