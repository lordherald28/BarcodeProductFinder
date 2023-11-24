import { Observable } from "rxjs";

/**
 * @param Input Parametros
 * @param Output Retorna un Observable<M>
 */
export interface IBaseUseCase<Input, Output> {
    execute(params: Input): Observable<Output> | void ;
}
