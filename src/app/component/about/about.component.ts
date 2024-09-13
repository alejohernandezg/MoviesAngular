import { Component, OnInit } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [NgbPopoverConfig]
})
export class AboutComponent implements OnInit {

  constructor(config: NgbPopoverConfig) {
    config.placement = 'bottom';
  }

  ngOnInit() {
  }

}
