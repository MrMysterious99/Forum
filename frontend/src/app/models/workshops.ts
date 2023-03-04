import { Comment } from "./comment";
import { Like } from "./like";
import { Participant } from "./participant";

export class Workshop{
    id:       string;
    name:     string;
    location: string;
    date:     Date;
    basicinfo:string;
    longinfo: string;
    creator:  string;
    likes:    Array<Like>;
    capacity: number;
    comments:       Array<Comment>;
    participants:   Array<Participant>;
    photo:    any;
    gallery:  Array<any>;
    approved: string;
  }
  