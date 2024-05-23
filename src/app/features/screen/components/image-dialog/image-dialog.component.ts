import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {
  slideConfig = {
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

