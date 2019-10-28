export class Book {

//   exemple
//   {
//     "_id": 1,
//     "name": "Hello world",
//     "author": "David",
//     "subject": [
//         "ab",
//         "cd"
//     ],
//     "books": [
//         "Lost by duy",
//         "Lost by duy - Date: 2019-10-24 21:00:01.833411",
//         "",
//         ""
//     ]
// }

  constructor(
    public isbn?: string,
    public name?: string,
    public author?: string,
    public subjects?: Array<string>,
    public books?: Array<string>,
    public image?: string
  ) {}
}
