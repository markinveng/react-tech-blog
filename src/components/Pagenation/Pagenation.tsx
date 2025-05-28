type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps): JSX.Element {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>≪</button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>＜</button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>＞</button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>≫</button>
    </div>
  );
}