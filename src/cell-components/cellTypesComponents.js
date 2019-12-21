import ItemNameCellComponent from "./item-name-cell/ItemNameCell";
import ImagePreviewCellComponent from "./image-preview-cell/ImagePreviewCell";
import NumericCellComponent from "./numeric-cell/NumericCell";
import CalculatedCellComponent from "./calculated-cell/CalculatedCell";

const typesIndex = {
  name: ItemNameCellComponent,
  imagePreview: ImagePreviewCellComponent,
  numeric: NumericCellComponent,
  calculated: CalculatedCellComponent
};

export default typesIndex;
