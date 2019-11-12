export class Borrowed {

    // example
    // {
    //     "borrowed": {
    //         "_id": "duy-3-2019-11-12 14:09:15.876185",
    //         "username": "duy",
    //         "bookId": "3",
    //         "status": "Get book from librarian",
    //         "date_borrow": "2019-11-12 14:09:15.876000",
    //         "date_expire": "2019-11-16 14:09:15.876000",
    //         "date_return": "",
    //         "history_status": [
    //             {
    //                 "status": "Get book from librarian",
    //                 "date": "2019-11-12 14:09:15.876000"
    //             }
    //         ]
    //     }
    // }

    constructor(
        public _id?: string,
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
