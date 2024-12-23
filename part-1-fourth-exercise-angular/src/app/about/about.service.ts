import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  getAboutDetails(): string {
    return 'Información detallada sobre nuestra aplicación.';
  }
}
