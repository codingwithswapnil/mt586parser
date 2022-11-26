import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
	// Variable to store shortLink from api response
	shortLink: string = "";
	loading: boolean = false; // Flag variable
	file: any;
	uploadDisabled: boolean = true;

	parsedData: object = {};

	// Inject service
	constructor(private fileUploadService: FileUploadService, public dialog: MatDialog) { }

	ngOnInit(): void {
	}

	// On file Select
	onChange(event: any) {
		this.file = event.target.files[0];

		this.uploadDisabled = false;
	}

	openDialog() {
		this.parsedData = {
			bic: "Ava-Bioggio",
			bu: "Ava-Bioggio",
			container_key: "23456781",
			currency: ["USD"],
			dtc: "120",
			externalRef: "19zh1777/123456",
			internalRef: "civc/1233456",
			isin: ["US40434L1052", "US42824C1099"],
			quantity: [1, 10, 100]
		};

		const dialogRef = this.dialog.open(PopupFormComponent, {
			data: this.parsedData,
		});

		dialogRef.afterClosed().subscribe((result: any) => {
			console.log(`Dialog result: ${result}`);
		});
	}

	// OnClick of button Upload
	onUpload() {
		this.loading = !this.loading;
		console.log(this.file, 'this.file');

		this.parsedData = {
			bic: "Ava-Bioggio",
			bu: "Ava-Bioggio",
			container_key: "23456781",
			currency: ["USD"],
			dtc: "120",
			externalRef: "19zh1777/123456",
			internalRef: "civc/1233456",
			isin: ["US40434L1052", "US42824C1099"],
			quantity: [1, 10, 100]
		};

		this.openDialog();

		this.loading = false;

		// this.fileUploadService.upload(this.file).subscribe(
		// 	(event: any) => {
		// 		console.log(event, 'event')
		// 		if (typeof (event) === 'object') {
		// 			this.shortLink = event.link;
		// 			this.loading = false;
		// 		}

		// 		this.openDialog();
		// 	}
		// );
	}
}
