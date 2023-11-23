
/**
 * Adaptador base para mapping
 */
export abstract class Mapper<P, O> {
    abstract mapTo(param: P): O;
}

export abstract class MapperResultProductEntity<P, O>{
    abstract mapTo(params: P): O;
}