import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// create InjectionToken for persistent storage to simplify unit testing
// and make it easier to swap implementation in future
export const STORAGE = new InjectionToken<Storage>('persistentStorageToken');

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        {
            provide: STORAGE,
            useValue: window.localStorage,
        },
        provideAnimationsAsync(),
    ],
};
