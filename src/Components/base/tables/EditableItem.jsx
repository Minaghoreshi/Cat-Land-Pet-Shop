import React, { useState } from "react";

export const EditableItem = ({ initialValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isEdited, setIsEdited] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      setIsEdited(true);
    }
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      {isEditing ? (
        <input
          type="number"
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
        ></input>
      ) : (
        <span
          className={`"editable cursor-pointer" ${
            isEdited ? "text-selected" : "text-blue-500"
          }`}
          onClick={handleEditClick}
        >
          {value}
        </span>
      )}
    </div>
  );
};
