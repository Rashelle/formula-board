class WorklistDataService {
  static getColumnsData() {
    const columnsDataMock = {
      name: {
        columnTitle: "Item Name",
        columnType: "name",
        id: "name",
        position: 0
      },
      "1": {
        columnTitle: "A.I Preview",
        columnType: "imagePreview",
        id: "1",
        position: 1
      },
      "2": {
        columnTitle: "Minutes From Scan",
        columnType: "numeric",
        id: "2",
        position: 2
      },
      "3": {
        columnTitle: "Urgency Level",
        columnType: "numeric",
        minimumValue: 1, // If we've had editing, then the validation would be based on these values
        maximumValue: 5,
        id: "3",
        position: 3
      },
      "4": {
        columnTitle: "Calculated Priority",
        columnType: "calculated",
        allItemCellValuesRequired: true,
        id: "4",
        position: 4
      }
    };

    return columnsDataMock;
  }

  static getItemsData() {
    const itemsDataMock = {
      "1": {
        id: "1",
        cellValues: {
          name: "Case #197503",
          "2": 3,
          "3": 2
        }
      },
      "2": {
        id: "2",
        cellValues: {
          name: "Case #860245",
          "1": {
            imageSrc: "/mock-data/860245.jpg"
          },
          "2": 21,
          "3": 5
        }
      },
      "3": {
        id: "3",
        cellValues: {
          name: "Case #195985",
          "1": {
            imageSrc: "/mock-data/195985.jpg"
          },
          "2": 45,
          "3": 3
        }
      }
    };

    return itemsDataMock;
  }
}

export default WorklistDataService;
