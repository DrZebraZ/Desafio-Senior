import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './js/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), AuthService]
};
