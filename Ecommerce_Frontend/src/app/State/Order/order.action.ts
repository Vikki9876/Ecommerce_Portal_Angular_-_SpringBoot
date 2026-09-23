import { createAction, props } from "@ngrx/store";

// --- Create Order ---
export const createOrderRequest = createAction(
    '[Order] Create Order Request',
    props<{ reqData: any }>()
);

export const createOrderSuccess = createAction(
    '[Order] Create Order Success',
    props<{ payload: any }>()
);

export const createOrderFailure = createAction(
    '[Order] Create Order Failure',
    props<{ error: any }>()
);

// --- Get Order History (User's Orders) ---
export const getOrderHistoryRequest = createAction(
    '[Order] Get Order History Request'
);

export const getOrderHistorySuccess = createAction(
    '[Order] Get Order History Success',
    props<{ payload: any }>()
);

export const getOrderHistoryFailure = createAction(
    '[Order] Get Order History Failure',
    props<{ error: any }>()
);

// --- Get Order By ID ---
export const getOrderByIdRequest = createAction(
    '[Order] Get Order By Id Request',
    props<{ orderId: string }>()
);

export const getOrderByIdSuccess = createAction(
    '[Order] Get Order By Id Success',
    props<{ payload: any }>()
);

export const getOrderByIdFailure = createAction(
    '[Order] Get Order By Id Failure',
    props<{ error: any }>()
);


export const deleteOrderRequest = createAction(
    '[Order] Delete Order Request',
    props<{ orderId: any }>()
);

export const deleteOrderSuccess = createAction(
    '[Order] Delete Order Success',
    props<{ orderId: any }>()
);

export const deleteOrderFailure = createAction(
    '[Order] Delete Order Failure',
    props<{ error: any }>()
);