import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sharedPage/navbar/navbar.component';
import { FooterComponent } from './sharedPage/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WorkshopsComponent } from './pages/workshops/workshops.component';
import { OrganizeComponent } from './pages/organize/organize.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WorkshopInfoComponent } from './pages/workshop-info/workshop-info.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { ChatComponent } from './pages/chat/chat.component';
import { EditComponent } from './pages/edit/edit.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    WorkshopsComponent,
    OrganizeComponent,
    RegisterComponent,
    WorkshopInfoComponent,
    PasswordChangeComponent,
    ChatComponent,
    EditComponent,
    AdminLoginComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
