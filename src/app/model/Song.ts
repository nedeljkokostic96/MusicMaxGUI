export interface Song{
    name:string;
    duration:number;
    author:string;
    composer:string;
    performer:string;
    textSong:string;
    idSong:number;
    grades:number[];

    impressions:Comment[];
    authorID?:string;
    composerID?:string;
    performerID?:string;
}