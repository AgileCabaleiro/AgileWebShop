import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    public selectedStore = 'España'; //Default España - English (this need to be changed to domain selection)
    public selectedStoreId : number = 2; // Default España - English (this need to be changed to domain selection)
    public homeCategories = [];// Used in navbar & several components
    public componentSelector = 'home'; // Used to know current component loaded in router-outlet (home as default)
}