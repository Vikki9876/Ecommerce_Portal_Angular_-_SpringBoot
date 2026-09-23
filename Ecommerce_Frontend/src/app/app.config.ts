import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from './State/User/user.reducer';
import { authReducer } from './State/Auth/auth.reducer';
import { productReducer } from './State/Product/product.reducer';
import { cartReducer } from './State/Cart/cart.reducer';
import { orderReducer } from './State/Order/order.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(),
    provideStore(
      {
      auth: authReducer,
      user: userReducer,
      product:productReducer,
      cart:cartReducer,
      order:orderReducer,
    },
  {}
),
HttpClient
  ],
};
