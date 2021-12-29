import React, { useState } from "react";
import { useTable, usePagination, useSortBy, useExpanded } from "react-table";
import NonEditableCell from "./NonEditableCell";
import NewEditableCell from "./NewEditableCell";
import FooterBtn from "./FooterBtn";
import TableHead from "./TableHead";
import TableEditBtn from "./TableEditBtn";
import { TableWarp, FlexDivJusRight } from "../StyledComponents/Elements";
import { useSelector } from "react-redux";
import TableBody from "./TableBody";
const defaultColumn = {
  Cell2: NonEditableCell,
  Cell3: NewEditableCell,
};
function Table({
  columns,
  renderRowSubComponent,
  checked,
  mainTitle,
}) {
  // const [isEditable, setisEditable] = useState("Cell2");
  const [isinEditMode, setIsinEditMode] = useState(false);
  const data = useSelector((state) => state.dataReducer.data);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    gotoPage,
    visibleColumns,
    rows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useSortBy,
    useExpanded,
    usePagination
  );
  return (
    <>
      <TableEditBtn
        mainTitle={mainTitle}
        gotoPage={gotoPage}
        columns={columns}
        setIsinEditMode={setIsinEditMode}
      />
      <TableWarp>
        <table {...getTableProps()}>
          <TableHead headerGroups={headerGroups} />
          <TableBody
            checked={checked}
            getTableBodyProps={getTableBodyProps}
            rows={rows}
            prepareRow={prepareRow}
            renderRowSubComponent={renderRowSubComponent}
            visibleColumns={visibleColumns}
          />
        </table>
      </TableWarp>
      {isinEditMode && (
        <FooterBtn
          setIsinEditMode={setIsinEditMode}
        />
      )}
    </>
  );
}

export default Table;
