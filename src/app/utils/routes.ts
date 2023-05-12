import {Routes} from '@angular/router'

export const reportRoutes: Routes = [
  {
    path: '',
    loadComponent: async () => await (await import('../pages/report-page/report-page.component')).ReportPageComponent,
  },
]
