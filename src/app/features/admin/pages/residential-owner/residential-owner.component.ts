import {Component, inject, OnInit} from '@angular/core';

import {
  MatTableModule
} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";

import {ResidentialOwnerService} from "../../services/residential-owner.service";
import {ResidentialOwner} from "../../interfaces/residentialOwner.interface";
import {TableBase} from "../../../../shared/base/table.base";

@Component({
  selector: 'app-residential-owner',
  standalone: true,
  imports: [
    MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './residential-owner.component.html',
  styleUrl: './residential-owner.component.scss'
})
export class ResidentialOwnerComponent extends TableBase<ResidentialOwner> implements OnInit {
  private residentialOwnerService = inject(ResidentialOwnerService);
  private filterList: string[] = ['name', 'email', 'document', 'tower'];

  public displayedColumns: string[] = ['Nombre', 'Documento', 'Email', 'Torre', 'Acciones'];

  constructor() {
    super();
  }

  ngOnInit() {
    this.loadResidentialOwner();
  }

  private loadResidentialOwner(): void {
    this.residentialOwnerService.getAll().subscribe({
      next: (data: ResidentialOwner[]) => {
        this.setDataSource(data);
        this.setFilterBy(this.filterList);
      }
    });
  }

  public onDelete(residentialOwner: ResidentialOwner): void {
    this.residentialOwnerService.deleteById(residentialOwner.document).subscribe({
      next: () => {
        this.deleteRow(residentialOwner);
      }
    })
  }
}
