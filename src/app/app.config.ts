import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { 
  HTTP_INTERCEPTORS, 
  provideHttpClient, 
  withInterceptorsFromDi, 
  withInterceptors 
} from '@angular/common/http';
import { JwtInterceptor } from '../app/shared/interceptors/JwtInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(), // Permite usar interceptores clásicos
      withInterceptors([]) // Para interceptores funcionales (opcional)
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Provee el interceptor como servicio
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true 
    }
  ]
};