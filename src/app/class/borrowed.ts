export class Borrowed {
    constructor(
        public username?: string,
        public bookId?: number,
        public status?: string,
        public date_borrow?: Date,
        public date_expire?: Date,
        public date_return?: Date,
        public history_status?: Array<string>,
        public fee?: number,
        public paied?: number
    ) {}
}
