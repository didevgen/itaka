import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeleteDataService } from 'src/app/services/delete-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'ita-card-buttons',
    templateUrl: './card-buttons.component.html',
    styleUrls: ['./card-buttons.component.scss'],
})
export class CardButtonsComponent {
    // @Input()
    public postId: string = 'sWALA5TVz0S73lICvowi';

    constructor(
        private router: Router,
        private deleteData: DeleteDataService,
        private snackBar: MatSnackBar,
    ) {}

    public isUserPage(): boolean {
        return this.router.url === '/userPage';
    }

    public deleteContent(postId: string): void {
        this.deleteData.deleteData(postId).subscribe(
            res => console.log(res),
            error => this.openSnackBar(error),
            () => {
                this.openSnackBar('Successfully deleted');
            },
        );
    }

    private openSnackBar(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 1000,
        });
    }
}
