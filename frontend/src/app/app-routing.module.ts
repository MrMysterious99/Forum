import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component'
import {RegisterComponent} from './pages/register/register.component'
import {OrganizeComponent} from './pages/organize/organize.component'
import {ProfileComponent} from './pages/profile/profile.component'
import {WorkshopsComponent} from './pages/workshops/workshops.component'
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { WorkshopInfoComponent } from './pages/workshop-info/workshop-info.component';
import { ChatComponent } from './pages/chat/chat.component';
import { EditComponent } from './pages/edit/edit.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

const routes: Routes = [
  {path: "", component: LoginComponent },
  {path: "register", component:  RegisterComponent},
  {path: "organize", component:  OrganizeComponent},
  {path: "profile", component:  ProfileComponent},
  {path: "workshops", component:  WorkshopsComponent},
  {path: "changepass", component:  PasswordChangeComponent},
  {path: "winfo/:id", component:  WorkshopInfoComponent},
  {path: "chat", component:  ChatComponent},
  {path: "edit/:id", component:  EditComponent},
  {path: "useredit/:id/:me", component:  UserEditComponent},
  {path: "adminlogin", component:  AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
