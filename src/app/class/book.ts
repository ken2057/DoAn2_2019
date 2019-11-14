export class Book {

  constructor(
    public isbn?: string,
    public name?: string,
    public author?: string,
    public subjects?: Array<string>,
    public books?: Array<string>,
    public image?: string,
    public deleted?: boolean,
    public year_released?: number,
    public publisher?: string,
    public price?: number
  ) {}
}
