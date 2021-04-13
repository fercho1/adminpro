import { VariableService } from './../../services/variable/variable.service';

import { Variable } from './../../models/variable.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styles: [
  ]
})
export class VariablesComponent implements OnInit {

  variables: Variable[]=[];

  constructor(
    public _variableService: VariableService
  ) { }

  ngOnInit(): void {
    this.cargarVariables();
  }

  cargarVariables(){
    this._variableService.cargarVariables()
        .subscribe(variables=> this.variables=variables);

        
  }

  guardarVariable(variable:Variable){
    this._variableService.actualizarVariable(variable)
        .subscribe();
  }

}
