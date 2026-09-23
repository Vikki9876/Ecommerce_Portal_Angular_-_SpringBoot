import { createAction, props } from '@ngrx/store';

/**
 * CREATE PAYMENT ACTIONS
 */
export const createPaymentRequest = createAction(
  '[Payment] Create Payment Request',
  props<{ orderId: number }>()
);

export const createPaymentSuccess = createAction(
  '[Payment] Create Payment Success',
  props<{ payload: any }>()
);

export const createPaymentFailure = createAction(
  '[Payment] Create Payment Failure',
  props<{ error: any }>()
);

/**
 * UPDATE PAYMENT ACTIONS
 */
export const updatePaymentRequest = createAction(
  '[Payment] Update Payment Request',
  props<{ paymentId: string; paymentLinkId: string }>()
);

export const updatePaymentSuccess = createAction(
  '[Payment] Update Payment Success',
  props<{ payload: any }>()
);

export const updatePaymentFailure = createAction(
  '[Payment] Update Payment Failure',
  props<{ error: any }>()
);