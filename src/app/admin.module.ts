import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ContentAudioComponent } from './components/admin-page/content-audio/content-audio.component';
import { ContentVideoComponent } from './components/admin-page/content-video/content-video.component';
import { ContentBlogComponent } from './components/admin-page/content-blog/content-blog.component';
import { AdminContainerComponent } from './components/admin-page/admin-container/admin-container.component';
import { ContentImgComponent } from './components/admin-page/content-img/content-img.component';
import { UserComponent } from './components/admin-page/user/user.component';
import { UserDialogComponent } from './components/admin-page/user-dialog/user-dialog.component';
import { ContentHeaderComponent } from './components/admin-page/content-header/content-header.component';
import { UserHeaderComponent } from './components/admin-page/user-header/user-header.component';

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
