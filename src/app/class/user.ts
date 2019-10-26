import { Borrowed } from './borrowed';

export class User {
    constructor(
        public username?: string,
        public password?: string,
        public email?: string,
        public history_borrowed?: Array<Borrowed>
    ) {}
}
