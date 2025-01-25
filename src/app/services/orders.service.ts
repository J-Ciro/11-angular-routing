import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IClients, IClientsResponse } from '../interface/clients.interface';
import { Observable, tap } from 'rxjs';
import { IOrders, IOrdersResponse } from '../interface/orders.interface';
import { DataManagementService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class getOrderService {
    private apiUrl = 'http://localhost:8080/api/orders';
    
    constructor(
      private http: HttpClient,
      private dataManagementService: DataManagementService<IOrders>
    ) {}
  
    getData() {
      return this.http.get<IOrders[]>(this.apiUrl).pipe(
        tap(data => this.dataManagementService.updateData(data))
      );
    }
      
    postData(client: IOrders) {
      return this.http.post<IOrders>(this.apiUrl, client).pipe(
        tap(newClient => this.dataManagementService.addItem(newClient))
      );
    }
}
