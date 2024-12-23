import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
})
export class HomeComponent {
  title = 'Página Principal';

  getWelcomeMessage(): string {
    return '¡Bienvenido a la página principal de nuestra aplicación!';
  }
}
