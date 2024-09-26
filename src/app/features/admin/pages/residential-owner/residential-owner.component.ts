import {Component, inject, OnInit} from '@angular/core';
import {
  MatTable,
  MatTableModule
} from "@angular/material/table";
import {ResidentialOwnerService} from "../../services/residential-owner.service";

@Component({
  selector: 'app-residential-owner',
  standalone: true,
  imports: [
    MatTable,
    MatTableModule
  ],
  templateUrl: './residential-owner.component.html',
  styleUrl: './residential-owner.component.scss'
})
export class ResidentialOwnerComponent implements OnInit {
  private residentialOwnerService = inject(ResidentialOwnerService);
  public residentialOwnerList: any[] = [];

  public displayedColumns: string[] = ['name'];

  constructor() {
  }

  ngOnInit() {
    this.loadResidentialOwner();
  }

  loadResidentialOwner(): void {
    this.residentialOwnerService.getAll().subscribe({
      next: (data) => {
        this.residentialOwnerList = data;
      }
    });
  }
}
