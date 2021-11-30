import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private apiServerUrl = environment.apiBaseUrl;

  selectedFile: File = {} as File;
  retrievedResponse: any;
  retrievedImage: any;
  base64Data: any;

  imageError: string = '';
  isAllowedToUpload: boolean = false;

  ngOnInit(): void {

    this.httpClient.get(`${this.apiServerUrl}/user/getProfilePic`).subscribe(
      (data) => {
        this.retrievedResponse = data;
        this.base64Data = this.retrievedResponse.rawData;
        console.log(this.base64Data)
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        console.log(this.retrievedImage);
      }
    )
  }

  constructor(private userService: UserService, private httpClient: HttpClient) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imageError = '';

    console.log(event.target.files[0].size)

    const max_size = 0.2; //Mb

    if (this.selectedFile.size / 1024 / 1024 > max_size) {
      this.imageError = 'Too much size of file. Maximum size: ' + max_size + 'Mb';
      return;
    }

    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    if (!(this.selectedFile && acceptedImageTypes.includes(this.selectedFile['type']))) {
      this.imageError = 'Only images are allowed!'
      return;
    }

    this.isAllowedToUpload = true;

  }

  // onUpload() {
  //   this.userService.updateProfilePic(this.selectedFile).subscribe(
  //     (response) => {
  //       // if(response.status === 200) {
  //       //   console.log("success")
  //       // }
  //       // else {
  //       //   console.log("error")
  //       // }
  //     }
  //   );
  // }

  onUpload() {

    let body = new FormData();
    console.log(this.croppedImage)
    console.log(this.testFile)
    console.log(this.selectedFile)

    alert(this.testFile.size)

    body.append('image', this.testFile);
    this.httpClient.post(`${this.apiServerUrl}/user/updateProfilePic`, body).subscribe(
      (data) => {
        console.log("success")
      }
    );
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  testFile: File = {} as File;


  fileChangeEvent(event: any): void {
    // this.imageError = 'Only images are allowed!'
    // return;
    this.imageChangedEvent = event;
    // this.testFile = event.target.files[0];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // let File = base64ToFile(this.croppedImage);
    // file: File = new File([File], "image");

    this.testFile = this.convertBase64ToFile(event.base64, this.imageChangedEvent.target.files[0].name)

  }
  imageLoaded(image: LoadedImage) {
    alert(image.original.size.width)
    // this.selectedFile = image.original.base64;
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    alert("FUCK YOU")

    // show message
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

    return new File([u8arr], filename, { type: mime });
  }

}
