import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {map, Observable, tap} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResidentialOwnerService {
  private http = inject(HttpClient);
  private residentialOwnerUrl = `${environment.BACKEND}/managers`;

  constructor() {
  }

  public getAll(): Observable<any[]> {
    return this.http
      .get<any>(this.residentialOwnerUrl)
      .pipe(
        map((data) => data.result)
      );
  }
}
