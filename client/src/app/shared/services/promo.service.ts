import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "app/appConfig.service";
import { IPromo } from "app/shared/interfaces/ui.interfaces";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PromoService {
    private api: string = "";
    private resource = "promo";
    private setConfig() {
        const api = this.appConfig.config["api"];
        this.api = api ? `${api}${this.resource}/` : "";
    }
    constructor(private http: HttpClient, private appConfig: AppConfigService) {
        this.setConfig();
    }
    public createPromo(promo: IPromo) {
        return this.http.post(this.api, promo);
    }

    public updatePromo(id: string, promo: IPromo) {
        return this.http.put(this.api + id, promo);
    }

    public getAllPromo() {
        return this.http.get(this.api);
    }

    public getOnePromo(id: string) {
        return this.http.get(this.api + id);
    }

    public deletePromo(id: string) {
        return this.http.delete(this.api + id);
    }

    public uploadFile(image: any) {
        return this.http.post(this.api + "upload", image);
    }

    public getPromoQuery(key: string, value: string) {
        return this.http.get(this.api + "?" + key + "=" + value);
    }
}
