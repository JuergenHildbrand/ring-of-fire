import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  takeCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(
    public dialog: MatDialog,
    firestore: AngularFirestore  
  ) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.players.length > 1) {
      if (!this.takeCardAnimation) {
        this.currentCard = this.game.stack.pop();
        this.takeCardAnimation = true;
        this.game.currenPlayer++;
        this.game.currenPlayer = this.game.currenPlayer % this.game.players.length;

        setTimeout(() => {
          this.game.playedCards.push(this.currentCard)
          this.takeCardAnimation = false;
        }, 1000);
      }
    } else {
      alert('Please add player(s)')
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && (name.length >= 2 || name.length <= 10)) {
        this.game.players.push(name)
      }
    });
  }


}
