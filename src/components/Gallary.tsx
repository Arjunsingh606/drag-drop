import React, { useState } from "react";
import { Image, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/gallary.css";
import Preview from "./Preview";
import { ImageFile } from "../interFace/ImageFileInterFace";

interface ImageProps {
    images: ImageFile[];
    preview: string[];
    handleDeleteImage: (index: number) => void;
    onCheckChange: (imageId: string) => void;
}

const Gallery: React.FC<ImageProps> = ({ images, preview, handleDeleteImage, onCheckChange }) => {
    const [isHovering, setIsHovering] = useState<number | null>(null);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const handleMouseOver = (index: number) => {
        setIsHovering(index);
    };

    const handleMouseOut = () => {
        setIsHovering(null);
    };

    const toggleImageSelection = (imageId: string) => {
        const isSelected = selectedImages.includes(imageId);

        if (isSelected) {
            setSelectedImages((prevSelected) =>
                prevSelected.filter((id) => id !== imageId)
            );
        } else {
            setSelectedImages((prevSelected) => [...prevSelected, imageId]);
        }
    };

    return (
        <>
            <div className="gallery">
                {images &&
                    images.map((item: any, index: number) => (
                        <div className="image-item" key={index}
                            onMouseOver={() => handleMouseOver(index)}
                            onMouseOut={handleMouseOut}
                        >
                            <div className={`uploaded-img ${isHovering === index ? "hovered" : ""} ${selectedImages.includes(item.id || "") ? "selected" : ""}`} >
                                <Image src={item?.image} alt="Uploading.." className="img-fluid" />
                                {isHovering === index && (
                                    <div className="hover-content">
                                        <div className="hover-item">
                                            <div className="checked-option">
                                                <Form.Check
                                                    checked={selectedImages.includes(item.id || "")}
                                                    onChange={() => {
                                                        onCheckChange(item.id);
                                                        toggleImageSelection(item.id || "");
                                                    }}
                                                />
                                                <Button variant="primary" className="delete-icon" onClick={() => handleDeleteImage(index)} >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </div>
                                            <div className="preview-button">
                                                <Preview images={images} preview={preview} index={index} />
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                            <p>{item.name}</p>
                        </div>
                    ))}

            </div>
            {images.length === 0 ? <h4 className="empty-list">Image does not found !!!</h4> : ""}
        </>

    );
};

export default Gallery;