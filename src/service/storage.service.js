const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer) {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: "image.jpg",
  });

  return {
    url: result.url,
    fileId: result.fileId,
  };
}

async function deleteFile(fileId) {
  await imagekit.deleteFile(fileId);
}

module.exports = {
  uploadFile,
  deleteFile,
};