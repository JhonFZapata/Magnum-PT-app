import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InGameComponent } from './pages/in-game/in-game.component';
import { PlayerCheckGuard } from './guards/player-check.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: InGameComponent, canActivate: [PlayerCheckGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
