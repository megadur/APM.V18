import { Component } from '@angular/core';

@Component({
  selector: 'app-dokumentenliste',
  standalone: true,
  imports: [],
  templateUrl: './dokumentenliste.component.html',
  styleUrl: './dokumentenliste.component.css'
})
export class DokumentenlisteComponent {
  linklistData = input.required<LinklistData[]>();

  readonly searchTermChanged = output<string>();

  searchTerm = '';

  onSearchTermChanged() {
    this.searchTermChanged.emit(this.searchTerm);
  }
}

