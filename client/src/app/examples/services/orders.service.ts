import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from 'app/shared/interfaces/ui.interfaces';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private baseUrl = 'http://localhost:8080/'
    private order = new Subject()
    constructor(private http: HttpClient) { }
    public createOrder(order: IOrder, username: string) {
        return this.http.post(this.baseUrl + "order", {
            order: order,
            username: username
        })
    }

    public updateOrder(id: string, order: IOrder) {
        return this.http.put(this.baseUrl + "order/" + id, order)
    }

    public getAllOrder() {
        return this.http.get(this.baseUrl + "order")
    }

    public getOneOrder(id: string) {
        return this.http.get(this.baseUrl + "order/" + id)
    }

    public deleteOrder(id: string) {
        return this.http.delete(this.baseUrl + "order/" + id)
    }

    public setSubmit(order) {
        this.order.next(order)
    }

    public getSubmit$$() {
        return this.order.asObservable()
    }
}
