import { Post } from './post';
import { Utilisateur } from './utilisateur';

export interface Apprenti extends Utilisateur{
    posts? : Post[]
    
}