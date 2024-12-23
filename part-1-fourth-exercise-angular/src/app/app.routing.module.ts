import { provideRouter, Routes } from '@angular/router';

// Definimos las rutas principales de la aplicación
const routes: Routes = [
  {
    path: 'home',
    // Usamos lazy loading para el módulo "home".
    // Esto significa que el módulo "home" no se carga hasta que el usuario accede a la ruta '/home'.
    // Beneficio: Mejora el rendimiento inicial de la aplicación, ya que solo se cargan los módulos necesarios.
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule), 
  },
  {
    path: 'about',
    // De forma similar, el módulo "about" también utiliza lazy loading.
    // Beneficio: Reduce el tamaño del bundle inicial y mejora la experiencia del usuario en aplicaciones grandes.
    // Además, permite a los desarrolladores trabajar en módulos de forma independiente.
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule), 
  },
  // Redirección por defecto: si el usuario accede a la raíz ('/'), se redirige automáticamente a la ruta 'home'.
  // Esto asegura que siempre haya un punto de entrada definido.
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 

  // Ruta comodín: cualquier ruta no encontrada se redirige a 'home'.
  // Beneficio: Evita errores de rutas no encontradas y mejora la usabilidad.
  { path: '**', redirectTo: 'home' },
];

// Exportamos el módulo de enrutamiento utilizando provideRouter.
// Beneficio general del lazy loading:
// 1. Optimiza el rendimiento inicial de la aplicación cargando solo los recursos necesarios.
// 2. Facilita el mantenimiento al dividir la aplicación en módulos más pequeños y reutilizables.
// 3. Mejora la escalabilidad, ya que los nuevos módulos pueden ser añadidos fácilmente sin afectar el rendimiento general.
export const AppRoutingModule = provideRouter(routes);
