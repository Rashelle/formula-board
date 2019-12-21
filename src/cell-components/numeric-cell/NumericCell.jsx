import React from "react";

class NumericCell extends React.Component {
  render() {
    const { value } = this.props;

    return (
      <>
        <div>{value}</div>
      </>
    );
  }
}

export default NumericCell;
