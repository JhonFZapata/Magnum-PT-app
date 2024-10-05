import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = "https://localhost:7177/api";
  constructor(private http: HttpClient) {}

      // POST
      registerPlayers(name:string) {
        return this.http.post<{ playerOne: string; playerTwo:string, GameId:number }>(
          `${this.apiUrl}/Player/register`,
          {name}
        );
      }
}
