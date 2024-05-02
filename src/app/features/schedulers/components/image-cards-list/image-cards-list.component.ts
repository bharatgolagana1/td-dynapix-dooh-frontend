import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-cards-list',
  templateUrl: './image-cards-list.component.html',
  styleUrls: ['./image-cards-list.component.scss'],
  
})
export class ImageCardsListComponent {
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
