import { NgModule } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [LogoComponent, HeaderComponent],
  imports: [],
  exports: [HeaderComponent]
})
export class HeaderModule {}
