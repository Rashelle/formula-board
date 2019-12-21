import React from "react";
import Column from "../column-component/Column";
import Item from "../item-component/Item";
import WorklistDataService from "../worklistDataService";
import Modal from "react-modal";
import "./Worklist.scss";

class Worklist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnsData: {},
      itemsData: {}
    };
  }

  componentDidMount() {
    const columnsData = WorklistDataService.getColumnsData();
    const itemsData = WorklistDataService.getItemsData();

    this.setState({ columnsData, itemsData });

    Modal.setAppElement("#worklist");
  }

  updateColumnData = (columnId, columnDataChanges) => {
    const { columnsData } = this.state;
    const newColumnData = { ...columnsData[columnId], ...columnDataChanges };
    const newColumnsData = { ...columnsData, [columnId]: newColumnData };

    this.setState({ columnsData: newColumnsData });
  };

  getSortedColumns() {
    const { columnsData } = this.state;

    return Object.values(columnsData).sort(
      (first, second) => first.position - second.position
    );
  }

  renderItem(item, sortedColumns) {
    const { columnsData } = this.state;
    const { id: itemId, cellValues } = item;

    return (
      <Item
        key={itemId}
        columnsData={columnsData}
        orderedColumns={sortedColumns}
        cellValues={cellValues}
        updateColumnData={this.updateColumnData}
      />
    );
  }

  renderColumn(column) {
    const { id: columnId, columnTitle } = column;

    return <Column key={columnId} title={columnTitle} />;
  }

  render() {
    const { itemsData } = this.state;
    const sortedColumns = this.getSortedColumns();

    return (
      <div id="worklist" className="worklist-container">
        <span className="worklist-title">Worklist</span>
        <div className="worklist-table">
          <div className="column-headers">
            {sortedColumns.map(column => this.renderColumn(column))}
          </div>
          <div className="worklist-items">
            {Object.values(itemsData).map(item =>
              this.renderItem(item, sortedColumns)
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Worklist;
