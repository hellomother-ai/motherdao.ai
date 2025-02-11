import React from "react";

/** Utility hook to handle array pagination */
export const usePagination = <T>(data: T[], _rowsPerPage = 10) => {
  const [selectedPage, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(_rowsPerPage);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const onSeeAll = () => {
    setRowsPerPage(rowsPerPage === -1 ? _rowsPerPage : -1);
    setPage(0);
  };

  const totalRows = data?.length || 0;
  const totalPages = Math.ceil(totalRows / Math.abs(rowsPerPage));

  //Used to make pages consistent by having the same number of rows
  const emptyRows =
    selectedPage > 0
      ? Math.max(0, (1 + selectedPage) * rowsPerPage - totalRows)
      : 0;

  const rows =
    rowsPerPage > 0
      ? data?.slice(
          selectedPage * rowsPerPage,
          selectedPage * rowsPerPage + rowsPerPage,
        )
      : data;

  return {
    rows,
    selectedPage,
    emptyRows,
    rowsPerPage,
    totalPages,
    totalRows,
    handleChangePage,
    onSeeAll,
    showPagination: totalRows > rowsPerPage,
    isShowingAll: rowsPerPage === -1,
  };
};
