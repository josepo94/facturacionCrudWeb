import { Proveedor } from './../../interfaces/proveedor';
import { Impuesto } from './../../interfaces/impuesto';
import { ImpuestosService } from './../../services/impuestos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProductoService} from '../../services/producto.service'
import { Productos } from 'src/app/interfaces/productos';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'impuesto', 'acciones'];
  myForm: FormGroup;
  dataSource: any[];
  impuestos :Impuesto[];
  impuesto : Impuesto;
  tableVisible : boolean
  actionLabel : string
  accordionClass = 'accordion-collapse collapse'; 
    productos :   Productos
    proveedor :   Proveedor
  constructor(private fb: FormBuilder, private apiService: ProductoService, private  impuestoService: ImpuestosService , private snackBar: MatSnackBar) {
    this.impuestos = []
    this.tableVisible = true
    this.actionLabel = "CREAR PRODUCTO";
    this.dataSource = []
    this.myForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      impuesto: ['', Validators.required]
    });
    this.proveedor = {telefono:"",clave:"",direccion:"",email:"",nombre:"",ruc:"", id: null}
    this.impuesto = {id: 0 , nombre:"", porcentaje:0 }
    this.productos= {nombre: "", descripcion:"",impuesto: this.impuesto, proveedor: this.proveedor, precio: 0}
  }

  onSubmit() {
  


    if (this.myForm.valid) {

        this.proveedor.id = localStorage.getItem("userId");
        this.impuesto.id = this.myForm.get('impuesto')?.value
        this.productos.nombre = this.myForm.get('nombre')?.value
        this.productos.descripcion = this.myForm.get('descripcion')?.value
        this.productos.precio = this.myForm.get('precio')?.value
        this.apiService.postData(this.productos).subscribe(
          (response) => {
            this.snackBar.open("Se han creado los regstros exitosamente", "Entendido");
            console.log('Datos obtenidos:', response, {"duration": 4000});
          },
          (error) => {
            console.error('Error al obtener los datos:', error);
          }
        );
   
    
    }
  }

  ngOnInit(): void {
    this.dataSource.push({
      nombre: "nombre",
      descripcion:"descripcion",
      precio: "precio",
      impuesto: "impuesto"
    });
    
 this.obtenerImpuestos();
 this.obtenerProductos();
    
  }

  obtenerProductos(){
    let userId = localStorage.getItem("userId");
    this.apiService.getData(userId).subscribe(
      (response) => {
        this.dataSource = response.respuesta
        for (let i = 0 ; i < this.dataSource.length; i++){
          this.dataSource[i].impuesto = this.impuestos.filter(impuesto =>  this.dataSource[i].idImpuesto== impuesto.id)[i]
        }
      
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  obtenerImpuestos(){
    this.impuestoService.getData().subscribe(
      (response) => {
        
        if (response.respuesta.length > 0){
          this.impuestos = response.respuesta
    
          
        }

      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }



       // Encuentra el nombre del impuesto seleccionado
      // const impuestoSeleccionado = this.impuestos.find(imp => imp.id === formValue.impuesto);

       // Agrega los datos del formulario a la tabla
       
 
}
