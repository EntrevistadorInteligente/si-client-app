import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileRoutingModule } from "./profile-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./profile.component";
import { DropdownCvComponent } from "./dropdown-cv/dropdown-cv.component";
import { NgxDropzoneModule } from "ngx-dropzone";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ListItemComponent } from "./edit-profile/list-item/list-item.component";

@NgModule({
  declarations: [
    ProfileComponent,
    DropdownCvComponent,
    EditProfileComponent,
    ListItemComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ],
})
export class ProfileModule {}
