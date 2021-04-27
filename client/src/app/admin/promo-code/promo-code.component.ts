import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPromo } from 'app/shared/interfaces/ui.interfaces';
import { PromoService } from 'app/shared/services/promo.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.scss']
})
export class PromoCodeComponent implements OnInit {
  public discount: string = '';
  public isCreatePromo: boolean = false
  public promoTable;
  public promo: IPromo
  public formPromo = new FormGroup({
    code: new FormControl(""),
    discountPercent: new FormControl(""),
    discountPrice: new FormControl(""),
    exprireDate: new FormControl(""),
    condition: new FormControl("")
  });
  constructor(
    private promoService: PromoService
  ) { }

  ngOnInit(): void {
    this.getAllBackground()
  }

  createPromo(formPromo: FormGroup) {
    this.promoService.createPromo(formPromo.value).pipe(tap((data: IPromo[]) => {
      this.isCreatePromo = false;
      this.getAllBackground()
    })).subscribe()
  }

  public getAllBackground() {
    this.promoService
      .getAllPromo()
      .pipe(tap((data: IPromo[]) =>
        this.promoTable = data
      ))
      .subscribe();
  }

  public selectPromo(promo) {
    this.promo = promo
  }

  public checkStatusCode(exprireDate) {
    var date1 = new Date(exprireDate);
    var date2 = new Date();
    return date2 < date1 ? false : true
  }
}
