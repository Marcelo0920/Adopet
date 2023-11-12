import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.js";
import sharp from "sharp";

export async function uploadFile(file) {
  // const width = process.env.IMGWIDTH;
  // const height = process.env.IMGHEIGHT;
  let fileBuffer = await sharp(file.buffer)
    .resize({
      width: 200,
      height: 200,
      fit: "cover",
    })
    .toBuffer();

  const fileRef = ref(storage, `files/${file.originalname} ${Date.now()}`);

  const fileMetaData = {
    contentType: file.mimetype,
  };

  // const fileUploadPromise =
  await uploadBytesResumable(fileRef, fileBuffer, fileMetaData);

  // await fileUploadPromise;

  const fileDownloadURL = await getDownloadURL(fileRef);

  return { url: fileDownloadURL };
}
