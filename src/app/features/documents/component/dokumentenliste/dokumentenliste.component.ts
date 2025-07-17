import { Component, input, output } from '@angular/core';

// Define the LinklistData interface if not already imported
export interface LinklistData {
  // Add properties as needed, for example:
  id: number;
  name: string;
  url?: string;
}

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

