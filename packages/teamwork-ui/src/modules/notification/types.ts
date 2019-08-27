export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

enum NotificationType {
  ERROR = 'ERROR',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}
