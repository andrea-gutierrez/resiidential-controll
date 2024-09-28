import {Component, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";

import {ResidentService} from "../../services/resident.service";
import {Resident} from "../../interfaces/resident.interface";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-resident',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './resident.component.html',
  styleUrl: './resident.component.scss'
})
export class ResidentComponent implements OnInit {
  private residentService = inject(ResidentService);

  public displayedColumns: string[] = ['Nombre', 'Documento', 'Email', 'Torre'];

  dataSource: MatTableDataSource<Resident> = new MatTableDataSource();

  ngOnInit() {
    this.loadResidents();
  }

  private loadResidents(): void {
    this.residentService.getAll().subscribe({
      next: (data: Resident[]) => {
        this.setDataSource(data);
      }
    });
  }

  private setDataSource(ownerList: Resident[]): void {
    this.dataSource.data = ownerList;
    this.dataSource._updateChangeSubscription();
  }
}
