interface ImageGalleryProps {
  images: string[];
  selectedImage: string;
  onSelectImage: (image: string) => void;
}

export const ImageGallery = ({ images, selectedImage, onSelectImage }: ImageGalleryProps) => {
  if (images.length <= 1) return null;

  return (
    <>
      <h3 className="text-xl font-bold mb-3">Gallery</h3>
      <div className="grid grid-cols-4 gap-2 mb-6">
        {images.map((img, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-md overflow-hidden border-2 ${
              selectedImage === img ? "border-sixty40-purple" : "border-transparent"
            }`}
            onClick={() => onSelectImage(img)}
          >
            <img
              src={img}
              alt={`Product image ${index + 1}`}
              className="w-full h-16 object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};
