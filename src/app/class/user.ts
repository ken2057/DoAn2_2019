import { Borrowed } from './borrowed';

export class User {
    constructor(
        public username?: string,
        public password?: string,
        public email?: string,
        public history_borrowed?: Array<Borrowed>,
        public role?: string,
        public birth?: Date,
        public address?: string,
        public date_created?: Date,
        public date_expire?: Date,
        public active?: boolean,
        public account_point?: string
    ) {}
}
