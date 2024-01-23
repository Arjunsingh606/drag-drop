import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/gallary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { PreviewImage, ImageFile } from "../interFace/ImageFileInterFace";

interface ImageProps {
    images: ImageFile[];
    preview: PreviewImage[];
    id: number
}

const Preview: React.FC<ImageProps> = ({ images, preview, id }) => {
    const [show, setShow] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const handleIncreaseSlider = () => {
        setCurrentImageIndex((id) =>
            id === preview.length - 1 ? 0 : id++
        );
    };

    const handleDecreaseSlider = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? preview.length - 1 : prevIndex - 1
        );
    };
    console.log(currentImageIndex, "======>080988")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleImageClick = (id: number) => {
        handleShow();
        setCurrentImageIndex(id);
    };
    return (
        <div>
            <div className="preview-button">
                <Button
                    variant="primary"
                    onClick={() => handleImageClick(id)}
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
                    {preview.length > 0 && (
                        <div className="preview-modal-img">
                            {preview && preview.map((elem: PreviewImage) => {
                                return (
                                    <div key={elem.id}>
                                        {elem.id === id && <div>
                                            <img src={elem.image} alt="Loading" />
                                            <h5>{elem.name}</h5>
                                            <h5>{(elem.size / 1024).toFixed(2)} KB</h5>
                                        </div>}
                                    </div>
                                )
                            })}
                        </div>
                    )}

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
