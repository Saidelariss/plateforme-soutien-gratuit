import { Competence } from './competence';
import { Validation } from './validation';
import { Utilisateur } from './utilisateur';

export interface Formateur extends Utilisateur{
    competences : Competence[];
    validations : Validation[];
    id: number;
    prenom: string;
    nom: string;
    password: string;
    email: string;
    telephone: string;
    role: string;

}