export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

export enum NotificationType {
  ERROR = 'ERROR',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}
