import React, { useState } from "react";
import { useTable, usePagination, useSortBy, useExpanded } from "react-table";
import EditableCell from "./EditableCell";
import NonEditableCell from "./NonEditableCell";
import TablePagination from "./TablePagination";
import FooterBtn from "./FooterBtn";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableEditBtn from "./TableEditBtn";
import { TableWarp, FlexDivJusRight } from "../StyledComponents/Elements";
import {useDispatch, useSelector } from "react-redux";

const defaultColumn = {
  Cell: EditableCell,
  Cell2: NonEditableCell,
};
function Table({ columns, skipPageReset, renderRowSubComponent, checked }) {
  const [isEditable, setisEditable] = useState("Cell2");
  const [isinEditMode, setIsinEditMode] = useState(false);
  const data = useSelector((state) => state.dataReducer.data);
  const dispatch = useDispatch();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
    },
    useSortBy,
    useExpanded,
    usePagination
  );
  return (
    <>
      <TableEditBtn
        setisEditable={setisEditable}
        isEditable={isEditable}
        columns={columns}
        setIsinEditMode={setIsinEditMode}
        isinEditMode={isinEditMode}
      />
      <TableWarp>
        <table {...getTableProps()}>
          <TableHead headerGroups={headerGroups} />
          <TableBody
            checked={checked}
            getTableBodyProps={getTableBodyProps}
            page={page}
            prepareRow={prepareRow}
            isEditable={isEditable}
            renderRowSubComponent={renderRowSubComponent}
            visibleColumns={visibleColumns}
          />
        </table>
      </TableWarp>
      <FlexDivJusRight>
        {/* {isinEditMode && ( */}
          <FooterBtn
            setisEditable={setisEditable}
            setIsinEditMode={setIsinEditMode}
          />
        {/* )} */}
        <TablePagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageCount={pageCount}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      </FlexDivJusRight>
    </>
  );
}

export default Table;
