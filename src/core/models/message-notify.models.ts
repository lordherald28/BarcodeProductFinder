

export interface IMessages {
    severity?: string; // Type message, like danger, info,wanr
    detail?: string;
    isShow?: boolean;
    icon?: string;
    hasLinkCors?:boolean;

}

export enum eSeverity {
    DANGER = 'danger',
    INFO = 'info',
    WANR = 'warn',
    SUCCESS = 'success',
}

export enum eIcon {
    warning = 'warning',
    error = 'error',
    success = 'done',
    info = 'info',

}