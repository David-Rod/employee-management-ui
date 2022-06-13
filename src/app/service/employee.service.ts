import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService
{
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]>
  {
    return this.http.get<any>(`${this.apiServerUrl}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee>
  {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public deleteEmployee(id: number): void
  {
    this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${id}`);
  }

  public findEmployee(id: number): Observable<Employee>
  {
    return this.http.get<any>(`${this.apiServerUrl}/employee/${id}`);
  }

  public updateEmployee(employee: Employee): Observable<Employee>
  {
    return this.http.put<any>(`${this.apiServerUrl}/employee/update`, employee);
  }
}
