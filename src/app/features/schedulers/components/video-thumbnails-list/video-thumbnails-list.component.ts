import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  uploadTime: string;
  views: string;
  author: string;
  videoUrl: string;
  description: string;
  subscriber: string;
  isLive: boolean;
}

const videosList: Video[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    thumbnailUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
    duration: '8:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    author: 'Vlc Media Player',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    subscriber: '25254545 Subscribers',
    isLive: true,
  },
  {
    id: '2',
    title: 'The first Blender Open Movie from 2006',
    thumbnailUrl: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
    duration: '12:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    author: 'Blender Inc.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description:
      'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
    subscriber: '25254545 Subscribers',
    isLive: true,
  },
  {
    id: '3',
    title: 'For Bigger Blazes',
    thumbnailUrl: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
    duration: '8:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    author: 'T-Series Regional',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description:
      'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
    subscriber: '25254545 Subscribers',
    isLive: true,
  },
  {
    id: '4',
    title: 'For Bigger Escape',
    thumbnailUrl:
      'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
    duration: '8:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    author: 'T-Series Regional',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description:
      " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    subscriber: '25254545 Subscribers',
    isLive: false,
  },
  {
    id: '5',
    title: 'Big Buck Bunny',
    thumbnailUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
    duration: '8:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    author: 'Vlc Media Player',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    subscriber: '25254545 Subscribers',
    isLive: true,
  },
  {
    id: '6',
    title: 'For Bigger Blazes',
    thumbnailUrl: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
    duration: '8:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    author: 'T-Series Regional',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description:
      'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
    subscriber: '25254545 Subscribers',
    isLive: false,
  },
  {
    id: '7',
    title: 'For Bigger Escape',
    thumbnailUrl:
      'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
    duration: '8:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    author: 'T-Series Regional',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description:
      " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    subscriber: '25254545 Subscribers',
    isLive: true,
  },
  {
    id: '8',
    title: 'The first Blender Open Movie from 2006',
    thumbnailUrl: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
    duration: '12:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    author: 'Blender Inc.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description:
      'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
    subscriber: '25254545 Subscribers',
    isLive: false,
  },
];
@Component({
  selector: 'app-video-thumbnails-list',
  templateUrl: './video-thumbnails-list.component.html',
  styleUrls: ['./video-thumbnails-list.component.scss'],
})
export class VideoThumbnailsListComponent {
  @Output() selectedVideosChanged = new EventEmitter<Video[]>();

  public videos: Video[] = [];
  public selectedVideos: Video[] = [];
  constructor(private dialog: MatDialog) {}
  ngOnInit() {
    this.videos = videosList;
  }

  openVideoDialog(videoUrl: string): void {
    this.dialog.open(VideoDialogComponent, {
      data: { videoUrl },
    });
  }

  toggleSelection(video: Video): void {
    const index = this.selectedVideos.findIndex((v) => v.id === video.id);
    if (index === -1) {
      this.selectedVideos.push(video);
    } else {
      this.selectedVideos.splice(index, 1);
    }
    console.log('final selected videos', this.selectedVideos);
    this.selectedVideosChanged.emit(this.selectedVideos);
  }

  isSelected(video: any): boolean {
    return this.selectedVideos.some(
      (selectedVideo) => selectedVideo.id === video.id
    );
  }
}
