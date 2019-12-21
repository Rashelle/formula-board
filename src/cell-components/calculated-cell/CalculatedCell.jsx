import React from "react";
import CalculationService from "./calculationService";
import Modal from "react-modal";
import "./CalculatedCell.scss";

class CalculatedCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorOpen: false,
      calculationString: ""
    };
  }

  componentDidUpdate(prevProps) {
    const { columnData } = this.props;

    if (
      columnData.calculationString != prevProps.columnData.calculationString
    ) {
      const { calculationString } = columnData;
      const columnNamesById = this.getColumnNamesById();
      const displayCalculationString = CalculationService.replaceColumnReferences(
        calculationString,
        columnNamesById
      );

      this.setState({ calculationString: displayCalculationString });
    }
  }

  openEditor = () => {
    this.setState({ editorOpen: true });
  };

  getColumnNamesById() {
    const { columnsData } = this.props;
    const columnNamesById = {};

    Object.keys(columnsData).forEach(columnId => {
      columnNamesById[columnId] = columnsData[columnId].columnTitle;
    });

    return columnNamesById;
  }

  getColumnIdsByName() {
    const { columnsData } = this.props;
    const columnIdsByName = {};

    Object.keys(columnsData).forEach(columnId => {
      const columnName = columnsData[columnId].columnTitle;
      columnIdsByName[columnName] = columnId;
    });

    return columnIdsByName;
  }

  onEditorClose = () => {
    const { updateColumnData } = this.props;
    const { calculationString } = this.state;
    const columnIdsByName = this.getColumnIdsByName();
    const interpolatedCalculationString = CalculationService.replaceColumnReferences(
      calculationString,
      columnIdsByName
    );

    this.setState({ editorOpen: false });
    updateColumnData({
      calculationString: interpolatedCalculationString
    });
  };

  onCalculationStringChange = e => {
    const newCalcString = e.target.value;
    this.setState({ calculationString: newCalcString });
  };

  renderEditModal() {
    const { editorOpen, calculationString } = this.state;

    return (
      <Modal
        className="editor-modal"
        isOpen={editorOpen}
        onRequestClose={this.onEditorClose}
      >
        <div className="editor-container">
          <span>Enter the desired calculation:</span>
          <input
            className="editor-input"
            value={calculationString}
            onChange={this.onCalculationStringChange}
          />
        </div>
      </Modal>
    );
  }

  getCalculationResult() {
    const { columnData, itemCellValues } = this.props;
    const { calculationString } = columnData;

    let calculationResult;
    if (!calculationString) {
      calculationResult = "Click to edit";
    } else {
      calculationResult = CalculationService.calculateCellResult(
        calculationString,
        itemCellValues
      );
      if (isNaN(calculationResult)) {
        calculationResult = "Invalid Calculation";
      }
    }

    return calculationResult;
  }

  render() {
    const calculationResult = this.getCalculationResult();

    return (
      <>
        <div className="calculation-result" onClick={this.openEditor}>
          {calculationResult}
        </div>
        {this.renderEditModal()}
      </>
    );
  }
}

export default CalculatedCell;
