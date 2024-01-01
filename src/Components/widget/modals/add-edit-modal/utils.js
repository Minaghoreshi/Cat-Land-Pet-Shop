export const createDataToSend = (formikValues) => {
  const formdata = new FormData();
  Object.entries(formikValues).forEach(([key, value]) => {
    // Check if key is 'thumbnail' or 'images'
    if (key === "thumbnail" && value instanceof File) {
      // Check if 'thumbnail' key and value is an array
      formdata.append("thumbnail", value);
    } else if (key === "images" && value instanceof Array) {
      // If 'images' key and value is an array, iterate and append each image
      value.forEach((image) => {
        formdata.append("images", image);
      });
    } else if (key !== "thumbnail") {
      // For other keys (excluding 'thumbnail'), append as usual
      formdata.append(key, value);
    }
  });
  return formdata;
};
