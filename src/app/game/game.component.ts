import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game = new Game;
  gameId: string;
  gameOver: boolean = false;
  durationInSeconds = 5;


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newGame();
    this.loadData();
  }

  newGame() {
    this.game = new Game();
  }

  loadData() {
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.firestoreData();
    })
  }

  firestoreData() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game: any) => {
        this.game.playerImgs = game.playerImgs;
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.takeCardAnimation = game.takeCardAnimation;
        this.game.currentCard = game.currentCard;
      })
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameIsOver();
    } else {
      if (this.game.players.length > 1) {
        if (!this.game.takeCardAnimation) {
          this.cardAnimation();
        }
      } else {
        this.openSnackBar();
      }
    }
  }

  gameIsOver() {
    this.gameOver = true;
    setTimeout(() => {
      this.router.navigateByUrl('');
    }, 1999);
  }

  cardAnimation() {
    this.game.currentCard = this.game.stack.pop();
    this.game.takeCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard)
      this.game.takeCardAnimation = false;
      this.saveGame();
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && (name.length >= 2 || name.length <= 10)) {
        this.game.players.push(name);
        this.game.playerImgs.push('p0');
        this.saveGame();
      }
    });
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson())
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.playerImgs.splice(playerId, 1);
        } else {
          this.game.playerImgs[playerId] = change;
        }
        this.saveGame()
      }
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
