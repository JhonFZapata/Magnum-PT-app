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
  message: string = '';

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
  startGame(playerOneId: number, playerTwoId: number) {
    this.inGamerService.startGame(playerOneId, playerTwoId).subscribe(
      (game) => {
        this.game = game;
        // Verifica que rounds existe y es un array
        if (!this.game.rounds) {
          this.game.rounds = [];  // Si no existe, inicialízalo como un array vacío
        }
        this.message = 'Juego iniciado. ¡Elige tus movimientos!';
      },
      (error) => {
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

    this.inGamerService
      .playRound(this.game.id, this.playerOneMove, this.playerTwoMove)
      .subscribe(
        (round) => {
          // Actualiza el estado del juego después de cada ronda
          this.inGamerService.getGameStatus(this.game!.id).subscribe((updatedGame) => {
            this.game = updatedGame;

            if (this.game.isFinished) {
              this.message = `¡El juego ha terminado! El ganador es el jugador ${
                this.game.winnerPlayerId === this.game.playerOneId ? '1' : '2'
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

  // createMovement(){
  //   // VAlidacion de formulario
  //   if (!this.newForm.valid) {
  //     console.log(this.newForm.value);
      
  //     this.newForm.markAllAsTouched(); // Mostrar los errores si los hay
  //     return;
  //   }

  //   const data = {
  //     playerOneName:this.newForm.get('movement')?.value,
  //     // playerTwoName:this.newForm.get('playerTwo')?.value,
  //   };

  //   this.inGamerService.createMovement(data).subscribe({
  //     next: (response) => {
  //       console.log('res:', response);
  //     },
  //     error: (error) => {
  //       this.errorMessage = error.error.message;
  //       console.error('Error al intentar registrar los moviminetos:', error);
  //     },
  //   });
  // }

}
