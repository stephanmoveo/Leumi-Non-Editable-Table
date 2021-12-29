import React, { useState, useEffect, useMemo, useCallback } from "react";
import Styles from "../StyledComponents/MainTableWarp";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getColumns,
  confirmEdit,
} from "../../store/slices/dataSlice";
import ToolTip from "./ToolTip";
import AlertDialog from "../Table1/AlertDialog";

function StyledTable({ tableData, columnData, newDataCallback, mainTitle }) {
  const dispatch = useDispatch();

  const [datatoColumns] = useState(columnData);
  const data = useSelector((state) => state.dataReducer.data);
  const triggerConfirm = useSelector(
    (state) => state.dataReducer.triggerConfirm
  );
  useEffect(() => {
    if (triggerConfirm) {
      newDataCallback(data);
      dispatch(confirmEdit(false));
    }
  }, [triggerConfirm]);
  useEffect(() => {
    dispatch(getData(tableData));
    dispatch(getColumns(columnData));
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        id: "expander",
        Cell2: ({ row }) => {
          return row.original.addInfo ? (
            <ToolTip val={row.isExpanded ? "הסתר" : "הצג"}>
              <div>
                <span {...row.getToggleRowExpandedProps()}>
                  {" "}
                  {row.isExpanded ? "-" : "+"}
                </span>
              </div>
            </ToolTip>
          ) : null;
        },
      },
      ...datatoColumns,
    ],
    []
  );

  const renderRowSubComponent = useCallback(
    ({ row }) => ({
      values: row.original.addInfo && row.original.addInfo,
    }),
    []
  );

  return (
    <Styles>
      <Table
        mainTitle={mainTitle}
        columns={columns}
        renderRowSubComponent={renderRowSubComponent}
      />
      <AlertDialog/>
    </Styles>
  );
}

export default StyledTable;
