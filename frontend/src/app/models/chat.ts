import { Poruka } from "./poruka";

export class Chat{
    userA: string;
    userB: string;
    messages: Array<Poruka>;
    active: boolean;
}