import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'experience', renderMode: RenderMode.Prerender },
  { path: 'projects', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: '404', renderMode: RenderMode.Prerender },
  // Unknown URLs are served by Firebase's generated 404.html.
  { path: '**', renderMode: RenderMode.Client }
];
