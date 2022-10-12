import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allAvatars = [];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>,) {
    for (let i = 1; i < 20; i++) {
      this.allAvatars.push('p' + i);
    }
  }

  ngOnInit(): void {
  }

}
