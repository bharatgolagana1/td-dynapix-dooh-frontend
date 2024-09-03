import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog-public-case',
  templateUrl: './image-dialog-public-case.component.html',
  styleUrls: ['./image-dialog-public-case.component.scss']
})
export class ImageDialogPublicCaseComponent {
  slideConfig = {
    "dots" : true, 
    "autoplay" : true,
    "autoplaySpeed" : 5000,
    "pauseOnHover" : true,
    "responsive"  :  [
      {
        "breakpoint"  : 992,
        "settings"  : {
          "arrows" : true,
          "infinite" : true,
          "slidesToShow" : 2,
          "slidesToScroll" : 2,
        }
      },
      {
        "breakpoint"  : 768,
        "settings"  : {
          "arrows" : true,
          "infinite" : true,
          "slidesToShow" : 1,
          "slidesToScroll" : 1,
        }
      }
    ],
    prevArrow: '<button type="button" class="slick-prev">Previous</button>',
    nextArrow: '<button type="button" class="slick-next">Next</button>',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { images: string[] }) {}
}
