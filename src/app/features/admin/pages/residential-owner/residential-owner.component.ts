import {Component, inject, OnInit} from '@angular/core';

import {
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

import {ResidentialOwnerService} from "../../services/residential-owner.service";
import {ResidentialOwner} from "../../interfaces/residentialOwner.interface";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-residential-owner',
  standalone: true,
  imports: [
    MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './residential-owner.component.html',
  styleUrl: './residential-owner.component.scss'
})
export class ResidentialOwnerComponent implements OnInit {
  private residentialOwnerService = inject(ResidentialOwnerService);

  public displayedColumns: string[] = ['Nombre', 'Documento', 'Email', 'Torre', 'Acciones'];

  dataSource: MatTableDataSource<ResidentialOwner> = new MatTableDataSource();

  constructor() {
  }

  ngOnInit() {
    this.loadResidentialOwner();
  }

  loadResidentialOwner(): void {
    this.residentialOwnerService.getAll().subscribe({
      next: (data: ResidentialOwner[]) => {
        this.setDataSource(data);
      }
    });
  }

  setDataSource(ownerList: ResidentialOwner[]): void {
    this.dataSource.data = ownerList;
    this.dataSource._updateChangeSubscription();
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.name.toLowerCase().includes(filter)
        || data.email.toLowerCase().includes(filter)
        || data.document.toLowerCase().includes(filter)
        || data.tower.toLowerCase().includes(filter);
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(residentialOwner: ResidentialOwner): void {
    this.residentialOwnerService.deleteById(residentialOwner.document).subscribe({
      next: () => {
        const index = this.dataSource.data.indexOf(residentialOwner);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })
  }
}
