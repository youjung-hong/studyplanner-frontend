import React from 'react';

type PaginationProps = {
  currentPage: number, 
  totalPages: number,
  onClickPageNumber: (page: number) => void,
}
export function Pagination({
    currentPage, 
    totalPages,
    onClickPageNumber,
  }: PaginationProps) {
  let startPage = Math.floor(currentPage/10) * 10 + 1;
  let endPage = Math.min(startPage + 9, totalPages)

  if (totalPages === 0) {
    startPage = endPage = 1;
  }

  const pages: number[] = [];

  for(let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return <div className="Pagination">
    {startPage >= 11 && 
    <span 
      onClick={() => {
          onClickPageNumber(startPage - 1)
        }
      }
    >이전</span>}
    {pages.map(page => <span 
      key={page}
      onClick={() => {onClickPageNumber(page)}}
    >
      {page === currentPage ? <b>{page}</b> : page}
    </span>)}
    {endPage % 10 === 9 
      && totalPages > endPage 
      && <span onClick={() => onClickPageNumber(endPage + 1)}>다음</span>
    }
  </div>
}
