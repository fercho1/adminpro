import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario{
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){ }

    get imagenUrl() {

        if ( !this.img ) {
            return `${ base_url }/img/usuarios/no-image`;
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/img/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/img/usuarios/no-image`;
        }
    }
}