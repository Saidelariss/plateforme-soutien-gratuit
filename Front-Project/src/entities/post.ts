import { Apprenti } from './apprenti';
import { Competence } from './competence';
import { Validation } from './validation';

export interface Post{
    id?: number;
    titre: string;
    contenu: string;
    datePublication: Date;
    apprenti?: Apprenti;
    competence: Competence;
    validations?: Validation[];
}