import React from "react";

class ItemNameCell extends React.Component {
  render() {
    const { value } = this.props;

    return <div>{value}</div>;
  }
}

export default ItemNameCell;
