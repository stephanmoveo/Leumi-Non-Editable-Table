import React from "react";
import { FlexDiv, AddInfoP, AddInfoDiv } from "../StyledComponents/Elements";
import Tooltip from "@mui/material/Tooltip";

export default function TableBody({
  getTableBodyProps,
  page,
  prepareRow,
  isEditable,
  renderRowSubComponent,
  visibleColumns,
}) {
  const active = {
    backgroundColor: "#e7ebf2",
  };

  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          <>
            <tr {...row.getRowProps()} key={i} style={row.isExpanded && active}>
              {row.cells.map((cell, index) => {
                return cell.value === "" ? (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{ maxWidth: cell.column.width }}
                  >
                    {cell.render("Cell3")}
                  </td>
                ) : (
                  <Tooltip
                    arrow
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          maxWidth: cell.column.width,
                          marginBottom: "3px !important",
                          marginRight: "-12px !important",
                        },
                      },
                    }}
                    title={
                      cell.value !== undefined &&
                      cell.value.toString().length >= 14
                        ? cell.value
                        : ""
                    }
                  >
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      style={{ maxWidth: cell.column.width }}
                    >
                      {cell.render(isEditable)}
                    </td>
                  </Tooltip>
                );
              })}
            </tr>
            {row.isExpanded && renderRowSubComponent({ row }).values ? (
              <tr style={{ backgroundColor: "#f1f4f9" }}>
                <td colSpan={visibleColumns.length}>
                  <FlexDiv style={{ padding: "0 30px 0 0" }}>
                    {renderRowSubComponent({ row }).values.length > 0 &&
                      Object.keys(renderRowSubComponent({ row }).values[0]).map(
                        (keyString, i) => {
                          return (
                            <AddInfoDiv key={i}>
                              <AddInfoP style={{ fontWeight: "900" }}>
                                {keyString.split("_").join(" ")}
                              </AddInfoP>
                              <AddInfoP>
                                {
                                  renderRowSubComponent({ row }).values[0][
                                    keyString
                                  ]
                                }
                              </AddInfoP>
                            </AddInfoDiv>
                          );
                        }
                      )}
                  </FlexDiv>
                </td>
              </tr>
            ) : null}
          </>
        );
      })}
    </tbody>
  );
}
