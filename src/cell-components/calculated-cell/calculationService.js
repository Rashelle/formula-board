class CalculationService {
  static calculateCellResult(calculationString, itemCellValues) {
    calculationString = interpolateReferencedData(
      calculationString,
      itemCellValues
    );

    const argsStartIndex = calculationString.indexOf("(");
    const argsEndIndex = calculationString.indexOf(")");
    const functionName = calculationString.substring(0, argsStartIndex);

    if (!functionName) return NaN;

    const operandsString = calculationString.substring(
      argsStartIndex + 1,
      argsEndIndex
    );
    const operands = operandsString.split(",").map(parseFloat);

    return calculateFunctionResult(functionName, operands[0], operands[1]);
  }

  static replaceColumnReferences(calculationString, columnReferencesMap) {
    return interpolateReferencedData(calculationString, columnReferencesMap, {
      keepWrapper: true
    });
  }
}

// This method will remain agnostic to recursive calculations in the future
function interpolateReferencedData(calculationString, valuesMap, options = {}) {
  const { keepWrapper } = options;
  let primitiveCalculationString = calculationString;
  Object.keys(valuesMap).forEach(columnId => {
    const wrappedColumnReference = `{${columnId}}`;
    let replacedValue = valuesMap[columnId];
    replacedValue = keepWrapper ? `{${replacedValue}}` : replacedValue;

    primitiveCalculationString = primitiveCalculationString.replace(
      wrappedColumnReference,
      replacedValue
    );
  });

  return primitiveCalculationString;
}

function calculateFunctionResult(functionName, firstOperand, secondOperand) {
  switch (functionName) {
    case "MULTIPLY": {
      return firstOperand * secondOperand;
    }
    case "DIVIDE": {
      return firstOperand / secondOperand;
    }
    case "POWER": {
      return Math.pow(firstOperand, secondOperand);
    }
    default: {
      return null;
    }
  }
}

export default CalculationService;
