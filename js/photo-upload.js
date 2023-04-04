const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileInputElement = document.querySelector('.img-upload__start input[type=file]');
const previewImageElement = document.querySelector('.img-upload__preview img');

const onFileUploadChange = () => {
  const file = fileInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewImageElement.src = URL.createObjectURL(file);

    const filterImagesPreview = document.querySelectorAll('.effects__preview');
    filterImagesPreview.forEach((filterImage) => {
      filterImage.style.backgroundImage = `url(${previewImageElement.src})`;
    });
  }
};

export {onFileUploadChange};
