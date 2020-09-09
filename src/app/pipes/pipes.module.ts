import { FilterPipe } from './filter.pipe';
import { ImagenPipe } from './imagen.pipe';
import { NgModule } from '@angular/core';
import { MesesPipe } from './meses.pipe';






@NgModule({
  imports: [  ],
  declarations: [
    ImagenPipe,
    MesesPipe,
    FilterPipe
    
  ],
  exports:[
    ImagenPipe,
    MesesPipe,
    FilterPipe
  ]
})
export class PipesModule { }
