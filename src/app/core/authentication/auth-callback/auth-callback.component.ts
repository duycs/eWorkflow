import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
    selector: 'app-auth-callback',
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

    error!: boolean;

    constructor(private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute) { }

    async ngOnInit() {

        // check for error
        var errIndex = this.route?.snapshot.fragment?.indexOf('error') ?? 0;

        console.log("errIndex", errIndex);

        if (errIndex >= 0) {
            this.error = true;
            return;
        }
        
        await this.authService.completeAuthentication();
        this.router.navigate(['/account/user']);
    }
}