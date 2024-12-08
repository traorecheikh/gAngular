import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface Etudiant {
  id: number;
  prenom: string;
  nom: string;
  age: number;
  classe: string;
}

@Component({
  selector: 'app-form',
  standalone: false,

  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Output() dataForm = new EventEmitter<void>();
  formData = {
    prenom: '',
    nom: '',
    age: 0,
    classe: '',
  };

  etudiants: Etudiant[] = [];
  isEdit: boolean = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onSubmit(): void {
    this.postData(this.formData).subscribe((response) => {
      this.cdr.detectChanges();
      this.dataForm.emit();
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
