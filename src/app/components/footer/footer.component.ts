import { Component, OnInit } from '@angular/core';
import {AppConstants} from "../../config/app-constants";
import {MatDialog} from "@angular/material/dialog";
import {CopyrightNoticeComponent} from "../copyright-notice/copyright-notice.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public copyrightShort: string;
  constructor(private appConstants: AppConstants,
              protected dialog: MatDialog) {
    this.copyrightShort = appConstants.COPYRIGHT_SHORT;
  }

  ngOnInit(): void {
  }

  public showCopyright(): void {
    this.dialog.open(CopyrightNoticeComponent, {
      width: '600px',
    });
  }
}
