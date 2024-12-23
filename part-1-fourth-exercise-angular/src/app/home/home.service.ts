import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  getHomeData(): string {
    return 'Datos relevantes para la página principal.';
  }
}
