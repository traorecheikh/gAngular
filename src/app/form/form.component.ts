import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
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
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Input() formData: Etudiant = { id: 0, prenom: '', nom: '', age: 0, classe: '' };
  @Input() isEdit!: boolean;
  @Output() dataForm = new EventEmitter<void>();
  @Input() ajouter!: boolean;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onSubmit(): void {
    if (this.isEdit) {
      console.log("test");
      this.updateData(this.formData);
    } else {

      console.log("test");
      this.addData(this.formData);
    }
  }

  addData(data: Etudiant): void {
    const url = 'http://localhost:3000/etudiants';
    this.http.post(url, data).subscribe((response) => {
      this.cdr.detectChanges();
      this.dataForm.emit();
      this.ajouter = false;
      this.isEdit = false;
      console.log('Student added:', response);
    });
  }

  updateData(data: Etudiant): void {
    const url = `http://localhost:3000/etudiants/${data.id}`;
    this.http.put(url, data).subscribe((response) => {
      this.cdr.detectChanges();
      this.dataForm.emit();
      console.log('success:', response);
    });
  }
}
