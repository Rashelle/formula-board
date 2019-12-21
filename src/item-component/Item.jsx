import React from "react";
import BaseCell from "../base-cell-component/BaseCell";
import "./Item.scss";

class Item extends React.Component {
  renderCell(columnId, cellValue) {
    const { cellValues, columnsData, updateColumnData } = this.props;
    const columnData = columnsData[columnId];

    return (
      <div className="cell-container">
        <BaseCell
          columnsData={columnsData}
          columnData={columnData}
          value={cellValue}
          itemCellValues={cellValues}
          updateColumnData={updateColumnData}
        />
      </div>
    );
  }

  render() {
    const { orderedColumns, cellValues } = this.props;

    return (
      <div className="item-container">
        <div className="item-cells">
          {orderedColumns.map(column =>
            this.renderCell(column.id, cellValues[column.id])
          )}
        </div>
      </div>
    );
  }
}

export default Item;
