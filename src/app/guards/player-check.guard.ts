import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerCheckGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return true;
    // // Recuperar los datos de los jugadores del localStorage
    // const players = JSON.parse(localStorage.getItem('players') || '{}');

    // // Verificar que ambos jugadores existan
    // if (players.playerOne && players.playerTwo) {
    //   return true; // Permitir la navegación
    // }

    // // Si no existen los jugadores, redirigir al formulario de registro
    // this.router.navigate(['/']);
    // return false; // Bloquear la navegación
  }
  
}
