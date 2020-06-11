import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

class Classification {
  code: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-classification-description',
  templateUrl: './classification-description.component.html',
  styleUrls: ['./classification-description.component.css']
})
export class ClassificationDescriptionComponent implements OnInit {

  private classifications: {VUL: Classification, NT: Classification, END: Classification, CR: Classification} = {
    VUL: {
      code: 'VUL',
      name: 'Vulnerable',
      description: 'A Vulnerable species is one which has been categorised by the International Union for Conservation of Nature (IUCN) as likely to become Endangered unless the circumstances threatening its survival and reproduction improve. Vulnerability is mainly caused by habitat loss or destruction.'
    },
    NT: {
      code: 'NT',
      name: 'Near Threatened',
      description: 'A near threatened species is one which has been categorised by the International Union for Conservation of Nature as that may be considered threatened with extinction in the near future, although it does not currently qualify for the threatened status. The IUCN notes the importance of re-evaluating "near threatened" taxa at appropriate intervals.'
    },
    END: {
      code: 'END',
      name: 'Endangered',
      description: 'An endangered species is a population of organisms which is at risk of becoming extinct because it is either few in numbers, or threatened by changing environmental or predation parameters.'
    },
    CR: {
      code: 'CR',
      name: 'Critically Engandered',
      description: 'Critically Endangered is the highest risk category assigned by the IUCN Red List for wild species. Critically Endangered means that a species\' numbers have decreased, or will decrease, by 80% within three generations.'
    }
  };


  public classification: Classification;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ClassificationDescriptionComponent>) { }

  ngOnInit(): void {
    this.classification = this.classifications[this.data.classificationCode];
  }

  close(): void {
    this.dialogRef.close();
  }

}
