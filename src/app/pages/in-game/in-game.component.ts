import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameDTO, InGameService } from './in-game.service';

interface Player{
  id:number,
  name:string
}

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrls: ['./in-game.component.scss']
})
export class InGameComponent implements OnInit {
  game: GameDTO | null = null;
  playerOneMove: string = '';
  playerTwoMove: string = '';
  playerOneName: string = '';
  playerTwoName: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    // private router: Router,
    private inGamerService: InGameService
  ) { 
    // const players = JSON.parse(localStorage.getItem("players") || '{}');
    // const playerOne = players.playerOne;
    // const playerTwo = players.playerTwo;
  
    // this.playerOne = playerOne
    // this.playerTwo = playerTwo
  
    // console.log(playerOne, playerTwo);
    // this.newForm = this.formBuilder.group({
    //   movement: ['', [Validators.required, Validators.maxLength(100)]],
    //   // playerId: ['', [Validators.required, Validators.maxLength(100)]],
    // });

  }

  ngOnInit(): void {
  }

  // Iniciar el juego con dos jugadores
  startGame(playerOneName: string, playerTwoName: string) {
    this.inGamerService.startGame(playerOneName, playerTwoName).subscribe(
      (game) => {
        console.log('gaem T',game);
        
        this.game = game.game;
        this.playerOneName = playerOneName
        this.playerTwoName = playerTwoName
        // Verifica que rounds existe y es un array
        if (!this.game.rounds) {
          this.game.rounds = [];  // Si no existe, inicialízalo como un array vacío
        }
        this.message = 'Juego iniciado. ¡Elige tus movimientos!';
      },
      (error) => {
        this.errorMessage = error.error.message
        console.error('Error al iniciar el juego', error);
      }
    );
  }

  // Jugar una ronda
  playRound() {
    if (!this.game) {
      this.message = 'Primero debes iniciar un juego.';
      return;
    }
    
    if(!this.playerOneMove || !this.playerTwoMove){
      
      this.errorMessage = 'Elijan ambos un movimiento';
      return;
    }
    this.playerOneMove = ''
    this.playerTwoMove = ''

    this,this.errorMessage = '';

    this.inGamerService
      .playRound(this.game.id, this.playerOneMove, this.playerTwoMove)
      .subscribe(
        (round) => {
          //
          this.playerOneName = round.playerOneName
          this.playerTwoName = round.playerTwoName
          // Actualiza el estado del juego después de cada ronda
          this.inGamerService.getGameStatus(this.game!.id).subscribe((updatedGame) => {
            this.game = updatedGame;

            if (this.game.isFinished) {
              this.message = `¡El juego ha terminado! El ganador es el jugador ${
                this.game.winnerPlayerId === this.game.playerOneId ? this.playerOneName : this.playerTwoName
              }.`;
            } else {
              this.message = 'Ronda jugada. Continúa jugando.';
            }
          });
        },
        (error) => {
          console.error('Error al jugar la ronda', error);
        }
      );
  }    

}
