import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Styles from "./Pagination.module.scss";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

function Pagination({ data, setCurrentData, itemsPerPage }) {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    if (data?.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentData(data?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);

  return (
    <ReactPaginate
      className={Styles.pagination}
      breakLabel="..."
      nextLabel={<GrFormNext />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel={<GrFormPrevious />}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
