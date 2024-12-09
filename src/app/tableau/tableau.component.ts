import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() editStateChange = new EventEmitter<boolean>();  // Emit when edit state changes
  isEdit = false;  // Local state for editing
  formData: Etudiant = { id: 0, prenom: '', nom: '', age: 0, classe: '' };

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

  // Function to handle the "Modifier" button click
  editEtudiant(etudiant: Etudiant): void {
    this.isEdit = true;
    this.formData = { ...etudiant };  // Pre-fill the form with existing data
    this.editStateChange.emit(this.isEdit);  // Emit the change to parent
  }

  onDataForm(): void {
    this.getEtudiants();
    this.isEdit = false;
    this.editStateChange.emit(this.isEdit);  // Reset the edit state after form submission
  }

}
