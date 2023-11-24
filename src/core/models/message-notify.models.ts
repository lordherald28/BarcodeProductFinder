

export interface IMessages {
    severity?: string; // Type message, like danger, info,wanr
    detail?: string;
    isShow?:boolean

}

export enum eSeverity {
    DANGER = 'danger',
    INFO = 'info',
    WANR = 'warn',
    SUCCESS = 'success',
}