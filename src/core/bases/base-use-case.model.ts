import { Observable } from "rxjs";

/**
 * @param P Parametros
 * @param M Retorna un Observable<M>
 */
export interface IBaseUseCase<P, M> {
    execute(params: P): Observable<M>;
}