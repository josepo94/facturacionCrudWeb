import { Proveedor } from './../../interfaces/proveedor';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/services/proveedor.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent  implements OnInit{

  myForm: FormGroup;
  proveedor : Proveedor
  constructor(private fb: FormBuilder,  private apiService: ProveedorService, private snackBar: MatSnackBar ) {
  this.proveedor = {nombre: "", ruc: "", clave: "", direccion: "", email: "" , telefono : "" , id:""}
  this.myForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.min(0)]],
      email: ['', Validators.required],
      ruc: ['', Validators.required],
      clave :  ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.getProveedor();
  }


  getProveedor(){
  let userId = localStorage.getItem("userId");
if (userId != null){
  this.apiService.getData(userId).subscribe(
    (response) => {
      this.proveedor = response.respuesta

      this.myForm.setValue(
       {
        nombre : this.proveedor.nombre,
        direccion: this.proveedor.direccion,
        telefono :  this.proveedor.telefono , 
        email: this.proveedor.email,
        clave : this.proveedor.clave,
        ruc : this.proveedor.ruc
       }

      );

      console.log(response);
      console.log('Datos obtenidos:', response);
    },
    (error) => {
      console.error('Error al obtener los datos:', error);
    }
  );
}
}
  

  patchProveedor(){
    let userId = localStorage.getItem("userId");
    this.apiService.updateData(userId, this.proveedor).subscribe(
      (response) => {
        this.snackBar.open("Se han acualizado los regstros exitosamente", "Entendido");
        console.log('Datos obtenidos:', response, {"duration": 4000});
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }


 
  

  onSubmit() {
    if (this.myForm.valid) {
      this.proveedor = this.myForm.value
      this.patchProveedor();
    }
  }

}
