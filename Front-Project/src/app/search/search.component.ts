import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchForm : FormGroup;

  searchTerm: string;
  searchResults: any[] = [];
  constructor(
    private formBuilder: FormBuilder){}



    ngOnInit(): void {
      this.searchForm=this.formBuilder.group({
        keyword : this.formBuilder.control(""),
      
      })
    }

    
  searchByUsername() {
    console.log(this.searchForm.value.keyword);
    // Effectuer la logique de recherche ici, en utilisant le terme de recherche (this.searchTerm)
    // et mettre à jour les résultats de recherche (this.searchResults)
    // Exemple fictif :
    this.searchResults = [
      { name: 'Utilisateur 1' },
      { name: 'Utilisateur 2' },
      { name: 'Utilisateur 3' }
    ];
  }
}
