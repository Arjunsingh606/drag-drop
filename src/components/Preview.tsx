import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/gallary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface ImageProps {
    images: any[];
    preview: string[];
    index: number;
}

const Preview: React.FC<ImageProps> = ({ images, preview, index }) => {
    const [show, setShow] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const handleIncreaseSlider = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === preview.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleDecreaseSlider = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? preview.length - 1 : prevIndex - 1
        );
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleImageClick = (index: number) => {
        handleShow();
        setCurrentImageIndex(index);
    };

    return (
        <div>
            <div className="preview-button">
                <Button
                    variant="primary"
                    onClick={() => handleImageClick(index)}
                    className="drag-drop-modal list-preview-button preview-button"
                >
                    Preview
                </Button>
            </div>
            <Modal show={show} onHide={handleClose} className="drag-drop-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Image Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {preview.length > 0 ? (
                        <div className="preview-modal-img">
                            <img src={preview[currentImageIndex]} alt="Loading" />
                        </div>
                    ) : (
                        ""
                    )}
                    {images &&
                        images.map((image) => {
                            return (
                                <div className="modal-image-name" key={image.id}>
                                    {preview[currentImageIndex] === image.image ? (
                                        <h5>{image.name}</h5>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            );
                        })}
                </Modal.Body>
                <Modal.Footer className="preview-modal-btn">
                    <div className="next-prev-btn">
                        <Button
                            onClick={handleDecreaseSlider}
                            disabled={preview.length <= 1 || currentImageIndex === 0}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </Button>
                        <Button
                            onClick={handleIncreaseSlider}
                            disabled={
                                preview.length <= 1 || currentImageIndex === preview.length - 1
                            }
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Preview;
