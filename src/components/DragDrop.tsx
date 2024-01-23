import React from "react";
import { useDropzone } from "react-dropzone";
import "../styles/gallary.css";

interface DragDropProps {
  handleFiles: (files: File[]) => void;
}

const DragDrop: React.FC<DragDropProps> = ({ handleFiles }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleFiles(acceptedFiles);
    },
  });

  const choosedFile = acceptedFiles.length;
  const imageName = acceptedFiles.map((file) => file.name);

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} accept="image/*" multiple />
        <p>
          Drag and drop or{" "}
          <span className="text-decoration-underline">
            <b>Choose your file {choosedFile === 0 ? "" : choosedFile === 1 ? imageName : `${choosedFile}`} </b>
          </span>
        </p>
      </div>
    </section>
  );
};

export default DragDrop;











// import React, {useState, useCallback} from 'react';
// import { useDropzone } from 'react-dropzone';
// import '../styles/gallary.css';

// interface DragDropProps {
//   handleFiles: (files: any[]) => void;
// }

// const DragDrop: React.FC<DragDropProps> = ({ handleFiles }) => {

//   const onDrop = useCallback((acceptedFiles: Array<File>) => {
//     const file = new FileReader;
  
//     file.onload = function() {
//       handleFiles(acceptedFiles);
//     }
  
//     file.readAsDataURL(acceptedFiles[0])
//   }, [])


//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
//     onDrop
//   });

//   const choosedFile = acceptedFiles.length;
//   const imageName = acceptedFiles.map((file) => file.name)

//   return (
//     <section>
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...getInputProps()} accept="image/*" multiple />
//         <p>Drag and drop or <span className='text-decoration-underline'><b>Choose your file {choosedFile === 0 ? "" : (choosedFile === 1 ? imageName : `${choosedFile}`)} </b></span></p>
//       </div>
//     </section>
//   );
// };

// export default DragDrop;





























