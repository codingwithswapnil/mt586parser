import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

interface FormDataInterface {
  "container_key": string;
  "currency": string;
  "dtc": string;
  "externalRef": string;
  "internalRef": string;
  "isin": string;
  "bic": string;
  "bu": string;
  "trade": string;
  "settlement": string;
  "quantity": string;
}

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.scss']
})
export class PopupFormComponent implements OnInit {
  messageGenerated: boolean = false;
  parsedMessage: string = '';
  currencies: any;
  isin: any;
  quantities: any;

  swiftFormatObject = {
    container_key: {
      id: 'container_key',
      type: 'text',
      label: 'Container Key',
    },
    currency: {
      id: 'currency',
      type: 'select',
      label: 'Currency',
    },
    dtc: {
      id: 'dtc',
      type: 'text',
      label: 'DTC',
    },
    externalRef: {
      id: 'externalRef',
      type: 'text',
      label: 'External Ref',
    },
    internalRef: {
      id: 'internalRef',
      type: 'text',
      label: 'Internal Ref',
    },
    isin: {
      id: 'isin',
      type: 'select',
      label: 'ISIN',
    },
    bic: {
      id: 'bic',
      type: 'text',
      label: 'BIC',
    },
    bu: {
      id: 'bu',
      type: 'text',
      label: 'BU',
    },
    trade: {
      id: 'trade',
      type: 'text',
      label: 'Trade Date',
    },
    settlement: {
      id: 'settlement',
      type: 'text',
      label: 'Settlement Date',
    },
    quantity: {
      id: 'quantity',
      type: 'select',
      label: 'Quantity',
    },
  };

  swiftForm: any;
  
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: FormDataInterface,) { }

  ngOnInit(): void {

    this.currencies = this.data?.currency;
    this.isin = this.data?.isin;
    this.quantities = this.data?.quantity;

    this.swiftForm = this.formBuilder.group({
      container_key: [this.data?.container_key || ''],
      currency: [this.currencies[0] || ''],
      dtc: [this.data?.dtc || ''],
      externalRef: [this.data?.externalRef || ''],
      internalRef: [this.data?.internalRef || ''],
      isin: [this.isin[0] || ''],
      bic: [this.data?.bic || ''],
      bu: [this.data?.bu || ''],
      trade: [this.data?.trade || ''],
      settlement: [this.data?.settlement || ''],
      quantity: [this.quantities[0] || ''],
    });
  }

  generateMT586 = () => {

    let message = `SWIFT MT586 Message\n`;
    message += `Sequence A\n`;
    message += `:16R:GENL\n`;
    message += `:28E:00001/ONLY\n`;
    if (this.swiftForm.value.externalRef !== '') message += `:20C::SEME//${this.swiftForm.value.externalRef}\n`;
    message += `:23G:NEWM/ONLY\n`;
    message += `:98A:STAT//20221127\n`;
    message += `:22F:CODE//DELT\n`;
    if (this.swiftForm.value.trade !== '') message += `:98A::TRAD//${this.swiftForm.value.trade}\n`;
    if (this.swiftForm.value.settlement !== '') message += `:98A::SETT//${this.swiftForm.value.settlement}\n`;
    if (this.swiftForm.value.isin !== '') message += `:35B:ISIN ${this.swiftForm.value.isin}\n`;
    if (this.swiftForm.value.quantity !== '') message += `:36B::SETT//UNIT//${this.swiftForm.value.quantity}\n`;
    if (this.swiftForm.value.dtc !== '') message += `:97A::SAFE//${this.swiftForm.value.dtc}\n`;
    if (this.swiftForm.value.bic !== '') message += `:95P::SELL//${this.swiftForm.value.bic}\n`;
    if (this.swiftForm.value.container_key !== '') message += `:97A::SAFE//${this.swiftForm.value.container_key}\n`;

    // if (this.swiftForm.value.currency !== '') message += `${this.swiftForm.value.currency}\n`;
    // if (this.swiftForm.value.internalRef !== '') message += `${this.swiftForm.value.internalRef}\n`;
    // if (this.swiftForm.value.bu !== '') message += `${this.swiftForm.value.bu}\n`;

    // after validation, set the following
    this.messageGenerated = true;
    this.parsedMessage = message;
  }

  gotoForm = () => {
    // after validation, set the following
    this.messageGenerated = false;
  }

  onSubmit(): void {
    console.warn('Your order has been submitted', this.swiftForm.value);

    this.generateMT586();
  }
}
