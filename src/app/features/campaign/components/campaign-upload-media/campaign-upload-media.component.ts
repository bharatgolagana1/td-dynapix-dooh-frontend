import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CampaignService } from '../../campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { DateRangePickerDialogComponent } from '../../date-range-picker-dialog/date-range-picker-dialog.component';
interface MediaForDateRange {
  startDate: string;
  endDate: string;
  media: string;
  mediaFile: File | null;
  mediaType: string;
  uploaded: boolean;
}

interface CampaignPlaylistMedia {
  screenId: string;
  mediaForDateRanges: MediaForDateRange[];
  isSelected: boolean;
  screenDetails: {
    screenName: string;
    size: string;
    SFT: string;
    NextAvailableDate: Date;
    address: string;
    locationCoordinates: string;
    imageUrls: string[];
  };
}

@Component({
  selector: 'app-campaign-upload-media',
  templateUrl: './campaign-upload-media.component.html',
  styleUrls: ['./campaign-upload-media.component.scss'],
})
export class CampaignUploadMediaComponent {
  isUploading = false;
  campaignId: string;
  selectedFiles: File[] = [];
  screenIds: string[] = [];
  selectedScreens: string[] = [];
  isAllSelected: boolean = false;
  campaignPlaylistMediaData: CampaignPlaylistMedia[] = [];
  displayedColumns: string[] = ['screens', 'dateRange', 'media'];

  slotSize: string = '';
  extraSlotSize = '';
  selectedDateRange = '';
  availableDateRanges: string[] = [];
  campaignStartDate!: string;
  campaignEndDate!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private loaderService: LoaderService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.campaignId = this.route.snapshot.paramMap.get('campaignId')!;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const campaignId = params['campaignId'];
      this.fetchCampaignDetails(campaignId);
    });
  }

  fetchCampaignDetails(campaignId: string) {
    this.campaignService.getCampaignById(campaignId).subscribe({
      next: (response) => {
        if (response.campaign) {
          this.campaignStartDate = new Date(
            response.campaign.startDate
          ).toLocaleDateString('en-GB');
          this.campaignEndDate = new Date(
            response.campaign.endDate
          ).toLocaleDateString('en-GB');
          const dateRange = `${this.campaignStartDate} - ${this.campaignEndDate}`;
          this.availableDateRanges.push(dateRange);
          this.selectedDateRange = dateRange;
          this.screenIds = response.campaign.screenIds;
          this.slotSize = response.campaign.slotSize;
          this.fetchScreens(this.screenIds);
        }
      },
      error: (error) => {
        console.error('Error fetching campaign details:', error);
      },
    });
  }

  fetchScreens(screenIds: string[]) {
    this.campaignService.getScreensByIds(screenIds).subscribe({
      next: (response) => {
        this.campaignPlaylistMediaData = response.screens.map(
          (screen: any) => ({
            screenId: screen._id,
            mediaForDateRanges: [],
            isSelected: false,
            screenDetails: screen,
          })
        );
        console.log(
          'campaignPlaylistMediaData',
          this.campaignPlaylistMediaData
        );
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching screens:', error);
      },
    });
  }

  onFileSelected(event: any, fileInput: HTMLInputElement) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedScreens.forEach((screenId) => {
          const screenMedia = this.campaignPlaylistMediaData.find(
            (screen) => screen.screenId === screenId
          );

          if (screenMedia) {
            const [startDate, endDate] = this.selectedDateRange.split(' - ');

            let existingRange = screenMedia.mediaForDateRanges.find(
              (range) =>
                range.startDate === startDate && range.endDate === endDate
            );

            if (!existingRange) {
              existingRange = {
                startDate: startDate,
                endDate: endDate,
                media: '',
                mediaFile: null,
                mediaType: '',
                uploaded: false,
              };
              screenMedia.mediaForDateRanges.push(existingRange);
            }

            if (!existingRange.uploaded) {
              existingRange.media = e.target.result;
              const fileType = file.type.startsWith('image')
                ? 'image'
                : 'video';
              existingRange.mediaType = fileType;
              existingRange.mediaFile = file;
              existingRange.uploaded = true;
            } else {
              console.log(
                `Media already exists for screen: ${screenId}, date range: ${startDate} - ${endDate}. Skipping update.`
              );
            }
          }
        });
        fileInput.value = '';
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }

  onUpload() {
    const formData = new FormData();
    formData.append('campaignId', this.campaignId);
    formData.append('startDate', this.campaignStartDate);
    formData.append('endDate', this.campaignEndDate);

    const mediaMappings: any = [];
    this.isUploading = true;
    this.campaignPlaylistMediaData.forEach((screen) => {
      screen.mediaForDateRanges.forEach((range) => {
        const { startDate, endDate, mediaFile } = range;

        if (!mediaFile) return;

        mediaMappings.push({
          screenId: screen.screenId,
          startDate: startDate,
          endDate: endDate,
          fileName: mediaFile.name,
        });

        formData.append('mediaContent', mediaFile);
        formData.append('screenId', screen.screenId);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
      });
    });

    formData.append('mediaMappings', JSON.stringify(mediaMappings));

    formData.append('slotSize', '30');
    formData.append('extraSlotSize', '0');

    this.campaignService
      .campaignUploadMedia(this.campaignId, formData)
      .subscribe(
        (response) => {
          console.log('Media uploaded successfully', response);
          this.router.navigate(['/campaign']);
          this.isUploading = false;
        },
        (error) => {
          console.error('Error uploading media', error);
          this.isUploading = false;
        }
      );
  }

  toggleSelection(screenId: string) {
    const screen = this.campaignPlaylistMediaData.find(
      (item) => item.screenId === screenId
    );

    if (screen) {
      screen.isSelected = !screen.isSelected;

      if (screen.isSelected) {
        if (!this.selectedScreens.includes(screenId)) {
          this.selectedScreens.push(screenId);
        }
      } else {
        const index = this.selectedScreens.indexOf(screenId);
        if (index > -1) {
          this.selectedScreens.splice(index, 1);
        }
      }
    }
    this.isAllSelected = this.campaignPlaylistMediaData.every(
      (screen) => screen.isSelected
    );
    console.log('inmap screen', this.selectedScreens);
    this.cdr.detectChanges();
  }

  toggleSelectAll() {
    this.isAllSelected = !this.isAllSelected;
    if (this.isAllSelected) {
      this.campaignPlaylistMediaData.forEach((screen) => {
        screen.isSelected = true;
        if (!this.selectedScreens.includes(screen.screenId)) {
          this.selectedScreens.push(screen.screenId);
        }
      });
    } else {
      this.campaignPlaylistMediaData.forEach((screen) => {
        screen.isSelected = false;
      });
      this.selectedScreens = [];
    }

    this.cdr.detectChanges();
  }

  getSelectedCount(): number {
    return this.selectedScreens.length;
  }

  clearSelection() {
    this.isAllSelected = false;
    this.campaignPlaylistMediaData.forEach((screen) => {
      screen.isSelected = false;
      screen.mediaForDateRanges = [];
    });
    this.selectedScreens = [];
    this.cdr.detectChanges();
  }

  onDeleteMedia(screenId: string, rangeToDelete: any) {
    const screenMedia = this.campaignPlaylistMediaData.find(
      (screen) => screen.screenId === screenId
    );

    if (screenMedia) {
      screenMedia.mediaForDateRanges = screenMedia.mediaForDateRanges.filter(
        (range) => range !== rangeToDelete
      );

      console.log('Remaining date ranges:', screenMedia.mediaForDateRanges);

      if (screenMedia.mediaForDateRanges.length === 0) {
        screenMedia.isSelected = false;

        const index = this.selectedScreens.indexOf(screenId);
        if (index > -1) {
          this.selectedScreens.splice(index, 1);
        }
      }

      const allScreensUnchecked = this.campaignPlaylistMediaData.every(
        (screen) => screen.mediaForDateRanges.length === 0
      );

      if (allScreensUnchecked) {
        this.isAllSelected = false;
      }

      this.cdr.detectChanges();
    }
  }

  openDateRangePicker(): void {
    const dialogRef = this.dialog.open(DateRangePickerDialogComponent, {
      width: '400px',
      data: {
        campaignStartDate: this.campaignStartDate,
        campaignEndDate: this.campaignEndDate,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.startDate && result.endDate) {
        const customRange = `${this.formatDate(
          result.startDate
        )} - ${this.formatDate(result.endDate)}`;
        this.availableDateRanges.push(customRange);

        const remainingRange = this.calculateRemainingDateRange(result.endDate);
        console.log('remaining date', remainingRange, result.endDate);
        if (remainingRange) {
          this.availableDateRanges.push(remainingRange);
        }

        this.selectedDateRange = customRange;
      }
    });
  }

  reformatDate(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  calculateRemainingDateRange(customEndDate: Date): string | null {
    const campaignEnd = new Date(this.reformatDate(this.campaignEndDate));
    const nextDay = new Date(customEndDate);
    nextDay.setDate(customEndDate.getDate() + 1);

    if (nextDay <= campaignEnd) {
      return `${this.formatDate(nextDay)} - ${this.formatDate(campaignEnd)}`;
    }
    return null;
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  isDefaultRange(): boolean {
    const defaultRange = `${this.campaignStartDate} - ${this.campaignEndDate}`;
    return this.selectedDateRange === defaultRange;
  }

  checkDefaultDateRange() {
    if (this.isDefaultRange()) {
      console.log('Default date range is selected');
    } else {
      console.log('Custom date range selected');
    }
  }

  canUpload(): boolean {
    return this.campaignPlaylistMediaData.some((screen) =>
      screen.mediaForDateRanges.find((screen) => screen.mediaFile)
    );
  }

  areAllScreensUploaded(): boolean {
    return this.campaignPlaylistMediaData.every((screen) =>
      this.isMediaUploadedForDateRange(screen)
    );
  }

  isMediaUploadedForDateRange(screen: any): boolean {
    const [startDate, endDate] = this.selectedDateRange.split(' - ');
    const mediaRange = screen.mediaForDateRanges.find(
      (range: any) => range.startDate === startDate && range.endDate === endDate
    );
    return mediaRange && mediaRange.uploaded;
  }
}
