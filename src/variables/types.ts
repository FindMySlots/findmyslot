export enum NotifierType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

export enum ErrorPageType {
  NotFound = '404',
  Error = 'error',
}

export interface State {
  state_id: number,
  state_name: string,
}

export interface District {
  district_id: number,
  district_name: string,
}
