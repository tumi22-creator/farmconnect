

import * as ImagePicker from "expo-image-picker";

const CLOUD_NAME = "dbvcmxxma";
const UPLOAD_PRESET = "farmconnect";

export const pickAndUploadImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert("Permission required");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
  });

  if (result.canceled) return null;

  const image = result.assets[0];

const formData = new FormData();

formData.append("file", image.uri);
formData.append("upload_preset", UPLOAD_PRESET);

const res = await fetch(
  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
  {
    method: "POST",
    body: formData,
  }
);

const data = await res.json();

console.log("Cloudinary Response:", data);

if (data.error) {
  alert(JSON.stringify(data.error));
  return null;
}

return data.secure_url;
};