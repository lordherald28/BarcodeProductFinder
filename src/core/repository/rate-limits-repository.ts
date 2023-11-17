import { Observable } from "rxjs";
import { IRateLimitsModel } from "../models/rate-limits.model";

export abstract class RateLimitsRepository {
    abstract getRateLimits(): Observable<IRateLimitsModel>
}
