import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

const Customize = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultShoeImage =
    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=300&fit=crop';

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 funky-text-gradient animate-fade-in">
            Customize Your Shoe
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-up">
            Design your perfect shoe with unlimited possibilities
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Shoe Preview */}
          <div className="flex justify-center">
            <div className="glass-effect rounded-xl p-8 neon-glow w-full max-w-md animate-float">
              <img
                src={uploadedImage || defaultShoeImage}
                alt="Shoe Preview"
                className="w-full h-64 object-cover rounded-lg transition-all duration-500 animate-zoom-in"
              />
            </div>
          </div>

          {/* Upload Design Section */}
          <div className="space-y-6 w-full">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="glass-effect rounded-xl p-8 border-2 border-dashed border-primary/50 hover:border-primary cursor-pointer hover-scale transition-all animate-zoom-in"
            >
              <div className="text-center">
                <Upload className="mx-auto mb-4 text-primary animate-bounce-slow" size={48} />
                <p className="text-lg font-semibold mb-2">Upload Your Design</p>
                <p className="text-muted-foreground">
                  Click to upload an image (PNG, JPG, GIF)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Show Uploaded Preview */}
            {uploadedImage && (
              <div className="glass-effect rounded-xl p-4 animate-fade-in">
                <p className="text-sm text-muted-foreground mb-2">Uploaded Design:</p>
                <img
                  src={uploadedImage}
                  alt="Custom design"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            )}

            {/* Add to Cart Button */}
            <button className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover-scale neon-glow transition-all animate-pulse-glow">
              Add Custom Shoe to Cart - Rs. 15000
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
