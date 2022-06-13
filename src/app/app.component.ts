import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Management UI';
  employees!: Employee[];
  editEmployee: any;
  deleteEmployee: any;

  constructor (private employeeService: EmployeeService ) {}

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void
  {
    this.employeeService.getEmployees().subscribe( employeeList => {
      this.employees = employeeList;
    },
    (err: HttpErrorResponse) => {
      alert(err.message);
    })
  }


  public onAddEmployee(addForm: NgForm) {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (res) => {
        console.log(res);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId);
    this.getEmployees();
  }

  public onEditEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe(
      (res) => {
        console.log(res);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openModal(employee: any, mode: string): void {
    const button = document.createElement('button');
    const container = document.getElementById('main-container');
    // Changes default type from submit
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    else if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    else {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
