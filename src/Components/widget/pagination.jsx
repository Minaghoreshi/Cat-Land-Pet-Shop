import React from "react";
import { Pagination } from "flowbite-react";
export const PaginationComponent = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        className="overflow-hidden rounded-none"
        layout="pagination"
        currentPage={currentPage}
        totalPages={totalPages} // Replace this with the actual total number of pages
        onPageChange={onPageChange}
        previousLabel="قبلی"
        nextLabel="بعدی"
      />
    </div>
  );
};
