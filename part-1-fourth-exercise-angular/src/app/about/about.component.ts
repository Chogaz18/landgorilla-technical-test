import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
})
export class AboutComponent {
  title = 'Acerca de Nosotros';

  getDescription(): string {
    return 'Este módulo proporciona información sobre nuestra aplicación.';
  }
}
