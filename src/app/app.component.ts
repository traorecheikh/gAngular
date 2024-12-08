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
      this.cdr.detectChanges();
    });
  }
}
