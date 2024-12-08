import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Etudiant {
  id: number;
  prenom: string;
  nom: string;
  age: number;
  classe: string;
}

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  etudiants: Etudiant[] = [];
  ajouter: boolean = false;
  constructor(private http: HttpClient) {
  }
  boutonClick():void{
    this.ajouter = !this.ajouter;
  }
  getEtudiants(): void {
    const url = 'http://localhost:3000/etudiants';
    this.http.get<Etudiant[]>(url).subscribe((response) => {
      this.etudiants = response;
    });
  }

  onDataForm() {
    this.getEtudiants();
  }
}
