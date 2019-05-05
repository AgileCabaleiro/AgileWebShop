import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    public selectedStoreId : number = 2; // Default España - English (this need to be changed to domain selection)
    public homeCategories = [];// Used in navbar & several components
}