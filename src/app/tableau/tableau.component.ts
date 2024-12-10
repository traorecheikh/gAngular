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
  @Output() editStateChange = new EventEmitter<boolean>();
  isEdit = false;
  formData: Etudiant = { id: 0, prenom: '', nom: '', age: 0, classe: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEtudiants();
  }

  getEtudiants(): void {
    const url = 'http://localhost:3000/etudiants';
    this.http.get<Etudiant[]>(url).subscribe((response) => {
      this.etudiants = response;
      console.log(this.etudiants[0]);
    });
  }

  deleteEtudiant(id:number):void{
    const url = `http://localhost:3000/etudiants/${id}`;
    this.http.delete(url).subscribe(response=>{
      this.getEtudiants();
    })
  }

  editEtudiant(etudiant: Etudiant): void {
    this.isEdit = true;
    this.formData = { ...etudiant };
    this.editStateChange.emit(this.isEdit);
  }

  onDataForm(): void {
    this.getEtudiants();
    this.isEdit = false;
    this.editStateChange.emit(this.isEdit);
  }

}
