import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.scss']
})
export class PromoCodeComponent implements OnInit {
  public discount: string = ''
  public formPromo = new FormGroup({
    code: new FormControl(""),
    discountPercent: new FormControl(""),
    discountPrice: new FormControl(""),
    exprireDate: new FormControl(""),
    condition: new FormControl("")
  });
  constructor() { }

  ngOnInit(): void {
  }

}
