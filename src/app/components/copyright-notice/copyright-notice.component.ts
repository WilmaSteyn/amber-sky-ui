import { Component, OnInit } from '@angular/core';
import {AppConstants} from '../../config/app-constants';

@Component({
  selector: 'app-copyright-notice',
  templateUrl: './copyright-notice.component.html',
  styleUrls: ['./copyright-notice.component.css']
})
export class CopyrightNoticeComponent implements OnInit {

  copyrightShort: string;

  constructor(private appConstants: AppConstants) {
    this.copyrightShort = appConstants.COPYRIGHT_SHORT;
  }

  ngOnInit(): void {
  }

}
