export class ChildBook {
    public id_borrowed: string;
    public date_borrowd: Date;
    public date_return: Date;

    constructor(id?: string, dateB?: Date, dateR?: Date){
        this.id_borrowed = id || '';
        this.date_borrowd = dateB || new Date();
        this.date_return = dateR || new Date();
    }
}
