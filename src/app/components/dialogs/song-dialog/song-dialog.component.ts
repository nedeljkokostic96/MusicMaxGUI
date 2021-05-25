import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-song-dialog',
  templateUrl: './song-dialog.component.html',
  styleUrls: ['./song-dialog.component.css']
})
export class SongDialogComponent implements OnInit {
  frmSong:FormGroup;

  myControlAuthor = new FormControl();
  optionsAuthor: string[] = ['Amelia Ishmael', 'Allan Jones', 'Alan Light'];
  filteredOptionsAuthor: Observable<string[]>;

  myControlComposer = new FormControl();
  optionsComposer: string[] = ['Amanda Petrusich', 'Ann Powers', 'Anthony Fantano'];
  filteredOptionsComposer: Observable<string[]>;

  myControlPerformer = new FormControl();
  optionsPerformer: string[] = ['Aerosmith', 'Alan Jackson', 'Albert King'];
  filteredOptionsPerformer: Observable<string[]>;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filteredOptionsAuthor = this.myControlAuthor.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterAuthor(value))
      );

      this.filteredOptionsComposer = this.myControlComposer.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterComposer(value))
      );

      this.filteredOptionsPerformer = this.myControlPerformer.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterPerfomer(value))
      );

      this.frmSong = this._formBuilder.group({
        title: ['', Validators.required],
        text: ['', Validators.required],
        publishingDate: ['', Validators.required],
        author: ['', Validators.required],
        performer: ['', Validators.required],
        composer: ['', Validators.required],
      });
  }

  private _filterAuthor(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsAuthor.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterComposer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsComposer.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterPerfomer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsPerformer.filter(option => option.toLowerCase().includes(filterValue));
  }

}


