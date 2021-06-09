export interface Comment{
    comment:string;
    text?:string;

    likes:number;
    unlikes:number;
    date:Date;

    userId?:number;
    userName?:string;

   

    client:{birthDate:Date,email:string,firstName:string,idClient:number,lastName:string}
}