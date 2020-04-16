// import {
//   EntitySubscriberInterface,
//   EventSubscriber,
//   InsertEvent,
//   UpdateEvent,
// } from 'typeorm';
// import { Delivery } from '../../models/delivery.entity';
// import { DeliveryStatus } from '../interfaces/delivery-status.enum';

// @EventSubscriber()
// export class DeliverySubscriber implements EntitySubscriberInterface<Delivery> {
//   /**
//    * Indicates that this subscriber only listen to Post events.
//    */
//   public listenTo(): new () => unknown {
//     return Delivery;
//   }

//   /**
//    * Called before post insertion.
//    */
//   public async afterUpdate(event: UpdateEvent<Delivery>): Promise<void> {
//     console.log(event.databaseEntity);
//     console.log(event.entity);
//     console.log(event.updatedColumns);
//     const delivery = event.entity;
//     const statusUpdated = event.updatedColumns.filter(
//       (cl) => cl.propertyName === 'status',
//     )[0];

//     if (!statusUpdated) return;
//     if (delivery.status !== DeliveryStatus.CONFIRMED) return;

//     try {
//       delivery.stock.addGoods(delivery.volume);
//     } catch (e) {

//     }
    
//   }
// }
