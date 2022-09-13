export class Paging {
  data: any;
  total: number;
}

export class PagingInput {
  filterlist: {};
  select: {};
  sortlist: {};
  currentPage: number = 0;
  skip: number = 0;
  limit: number = 0;
}
