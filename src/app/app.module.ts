import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { SignupComponent } from './login/signup/signup.component';
import { ListBookComponent } from './list-book/list-book.component';
import { AdminComponent } from './admin/admin.component';
import { AccountManagementComponent } from './admin/account-management/account-management.component';
import { BookManagementComponent } from './admin/book-management/book-management.component';
import { BookDetailComponent } from './list-book/book-detail/book-detail.component';
import { RouterModule } from '@angular/router';
import { EditBookComponent } from './admin/book-management/edit-book/edit-book.component';
import { EditAccountComponent } from './admin/account-management/edit-account/edit-account.component';
import { AllBorrowedComponent } from './admin/all-borrowed/all-borrowed.component';
import { UserGuard } from './guard/user.guard';
import { AdminGuard } from './guard/admin.guard';
import { ManagerGuard } from './guard/manager.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    SignupComponent,
    ListBookComponent,
    AdminComponent,
    AccountManagementComponent,
    BookManagementComponent,
    BookDetailComponent,
    EditBookComponent,
    EditAccountComponent,
    AllBorrowedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'Home', component: AppComponent},
      {path:'Login', component: LoginComponent, canActivate: [UserGuard]},
      {path: 'SignUp', component: SignupComponent, canActivate: [UserGuard]},
      
      {path:'Search', component: ListBookComponent}, 
      {path: 'Book/:bookId', component: BookDetailComponent},

      {path: 'Account', component: AccountComponent, canActivate: [UserGuard]},
      {path: 'Account/:username', component: AccountComponent, canActivate: [AdminGuard, ManagerGuard]},

      {path: 'Admin', component: AdminComponent, canActivate: [AdminGuard, ManagerGuard]},
      {path: 'Admin/AllBorrowed', component: AllBorrowedComponent, canActivate: [AdminGuard, ManagerGuard]},
      {path: 'Admin/AccountManagement', component: AccountManagementComponent, canActivate: [AdminGuard, ManagerGuard]},
      {path: 'Admin/BookManagement', component: BookManagementComponent, canActivate: [AdminGuard, ManagerGuard]},
      {path: 'EditBook', component: EditBookComponent, canActivate: [AdminGuard, ManagerGuard]},
      {path: 'EditAccount', component: EditAccountComponent, canActivate: [UserGuard]},
      {path: 'EditAccount/:username', component: EditAccountComponent, canActivate: [AdminGuard, ManagerGuard]},
      
      { path: '', redirectTo: '/', pathMatch: 'full'},
      { path: '**', redirectTo: '/', pathMatch: 'full'}
    ]),
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
