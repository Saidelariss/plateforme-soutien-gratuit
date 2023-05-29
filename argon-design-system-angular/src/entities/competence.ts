import { Formateur } from './formateur';
import { Post } from './post';

export interface Competence{
    id : number;
    nom : string;
    formateurs : Formateur[];
    posts : Post[];
}