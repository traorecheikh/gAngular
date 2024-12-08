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
  template: `
    <form (ngSubmit)="onSubmit()">
      <div>
        <label for="prenom">Prénom</label>
        <input id="prenom" [(ngModel)]="formData.prenom" name="prenom" type="text" required />
      </div>
      <div>
        <label for="nom">Nom</label>
        <input id="nom" [(ngModel)]="formData.nom" name="nom" type="text" required />
      </div>
      <div>
        <label for="age">Age</label>
        <input id="age" [(ngModel)]="formData.age" name="age" type="number" required />
      </div>
      <div>
        <label for="classe">Classe</label>
        <input id="classe" [(ngModel)]="formData.classe" name="classe" type="text" required />
      </div>
      <button type="submit">Valider</button>
    </form>

    <!-- Table component to display the students -->
    <app-table [etudiants]="etudiants"></app-table>
  `,
})
export class AppComponent {
  formData = {
    prenom: '',
    nom: '',
    age: 0,
    classe: '',
  };

  etudiants: Etudiant[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onSubmit(): void {
    this.postData(this.formData).subscribe((response) => {
      // After posting the data, re-fetch the list of students
      this.getEtudiants();
      console.log('Data posted successfully:', response);
    });
  }

  postData(data: any): Observable<any> {
    const url = 'http://localhost:3000/etudiants';
    return this.http.post(url, data);
  }

  getEtudiants(): void {
    const url = 'http://localhost:3000/etudiants';
    this.http.get<Etudiant[]>(url).subscribe((response) => {
      this.etudiants = response;

      // Manually trigger change detection to update the view
      this.cdr.detectChanges();  // Ensure the view reflects the updated data
    });
  }
}
