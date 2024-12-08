import {ChangeDetectorRef, Component, Input, OnInit, output} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Etudiant {
  id: number;
  prenom: string;
  nom: string;
  age: number;
  classe: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css'],
  standalone: false,
})
export class TableauComponent implements OnInit {
  @Input() etudiants: Etudiant[] = [];
  isEdit = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEtudiants();
  }

  getEtudiants(): void {
    const url = 'http://localhost:3000/etudiants';
    this.http.get<Etudiant[]>(url).subscribe((response) => {
      this.etudiants = response;
    });
  }
}
