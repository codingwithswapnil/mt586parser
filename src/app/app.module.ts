import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ClipboardModule} from '@angular/cdk/clipboard';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PopupFormComponent } from './popup-form/popup-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    PopupFormComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ClipboardModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }