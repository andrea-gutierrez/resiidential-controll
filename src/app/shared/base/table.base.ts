import {MatTableDataSource} from "@angular/material/table";

export class TableBase<T> {
  public dataSource: MatTableDataSource<T> = new MatTableDataSource();

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public setFilterBy(list: string[]): void {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return list.some(item => (data[item as keyof T] as string).toLowerCase().includes(filter));
    }
  }

  public setDataSource(list: T[]): void {
    this.dataSource.data = list;
    this.dataSource._updateChangeSubscription();
  }

  public deleteRow(element: T): void {
    const index = this.dataSource.data.indexOf(element);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
}
