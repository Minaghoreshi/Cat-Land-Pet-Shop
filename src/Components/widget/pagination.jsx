import React from "react";
import { Pagination } from "flowbite-react";
export const PaginationComponent = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  return (
    <div className="flex overflow-x-auto sm:justify-center fixed bottom-24">
      <Pagination
        className="overflow-hidden rounded-none"
        layout="pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        previousLabel="قبلی"
        nextLabel="بعدی"
      />
    </div>
  );
};
