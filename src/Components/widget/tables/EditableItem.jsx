import React, { useEffect, useState } from "react";

export const EditableItem = ({
  initialValue,
  productId,
  fieldName,
  update,
  data,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (event) => {
    setIsEditing(false);
    if (value !== initialValue) {
      update(event.target.id, event.target.name, event.target.value);
      // setIsEdited(true);
    } else {
      setIsEditing(false);
    }
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      {isEditing ? (
        <input
          name={fieldName}
          id={productId}
          type="text"
          value={value}
          onBlur={(event) => {
            handleBlur(event);
          }}
          onChange={handleChange}
        ></input>
      ) : (
        <span
          className="editable cursor-pointer text-blue-500"
          onClick={handleEditClick}
        >
          {value}
        </span>
      )}
    </div>
  );
};
