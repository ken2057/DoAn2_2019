import {MatButtonModule} from '@angular/material';
import { MatDialogModule, MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent , LoginDialog} from './login/login.component';
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
import { LoginGuard } from './guard/login.guard';
import { BorrowedComponent } from './admin/all-borrowed/borrowed/borrowed.component';
import { DialogtemplateComponent } from './dialogtemplate/dialogtemplate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from './services/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    [LoginComponent, LoginDialog],
    AccountComponent,
    SignupComponent,
    ListBookComponent,
    AdminComponent,
    AccountManagementComponent,
    BookManagementComponent,
    BookDetailComponent,
    EditBookComponent,
    EditAccountComponent,
    AllBorrowedComponent,
    BorrowedComponent,
    DialogtemplateComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'Home', component: AppComponent},
      {path:'Login', component: LoginComponent, canActivate: [LoginGuard]},
      {path: 'SignUp', component: SignupComponent, canActivate: [LoginGuard]},

      {path:'Search', component: ListBookComponent},
      {path: 'Book/:bookId', component: BookDetailComponent},

      {path: 'Account', component: AccountComponent, canActivate: [UserGuard]},
      {path: 'Account/:username', component: AccountComponent, canActivate: [AdminGuard]},

      {path: 'Borrowed/:borrowedId', component: BorrowedComponent, canActivate: [UserGuard]},

      {path: 'Admin', component: AdminComponent, canActivate: [AdminGuard]},
      {path: 'Admin/AllBorrowed', component: AllBorrowedComponent, canActivate: [AdminGuard]},
      {path: 'Admin/AllBorrowed/:username', component: AllBorrowedComponent, canActivate: [AdminGuard]},
      {path: 'Admin/AccountManagement', component: AccountManagementComponent, canActivate: [AdminGuard]},
      {path: 'Admin/BookManagement', component: BookManagementComponent, canActivate: [AdminGuard]},
      {path: 'EditBook/:bookId', component: EditBookComponent, canActivate: [AdminGuard]},
      {path: 'EditAccount', component: EditAccountComponent, canActivate: [UserGuard]},
      {path: 'EditAccount/:username', component: EditAccountComponent, canActivate: [AdminGuard]},
      {path: 'AddBook', component: EditBookComponent, canActivate: [AdminGuard]},

      { path: '', redirectTo: '/Search', pathMatch: 'full'},
      { path: '**', redirectTo: '/', pathMatch: 'full'}
    ]),
  ],
  providers: [
    CookieService,
    DialogService,
    { provide: MatDialogRef, useValue: {} },
	  { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ DialogtemplateComponent ]
})
export class AppModule { }
