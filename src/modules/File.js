export default {
  upload (File) {

  },
  getFileType (url) {

  },
  getFileName (url) {
    url = url.split(/[#?]/)[0]
    const urlArray = url.split('/')
    const fileFullName = urlArray[urlArray.length - 1]
    const fileNameArray = fileFullName.split('-')
    fileNameArray.splice(0, 5)
    return fileNameArray.join('-')
  },
  getFileExtension (url) {
    if (url) return url.split(/[#?]/)[0].split('.').pop().trim()
    else null
  },
  getFileInfo (url) {

  },
  isImage (url) {
    const extension = this.getFileExtension(url)

    return extension && (
      extension.toLowerCase() === 'apng' ||
      extension.toLowerCase() === 'avif' ||
      extension.toLowerCase() === 'jpg' ||
      extension.toLowerCase() === 'jpeg' ||
      extension.toLowerCase() === 'jfif' ||
      extension.toLowerCase() === 'pjpeg' ||
      extension.toLowerCase() === 'pjp' ||
      extension.toLowerCase() === 'png' ||
      extension.toLowerCase() === 'svg' ||
      extension.toLowerCase() === 'webp' ||
      extension.toLowerCase() === 'bmp' ||
      extension.toLowerCase() === 'ico' ||
      extension.toLowerCase() === 'cur' ||
      extension.toLowerCase() === 'tif' ||
      extension.toLowerCase() === 'tiff')
  }
}
