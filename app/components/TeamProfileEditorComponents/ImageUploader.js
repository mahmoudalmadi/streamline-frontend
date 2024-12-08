import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageUploader = ({ allowMultiple, buttonMessage, images,setImages }) => {

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: `${file.name}-${Date.now()}`, // Unique ID for each file
      url: URL.createObjectURL(file),
    }));

    if (allowMultiple) {
      setImages((prevImages) => [...prevImages, ...newImages]);
    } else {
      setImages(newImages.slice(0, 1)); // Replace the existing image for single upload
    }
  };

  const handleRemoveImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setImages(reorderedImages);
  };

  return (
    <div>
      {/* Hidden file input */}
      <label
        className="font-bold bg-white border border-streamlineBlue text-streamlineBlue border-[1.5] rounded-full text-[15px] " 
        style={{
          display: "inline-block",
          padding: "10px 20px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        {buttonMessage}
        <input
          type="file"
          accept="image/*"
          multiple={allowMultiple}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </label>

      {/* Drag-and-Drop Container */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="image-list" direction="horizontal" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {/* Badge with Number */}

                      {allowMultiple && 
                        <div
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}
                      </div>}

                      {/* Image Preview */}
                      <img
                        src={image.url}
                        alt={`uploaded-${index}`}
                        style={{
                          width: "120px",
                          height: "auto",
                          objectFit: "contain",
                          borderRadius: "5px",
                        }}
                      />

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveImage(image.id)}
                        className="bg-streamlineBlue"
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          width: "20px",
                          height: "20px",
                          fontSize: "14px",
                        }}
                      >
                        X
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageUploader;
