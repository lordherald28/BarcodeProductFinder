import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IMessages } from "../models/message-notify.models";

export abstract class SystemRepository {
    abstract setMessages(params: IMessages): void;
    abstract getMessages(): Observable<IMessages>;
}
