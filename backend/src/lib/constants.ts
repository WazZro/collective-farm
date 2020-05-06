import { DeliveryStatus, DeliveryType } from '../models/delivery.model';

export const SNACK_BAR_DURATION = 3000;
export const DELIVERY_TYPE_MAP = new Map<string, string>([
  [DeliveryType.INCOMING + '', 'Привоз'],
  [DeliveryType.OUTCOMING + '', 'Вывоз'],
]);
export const DELIVERY_STATUS_MAP = new Map<number, string>([
  [DeliveryStatus.CREATED, 'Создано'],
  [DeliveryStatus.CONFIRMED, 'Подтверждено'],
  [DeliveryStatus.DONE, 'Завершено'],
  [DeliveryStatus.WAIT_CONFIRM, 'Ожидает подтверждения'],
  [DeliveryStatus.TRANSIT, 'В пути'],
]);
