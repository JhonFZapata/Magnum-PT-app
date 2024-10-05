import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newForm: FormGroup;
  errorMessage:string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private homerService: HomeService
  )
  {
    this.newForm = this.formBuilder.group({
      playerOne: ['', [Validators.required, Validators.maxLength(100)]],
      playerTwo: ['', [Validators.required, Validators.maxLength(100)]],
    });

  }

  ngOnInit(): void {
  }

  registerPlayers(){
    // VAlidacion de formulario
    if (!this.newForm.valid) {
      console.log(this.newForm.value);
      // Mostrar los errores si los hay
      this.newForm.markAllAsTouched(); 
      return;
    }

    const data = {
      playerOneName:this.newForm.get('playerOne')?.value,
      playerTwoName:this.newForm.get('playerTwo')?.value,
    };

    this.homerService.registerPlayers(data.playerOneName).subscribe({
      next: (response) => {
        console.log('res:', response);
        // Siguiente registro
        this.homerService.registerPlayers(data.playerTwoName).subscribe({
          next: (response) => {
            console.log('res:', response);
            // const players = JSON.parse(localStorage.getItem("players") || '{}');
            // const playerOne = players.playerOne;
            // const playerTwo = players.playerTwo;
      
            // localStorage.setItem("players", JSON.stringify({
            //   playerOne: response.playerOne,
            //   playerTwo: response.playerTwo
          // }));

            // console.log(playerOne, playerTwo);
              this.router.navigate(['/game']);
          },
          error: (error) => {
            this.errorMessage = error.error.title;
            console.error('Error al intentar registrar los jugadores:', error);
          },
        });
      },
      error: (error) => {
        this.errorMessage = error.error.title;
        console.error('Error al intentar registrar los jugadores:', error);
      },
    });
  }

}
