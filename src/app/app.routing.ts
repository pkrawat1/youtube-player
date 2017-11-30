import { RouterModule, Route, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TrendsComponent } from 'app/trends/trends.component';

const routes: Route[] = [
  {path: '', loadChildren: './trends/trends.module#TrendsModule'},
  // otherwise redirect to home page
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
