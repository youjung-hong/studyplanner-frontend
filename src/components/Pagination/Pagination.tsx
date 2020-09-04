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
  const startPage = Math.floor(currentPage/10) * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages)
  const pages: number[] = [];

  for(let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return <div>
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
      {page === currentPage ? <b>{page}</b> : {page}}
    </span>)}
    {endPage % 10 === 9 
      && totalPages > endPage 
      && <span onClick={() => onClickPageNumber(endPage + 1)}>다음</span>
    }
  </div>
}
