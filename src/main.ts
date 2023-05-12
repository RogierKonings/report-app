import {enableProdMode} from '@angular/core'

import {environment} from './environments/environment'
import {bootstrapApplication} from '@angular/platform-browser'
import {AppComponent} from './app/app.component'
import {provideAnimations} from '@angular/platform-browser/animations'
import {PreloadAllModules, provideRouter, withPreloading} from '@angular/router'
import {reportRoutes} from './app/utils/routes'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideRouter(reportRoutes, withPreloading(PreloadAllModules))],
})
