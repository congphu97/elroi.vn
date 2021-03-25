import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { IUser } from 'app/shared/interfaces/ui.interfaces';
import { forkJoin } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { OrdersService } from '../services/orders.service';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    public user: IUser
    public historyList
    constructor(private authService: AuthService, private productService: ProductService, private orderService: OrdersService) { }

    ngOnInit() {
        this.getUser()
    }
    private getUser() {
        console.log(this.authService.getAuthenticated())
        const user = this.authService.getAuthenticated()
        if (!user) return;
        this.authService.getUser({ username: user.username }).
            pipe(tap((user: IUser[]) => this.user = user[0]),
                map((user: IUser[]) => user[0].history),
                flatMap((history: any) => forkJoin(
                    this.orderService.getOneOrder(history)
                )),
                tap((historyList) => this.historyList = historyList),
            ).
            subscribe();
        console.log(this.user)
    }
}
