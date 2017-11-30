import { RouterModule, Route, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TrendsComponent } from 'app/trends/trends.component';
import { YoutubeComponent } from './youtube/youtube.component';

const routes: Route[] = [
  {
    path: '', component: TrendsComponent,
    children: [
      {path: '', component: YoutubeComponent}
    ]
  },
  // otherwise redirect to home page
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
