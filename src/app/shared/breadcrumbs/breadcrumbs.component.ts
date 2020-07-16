import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import {filter,map} from 'rxjs/operators'

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnDestroy {

  titulo: string;
  tituloSubs$: Subscription;

  constructor(
    private router: Router,
    public title: Title,
    public meta: Meta
   ) {

    this.tituloSubs$ = this.getDataRoute()
        .subscribe(({titulo})=>{
          this.titulo = titulo;
          document.title = `AdminPro-${titulo}`;
        })

    this.getDataRoute()
      .subscribe( data => {

        this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

        let metaTag: MetaDefinition = {
          name: 'description',
          content: this.titulo
        };

        this.meta.updateTag(metaTag);

      });

  }

  getDataRoute() {

    return this.router.events
      .pipe(
        filter( evento => evento instanceof ActivationEnd  ),
        filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
        map( (evento: ActivationEnd) => evento.snapshot.data )
        );
  }


  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

}
