import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { FoodComponent } from './food/food.component';
import { FlyGameComponent } from './fly-game/fly-game.component';

export const routes: Routes = [
    { path: 'food', component: FoodComponent },
    { path: 'fly', component: FlyGameComponent },
    { path: '', redirectTo: 'food', pathMatch: 'full' },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
