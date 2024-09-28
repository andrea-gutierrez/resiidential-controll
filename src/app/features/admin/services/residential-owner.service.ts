import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {catchError, map, Observable, throwError} from "rxjs";

import {environment} from "../../../../environments/environment";

import {ResidentialOwner} from "../interfaces/residentialOwner.interface";

@Injectable({
  providedIn: 'root'
})
export class ResidentialOwnerService {
  private http = inject(HttpClient);
  private residentialOwnerUrl = `${environment.BACKEND}/managers`;

  constructor() {
  }

  public getAll(): Observable<ResidentialOwner[]> {
    return this.http
      .get<any>(this.residentialOwnerUrl)
      .pipe(
        map((data) => data.result),
        catchError(() => {
          return throwError(() => 'There were an error');
        })
      );
  }
}
