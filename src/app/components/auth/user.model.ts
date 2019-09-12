import { EditProfile } from '../../models/edit-profile/edit-profile.model';

export class User {
    constructor(
        public email: string,
        public id: string,
        private token: string,
        private tokenExpirationDate: Date,
    ) {}

    get authToken() {
        if (
            !this.tokenExpirationDate ||
            new Date() > this.tokenExpirationDate
        ) {
            return null;
        }
        return this.token;
    }
}
