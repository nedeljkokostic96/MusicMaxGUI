import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fact } from 'src/app/model/Fact';

@Component({
  selector: 'app-fact-dialog',
  templateUrl: './fact-dialog.component.html',
  styleUrls: ['./fact-dialog.component.css']
})
export class FactDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
  }

}
