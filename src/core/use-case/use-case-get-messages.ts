import { Observable, Subject } from "rxjs";
import { IBaseUseCase } from "../bases/base-use-case.model";
import { IMessages } from "../models/message-notify.models";
import { SystemRepository } from "../repository/system-repository";



export class UseCaseGetMessages implements IBaseUseCase<void, IMessages>{
  constructor(private readonly repositorySystem: SystemRepository) { }

  execute(params: void): Observable<IMessages> {
    // this.repositorySystem.getMessages(params).subscribe(console.log)
    return this.repositorySystem.getMessages()
  }

}
