import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ContentAudioComponent } from './content-audio/content-audio.component';
import { ContentVideoComponent } from './content-video/content-video.component';
import { ContentBlogComponent } from './content-blog/content-blog.component';
import { AdminContainerComponent } from './admin-container/admin-container.component';
import { ContentImgComponent } from './content-img/content-img.component';
import { UserComponent } from './user/user.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { UserHeaderComponent } from './user-header/user-header.component';

@NgModule({
    declarations: [
        ContentAudioComponent,
        ContentVideoComponent,
        ContentBlogComponent,
        AdminContainerComponent,
        ContentImgComponent,
        UserComponent,
        UserDialogComponent,
        ContentHeaderComponent,
        UserHeaderComponent,
    ],
    imports: [CommonModule, MaterialModule],
    exports: [
        ContentAudioComponent,
        ContentVideoComponent,
        ContentBlogComponent,
        AdminContainerComponent,
        ContentImgComponent,
        UserComponent,
        UserDialogComponent,
        ContentHeaderComponent,
        UserHeaderComponent,
    ],
})
export class AdminModule {}
