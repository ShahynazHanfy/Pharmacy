import{DrugDetails} from '../Models/DrugDetails'
export class Drug {
    id:number;
    tradeName: string;
    genericName: string;
    img: string;
    TheraSubGroupID:number;
    FormID:number;
    FirmID:number;
    UnitID:number;
    ROADID:number;
    CountryID:number;
    drugDetails:DrugDetails
  }