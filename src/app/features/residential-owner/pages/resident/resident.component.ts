import {Component, inject, OnInit} from '@angular/core';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {ResidentService} from "../../services/resident.service";
import {Resident, ResidentDisplay} from "../../interfaces/resident.interface";
import {TableBase} from "../../../../shared/base/table.base";

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
    MatHeaderCellDef,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './resident.component.html',
  styleUrl: './resident.component.scss'
})
export class ResidentComponent extends TableBase<ResidentDisplay> implements OnInit {
  private residentService = inject(ResidentService);
  private filterList: string[] = ['name', 'email'];

  public displayedColumns: string[] = ['Nombre', 'Documento', 'Email', 'Torre', 'Acciones'];

  constructor() {
    super();
  }

  ngOnInit() {
    this.loadResidents();
  }

  private loadResidents(): void {
    this.residentService.getAll().subscribe({
      next: (data: Resident[]) => {
        const residentList = this.mapData(data);
        this.setDataSource(residentList);
        this.setFilterBy(this.filterList);
      }
    });
  }

  private mapData(data: Resident[]): ResidentDisplay[] {
    return data.map((resident: Resident) => ({
      ...resident,
      fullName: `${resident.name} ${resident.lastname}`
    }));
  }

  public onDelete(resident: ResidentDisplay): void {
    this.residentService.deleteById(resident.document).subscribe({
      next: () => {
        this.deleteRow(resident);
      }
    });
  }
}
