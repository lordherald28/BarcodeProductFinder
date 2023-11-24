import { Observable, Subject } from "rxjs";
import { IBaseUseCase } from "../bases/base-use-case.model";
import { IMessages } from "../models/message-notify.models";
import { SystemRepository } from "../repository/system-repository";



export class UseCaseSetMessages implements IBaseUseCase<IMessages, void>{
    constructor(private readonly repositorySystem: SystemRepository) { }

    execute(params: IMessages): void {
        return this.repositorySystem.setMessages(params)
    }

}