import React from "react";
import "./Column.scss";

class Column extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <div className="column-header-container">
        <div className="column-header">{title}</div>
      </div>
    );
  }
}

export default Column;
