import React, { useState } from "react";

export const EditableItem = ({ initialValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleBlur = () => {
    setIsEditing(false);
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
        <span onClick={handleEditClick} className="editable cursor-pointer">
          {value}
        </span>
      )}
    </div>
  );
};
