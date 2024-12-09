import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  ajouter: boolean = false;  // Controls the visibility of 'Ajouter étudiant'
  isEdit: boolean = false;  // Controls the visibility of 'Modifier' form

  constructor(private http: HttpClient) {}

  boutonClick(): void {
    if (!this.isEdit) {
      this.ajouter = !this.ajouter;  // Only toggle 'ajouter' if not editing
    }
  }

  getEtudiants(): void {
    const url = 'http://localhost:3000/etudiants';
    this.http.get<Etudiant[]>(url).subscribe((response) => {
      this.etudiants = response;
    });
  }

  onDataForm(): void {
    this.getEtudiants();
  }

  // This function will be triggered when the "Modifier" button is clicked
  setIsEditState(state: boolean): void {
    this.isEdit = state;
    this.ajouter = false;  // Close the "Ajouter étudiant" form when editing
  }
}
