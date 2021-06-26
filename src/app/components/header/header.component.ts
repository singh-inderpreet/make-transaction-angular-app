import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="container-fluid">
      <div class="row header-container">
        <div class="col-sm">
          <app-logo data-test="logo"></app-logo>
        </div>
        <div class="col-sm text-end">
          <div class="profile-detail">
            <span data-test="profile-title"
              >Frontend <b>Technical Assignment</b></span
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/app/styles/vars';
      :host {
        .header-container {
          padding: 20px;
          border-bottom: 1px solid #a1a1a1;
          .profile-detail {
            color: $primary-blue;
          }
        }
      }
    `,
  ],
})
export class HeaderComponent {
  constructor() {}
}
