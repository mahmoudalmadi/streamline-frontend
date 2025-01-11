"use client";

import React, { useState } from "react";

const ModalTemplate = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose} // Close modal when clicking on the background
    >
      <div
        className="relative bg-white rounded-lg shadow-lg p-4"
        style={{
          maxWidth: "90%",
          maxHeight: "95%",
          overflow: "auto", // Scrollable if content overflows
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-[8px] right-[12px] text-gray-600 hover:text-gray-900 font-bold"
          onClick={onClose}
        >
          X
        </button>

        {/* Modal Content */}
        <div style={{overflow:'hidden'}}>
        {children}
        </div>
      </div>
    </div>
  );
};

export default ModalTemplate;
