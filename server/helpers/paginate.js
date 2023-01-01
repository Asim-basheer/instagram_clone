import paginate from 'jw-paginate';

// to handle paginate logic
export function paginateLogic(pageNumber, data) {
  const page = parseInt(pageNumber) || 1,
    pager = paginate(data.length, page, 10),
    pageOfItems = data.slice(pager.startIndex, pager.endIndex + 1);

  return { pager, pageOfItems };
}
