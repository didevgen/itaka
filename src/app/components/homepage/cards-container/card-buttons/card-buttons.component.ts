import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteDataService } from 'src/app/services/delete-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, from } from 'rxjs';

@Component({
    selector: 'ita-card-buttons',
    templateUrl: './card-buttons.component.html',
    styleUrls: ['./card-buttons.component.scss'],
})
export class CardButtonsComponent implements OnInit {
    @Input() likes: number;
    @Input() dislikes: number;
    @Input() postId: string;

    constructor(
        private router: Router,
        private deleteData: DeleteDataService,
        private snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.likes === undefined ? (this.likes = 0) : (this.likes = this.likes);
        this.dislikes === undefined
            ? (this.dislikes = 0)
            : (this.dislikes = this.dislikes);
    }

    public deleteContent(postId: string): void {
        this.deleteData
            .deleteData(postId)
            .subscribe(
                () => setTimeout(() => this.redirectToHomePage(), 1500),
                error => this.openSnackBar(error),
                () => this.openSnackBar('Successfully deleted'),
            );
    }

    private redirectToHomePage(): Observable<any> {
        return from(this.router.navigate(['']));
    }

    private openSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 1000,
        });
    }

    public isUserPage(): boolean {
        return this.router.url === '/userPage';
    }
}
