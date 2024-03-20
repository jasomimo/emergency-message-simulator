import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./component/dashboard/dashboard.component').then((module) => module.DashboardComponent),
    },
];
