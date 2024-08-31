import { Component, OnInit } from '@angular/core';
import { GenerateService } from '../../generate-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.scss'],
})
export class ImageGeneratorComponent implements OnInit {
  description: any = '';
  imageUrl: string | null = null;
  loading: boolean = false;
  apiData!: PhotosApi[];
  limit: number = 10;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  constructor(
    private imageGenerationService: GenerateService,
    private readonly http: HttpClient
  ) {}

  ngOnInit() {
    this.fetch();
  }
  generateImage() {
    this.loading = true;
    this.imageGenerationService.generateImage(this.description).subscribe(
      (response) => {
        if (response.imageUrl && response.imageUrl.length > 0) {
          this.loading = false;
          //@ts-ignore
          this.imageUrl = response.imageUrl[0]?.url;
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error generating image:', error);
      }
    );
  }

  reset() {
    this.description = '';
    this.imageUrl = null;
  }

  downloadImage() {
    if (this.imageUrl) {
      const link = document.createElement('a');
      link.href = this.imageUrl;
      link.setAttribute('download', 'generated-image.png');
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  fetch() {
    const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    const http$ = this.http.get<PhotosApi[]>(api);

    http$.subscribe(
      (res) => (this.apiData = res),
      (err) => throwError(err)
    );
  }
}
