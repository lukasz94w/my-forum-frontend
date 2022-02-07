import {Component, Input} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-user-profile-settings-avatar',
  templateUrl: './user-profile-settings-avatar.component.html',
  styleUrls: ['./user-profile-settings-avatar.component.css']
})
export class UserProfileSettingsAvatarComponent {

  @Input() username: string = ''
  @Input() profilePic: [] = [];
  @Input() isUserBanned: boolean = false;

  isImageCorrect: boolean = true;
  whyIsImageNotCorrect: string = '';
  isAllowedImageToUpload: boolean = false;

  imageChangedEvent: any = '';
  loadedImage: File = {} as File;

  constructor(private userService: UserService) {
  }

  onUpload() {
    const imageAsRequestBody = new FormData();
    imageAsRequestBody.append('image', this.loadedImage);

    this.userService.changeProfilePic(imageAsRequestBody).subscribe(
      () => {
        alert("Picture changed")
        this.reloadPage();
      },
      () => {
        alert("Fail during changing. Try again later")
      }
    )
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.isImageCorrect = true;
    const selectedFile = event.target.files[0];

    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!(selectedFile && acceptedImageTypes.includes(selectedFile['type']))) {
      this.isImageCorrect = false;
      this.whyIsImageNotCorrect = 'Only images are allowed'
      this.isAllowedImageToUpload = false;
      return;
    }

    const allowedFileSizeInMb = 0.2;
    const fileSizeInMb = selectedFile.size / 1024 / 1024;
    if (fileSizeInMb > allowedFileSizeInMb) {
      this.isImageCorrect = false;
      this.whyIsImageNotCorrect = 'Too much size of file (max 0.2MB)'
      this.isAllowedImageToUpload = false;
      return;
    }

    const allowedMinWidthAndHeightInPx = 250;
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    Img.src = URL.createObjectURL(selectedFile);
    Img.onload = (e: any) => {
      const imageHeight = e.path[0].height;
      const imageWidth = e.path[0].width;
      if ((imageWidth || imageHeight) < allowedMinWidthAndHeightInPx) {
        this.isImageCorrect = false;
        this.whyIsImageNotCorrect = 'Min. width/height is 256 pixels'
        this.isAllowedImageToUpload = false;
        return;
      }
    }

    this.isAllowedImageToUpload = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.loadedImage = this.convertBase64ToFile(event.base64, this.username)
  }

  convertBase64ToFile(data: any, filename: any) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
  }

  reloadPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
