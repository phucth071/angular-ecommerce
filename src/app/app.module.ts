import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';

import { ProductService } from './services/product.service';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';
import { MemberPageComponent } from './components/member-page/member-page.component';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/login']);
}

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'members', component: MemberPageComponent, canActivate: [OktaAuthGuard],
                    data: { onAuthRequired: sendToLoginPage }},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MemberPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule, 
  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
