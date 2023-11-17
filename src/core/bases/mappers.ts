
/**
 * Adaptador base para mapping
 */
export abstract class Mapper<P, O> {
    abstract mapTo(param: P): O;
}