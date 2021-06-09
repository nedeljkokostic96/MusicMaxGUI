import { Comment } from "./Comment";

export interface Forum{
    idForumTopic:number;
    date:Date;
    comments:Comment[];
    topic:string;

}