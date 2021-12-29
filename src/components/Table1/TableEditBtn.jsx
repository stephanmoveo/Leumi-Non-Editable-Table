import React from "react";
import { EditBtn, FlexDiv } from "../StyledComponents/Elements.jsx";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ToolTip from "./ToolTip";
import { useDispatch } from "react-redux";
import { addRow, setIsDisable } from "../../store/slices/dataSlice.js";
export default function TableEditBtn({
  columns,
  setIsinEditMode,
  gotoPage,
  mainTitle,
}) {
  const dispatch = useDispatch();
  const pageZer0 = () => gotoPage(0);
  const addNewRow = () => {
    dispatch(setIsDisable());
    pageZer0();
    dispatch(addRow(columns));
    setIsinEditMode(true);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <FlexDiv>
        <ToolTip val={"הוספה"}>
          <EditBtn onClick={addNewRow}>
            <PersonAddIcon />
            {"הוספה"}
          </EditBtn>
        </ToolTip>
      </FlexDiv>
      <h1 style={{ textAlign: "right", margin: 0 }}>{mainTitle} </h1>
    </div>
  );
}
