import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IMenu, IMenuResponse } from '../interface/menus.interface';
import { DataManagementService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class getMenusService {
  private apiUrl = 'http://localhost:8080/api/menus';
  
  constructor(
    private http: HttpClient,
    private dataManagementService: DataManagementService<IMenu>
  ) {}

  getData() {
    return this.http.get<IMenu[]>(this.apiUrl).pipe(
      tap(data => this.dataManagementService.updateData(data))
    );
  }
    
  postData(client: IMenu) {
    return this.http.post<IMenu>(this.apiUrl, client).pipe(
      tap(newClient => this.dataManagementService.addItem(newClient))
    );
  }
}
