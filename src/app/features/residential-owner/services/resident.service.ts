import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {catchError, map, Observable, throwError} from "rxjs";

import {environment} from "../../../../environments/environment";
import {Resident} from "../interfaces/resident.interface";

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  private http = inject(HttpClient);
  private residentsUrl = `${environment.BACKEND}/residents`;

  constructor() {
  }

  public getAll(): Observable<Resident[]> {
    return this.http
      .get<any>(this.residentsUrl)
      .pipe(
        map((data) => data.result),
        catchError(() => {
          return throwError(() => 'There was an error');
        })
      );
  }

  public deleteById(document: string) {
    return this.http.delete(`${this.residentsUrl}/${document}`);
  }
}
