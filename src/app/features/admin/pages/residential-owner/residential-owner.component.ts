import {Component, inject, OnInit} from '@angular/core';

import {
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

import {ResidentialOwnerService} from "../../services/residential-owner.service";
import {ResidentialOwner} from "../../interfaces/residentialOwner.interface";

@Component({
  selector: 'app-residential-owner',
  standalone: true,
  imports: [
    MatTableModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './residential-owner.component.html',
  styleUrl: './residential-owner.component.scss'
})
export class ResidentialOwnerComponent implements OnInit {
  private residentialOwnerService = inject(ResidentialOwnerService);

  public displayedColumns: string[] = ['Nombre', 'Documento', 'Email', 'Torre'];

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
    this.dataSource = new MatTableDataSource(ownerList);
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.name.toLowerCase().includes(filter)
        || data.email.toLowerCase().includes(filter)
        || data.document.toLowerCase().includes(filter)
        || data.tower.toLowerCase().includes(filter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
