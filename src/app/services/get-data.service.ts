import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { GetUserIdService } from './get-user-id.service';
import { map} from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';
@Injectable({
    providedIn: 'root',
})
export class GetDataService {
     
    posiId : string;
    constructor(
        private db: AngularFirestore,
        private getUserIdService: GetUserIdService,
        
    ) {}
    render(media): void {
        this.db
            .collection('Posts')
            .get()
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    const posts = doc.data();
                    media.push(posts);
                });
            });
          
    }

    renderUserContent(userMedia): void {
        const userId = this.getUserIdService.getUserId();
        this.db
            .collection('Posts')
            .get()
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (userId === doc.data().userId) {
                        const posts = doc.data();
                        this.posiId = doc.data().postId
                        userMedia.push(posts);
                    }
                });
            });
    }

    // метод для выгрузки контента на карточку 
    renderCardContent(postId,obj): any {
         this.db
            .collection('Posts')
            .get()
            .subscribe(snapshot => {
                snapshot.docs.forEach(doc => {
                    if ( postId=== doc.data().postId) {
                        const posts = doc.data();
                        Object.assign(obj,posts)
                    }
                });
        });
    }

}
