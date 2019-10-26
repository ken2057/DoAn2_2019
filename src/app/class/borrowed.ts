export class Borrowed {
    constructor(
        public username?: string,
        public bookId?: number,
        public status?: string,
        public date_borrow?: Date,
        public date_expire?: Date
    ) {}
}
