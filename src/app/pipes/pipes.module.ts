import { ImagenPipe } from './imagen.pipe';
import { NgModule } from '@angular/core';
import { MesesPipe } from './meses.pipe';






@NgModule({
  imports: [  ],
  declarations: [
    ImagenPipe,
    MesesPipe
  ],
  exports:[
    ImagenPipe,
    MesesPipe
  ]
})
export class PipesModule { }
