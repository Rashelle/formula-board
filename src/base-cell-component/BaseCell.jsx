import React from "react";
import cellTypesIndex from "../cell-components/cellTypesComponents";
import "./BaseCell.scss";

class BaseCell extends React.Component {
  updateColumnData = columnDataChanges => {
    const { columnData } = this.props;
    const { id: columnId } = columnData;

    this.props.updateColumnData(columnId, columnDataChanges);
  };

  render() {
    const { columnsData, columnData, value, itemCellValues } = this.props;
    const { columnType } = columnData;
    const cellRendererProps = {
      columnsData,
      columnData,
      value,
      updateColumnData: this.updateColumnData
    };
    const CellRenderer = cellTypesIndex[columnType];

    if (columnData.allItemCellValuesRequired) {
      cellRendererProps.itemCellValues = itemCellValues;
    }

    return (
      <div className="cell-container">
        <CellRenderer {...cellRendererProps} />
      </div>
    );
  }
}

export default BaseCell;
