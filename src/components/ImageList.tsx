import React, { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import Preview from "./Preview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ImageFile } from "../interFace/ImageFileInterFace";



interface ImageProps {
  images: ImageFile[];
  preview: string[];
  setImages: (value: any) => void;
  handleDeleteImage: (id: number) => void;
  onCheckChange: (imageId: string) => void;
}

const ImageList: React.FC<ImageProps> = ({ images, preview, setImages, handleDeleteImage, onCheckChange }) => {
  return (
    <div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th className="d-flex"><Form.Check  /> Name</th>
            <th>File size</th>
            <th>Modified date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {images &&
            images.map((image: any, index: number,) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="image-list-item">
                      <Form.Check onChange={() => onCheckChange(image.id)} />
                      <div className="list-images">
                        <img src={image.image} alt="loading" />
                      </div>
                      <div> {image.name}</div>
                    </div>
                  </td>
                  <td>{(image.size / 1024).toFixed(2)} KB</td>
                  <td>{image.lastModified}</td>
                  <td>
                    <div className="actions-list">
                      <Button variant="primary" className="delete-icon" onClick={() => handleDeleteImage(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      <Preview images={images} preview={preview} index={index} />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {images.length === 0 ? <h4 className="empty-list">Image does not found !!!</h4> : ""}
    </div>
  );
};

export default ImageList;
