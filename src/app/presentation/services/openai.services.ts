import { Injectable } from '@angular/core';
import { orthographyCase } from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    checkOrthography(prompt : string){
        return from (orthographyCase(prompt))
    }
}