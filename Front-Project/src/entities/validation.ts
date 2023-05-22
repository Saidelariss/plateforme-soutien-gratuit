import { Formateur } from './formateur';
import { Post } from './post';

export interface Validation{
    id: number;
    formateurAccepte: Boolean;
    apprentiAccepte: Boolean;
    formateur: Formateur;
    post: Post;
}