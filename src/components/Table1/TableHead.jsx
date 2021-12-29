import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ThDiv, SortByP } from "../StyledComponents/Elements";
export default function TableHead({ headerGroups }) {
  return (
    <thead>
      {headerGroups.map((headerGroup, i) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          key={i}
        >
          {headerGroup.headers.map((column) => {
            return (
              <th
                className="th-column"
                {...column.getHeaderProps(column.getSortByToggleProps())}
                onClick={() => column.canSort && column.toggleSortBy(!column.isSortedDesc)}
                style={{
                  width: column.id === "expander" ? "10px" : column.width,
                }}
              >
                <ThDiv>
                  <SortByP>{column.render("Header")}</SortByP>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </ThDiv>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
