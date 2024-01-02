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
  const [originalValue, setOriginalValue] = useState(initialValue);

  useEffect(() => {
    setOriginalValue(initialValue);
    setValue(initialValue);
  }, [initialValue]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (event) => {
    setIsEditing(false);
    if (value !== originalValue) {
      update(event.target.id, event.target.name, event.target.value);
    } else {
      setIsEditing(false);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEditing(false);
      setValue(originalValue);
    }
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
          onKeyDown={handleKeyDown}
        />
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
