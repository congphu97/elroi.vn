import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    
})

export class ComponentsComponent implements OnInit {
    model: NgbDateStruct;
    constructor( private renderer : Renderer2, private authService:AuthService) {}
    

    ngOnInit() {
        this.authService.setSubmit();
    }
    addCart() {
        localStorage.setItem('cart', JSON.stringify([1,2,3]))
        this.authService.setSubmit();

    }

}
