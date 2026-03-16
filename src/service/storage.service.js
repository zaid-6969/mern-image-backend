const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

async function uploadFile(buffer) {
  const result = await imagekit.files.upload({  // ✅ also under files
    file: buffer.toString("base64"),
    fileName: `image-${Date.now()}.jpg`,
  });

  return {
    url: result.url,
    fileId: result.fileId,
  };
}

async function deleteFile(fileId) {
  return await imagekit.files.delete(fileId);  // ✅ correct v7 API
}

module.exports = {
  uploadFile,
  deleteFile,
};
