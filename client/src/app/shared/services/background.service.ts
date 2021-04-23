import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "app/appConfig.service";
import { IBackground } from "app/shared/interfaces/ui.interfaces";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class BackgroundService {
    private api: string = "";
    private resource = "background";
    private setConfig() {
        const api = this.appConfig.config["api"];
        this.api = api ? `${api}${this.resource}/` : "";
    }
    constructor(private http: HttpClient, private appConfig: AppConfigService) {
        this.setConfig();
    }
    public createBackground(background: IBackground) {
        return this.http.post(this.api, background);
    }

    public updateBackground(id: string, background: IBackground) {
        return this.http.put(this.api + id, background);
    }

    public getAllBackground() {
        return this.http.get(this.api);
    }

    public getOneBackground(id: string) {
        return this.http.get(this.api + id);
    }

    public deleteBackground(id: string) {
        return this.http.delete(this.api + id);
    }

    public uploadFile(image: any) {
        return this.http.post(this.api + "upload", image);
    }

    public getProductQuery(key: string, value: string) {
        return this.http.get(this.api + "?" + key + "=" + value);
    }
}
