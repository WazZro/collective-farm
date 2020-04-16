export interface PaginationComponent {
  pages: any[];
  currentPage: number;
  currentLimit: number;

  setPage(page: number);
  setPageLimit(limit: number);
}
