import React from "react";
import Modal from "react-modal";
import "./ImagePreviewCell.scss";

class ImagePreviewCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageModalOpen: false
    };
  }

  onOpenClick = () => {
    this.setState({ imageModalOpen: true });
  };

  closeImageModal = () => {
    this.setState({ imageModalOpen: false });
  };

  renderImageModal() {
    const { value } = this.props;
    const { imageModalOpen } = this.state;
    const { imageSrc } = value;

    return (
      <div id="imgPreviewModalContainer">
        <Modal isOpen={imageModalOpen} onRequestClose={this.closeImageModal}>
          <div className="image-preview-container">
            <button className="modal-close-btn" onClick={this.closeImageModal}>
              X
            </button>
            <img className="preview-img" src={imageSrc} />
          </div>
        </Modal>
      </div>
    );
  }

  render() {
    const { value } = this.props;

    if (value) {
      return (
        <>
          <div className="image-open-button" onClick={this.onOpenClick}>
            Open
          </div>
          {this.renderImageModal()}
        </>
      );
    }

    return <span>N/A</span>;
  }
}

export default ImagePreviewCell;
