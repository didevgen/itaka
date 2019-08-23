import { async, ComponentFixture } from '@angular/core/testing';

import { AdminContainerComponent } from './admin-container.component';

describe('AdminContainerComponent', () => {
    let component: AdminContainerComponent;
    let fixture: ComponentFixture<AdminContainerComponent>;

    beforeEach(async(() => {}));

    beforeEach(() => {
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
