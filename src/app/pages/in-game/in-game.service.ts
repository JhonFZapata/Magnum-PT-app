import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ResGameDTO {
    game:GameDTO,
    playerOneName:string,
    playerTwoName:string
  }


export interface GameDTO {
  id: number;
  playerOneId: number;
  playerTwoId: number;
  isFinished: boolean;
  winnerPlayerId?: number;
  rounds: RoundDTO[];
}

export interface RoundDTO {
  id: number;
  playerOneMove: string;
  playerTwoMove: string;
  winnerPlayerId?: number;
  playerOneName: string;
  playerTwoName: string;
}


@Injectable({
  providedIn: 'root'
})
export class InGameService {

  private apiUrl = "https://localhost:7177/api";
  constructor(private http: HttpClient) {}

    // Iniciar un nuevo juego
    startGame(playerOneName: string, playerTwoName: string): Observable<ResGameDTO> {
      const payload = { playerOneName, playerTwoName };
      return this.http.post<ResGameDTO>(`${this.apiUrl}/game/start`, payload);
    }

    // Jugar una ronda
    playRound(
      gameId: number,
      playerOneMove: string,
      playerTwoMove: string
    ): Observable<RoundDTO> {
      const payload = {
        gameId:gameId,
        playerOneMove: playerOneMove,
        playerTwoMove: playerTwoMove
      };
      console.log('ser tt',payload);
      
      return this.http.post<RoundDTO>(`${this.apiUrl}/game/${gameId}/play-round`, payload);
    }

    // Obtener el estado del juego
    getGameStatus(gameId: number): Observable<GameDTO> {
      return this.http.get<GameDTO>(`${this.apiUrl}/game/${gameId}`);
    }

    // POST
    createMovement(data:any) {
      return this.http.post<{ playerOne: string; playerTwo:string }>(
        `${this.apiUrl}/Rounds/register`,
        data
      );
    }
}
