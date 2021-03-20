import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { IUser } from 'app/shared/interfaces/ui.interfaces';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    public user: IUser
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.getUser()
    }
    private getUser() {
        console.log(this.authService.getAuthenticated())
        const user = this.authService.getAuthenticated()
        if (!user) return;
        this.authService.getUser({ username: user.username }).
            pipe(tap((user: IUser[]) => this.user = user[0])).
            subscribe()
    }
}
