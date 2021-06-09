export interface Festival{
    dateBegin:Date;
    dateEnd:Date;
    description:string;
    title:string;
    idFestival?:number;
    festivalComments?:Comment[];
}