import React, { useCallback, useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';

interface PDFUploaderProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onFileUpload, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        onFileUpload(file);
      } else {
        alert('Please upload a PDF file');
      }
    }
  }, [onFileUpload]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  }, [onFileUpload]);

  const handleClick = useCallback(() => {
    if (!isProcessing) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf';
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          onFileUpload(target.files[0]);
        }
      };
      input.click();
    }
  }, [onFileUpload, isProcessing]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className={`
          relative border-4 border-dashed rounded-3xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 transform cursor-pointer
          ${dragActive 
            ? 'border-yellow-400 bg-yellow-100/20 scale-105 shadow-2xl' 
            : 'border-white/50 bg-white/10 hover:bg-white/20 hover:border-white/70 hover:scale-102'
          }
          ${isProcessing ? 'pointer-events-none opacity-70' : 'hover:shadow-xl'}
          backdrop-blur-sm
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="space-y-3 sm:space-y-4">
          {isProcessing ? (
            <div className="relative">
              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300 mx-auto animate-spin" />
              <div className="absolute -top-1 -right-1 text-base sm:text-lg animate-bounce">⚡</div>
            </div>
          ) : (
            <div className="relative">
              <div className="relative inline-block">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-orange-400 rounded-full p-1 sm:p-1.5 shadow-lg">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
              {/* Floating sparkles */}
              <div className="absolute top-0 left-1/4 text-yellow-300 text-sm sm:text-base animate-pulse">✨</div>
              <div className="absolute top-2 right-1/4 text-yellow-300 text-xs sm:text-sm animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
              <div className="absolute bottom-2 left-1/3 text-yellow-300 text-xs animate-pulse" style={{animationDelay: '1s'}}>💫</div>
            </div>
          )}
          
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white drop-shadow-lg">
              {isProcessing ? 'Processing PDF...' : 'Drop Your PDF Here!'}
            </h3>
            <p className="text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-lg mx-auto px-1">
              {isProcessing 
                ? 'Extracting text and generating questions...'
                : 'Drag and drop your PDF file here, or click to browse'
              }
            </p>
            
            {!isProcessing && (
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2 sm:p-3 mt-2 sm:mt-3">
                <p className="text-white/80 text-xs">
                  📄 Supports educational PDFs with readable text content
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Animated border effect */}
        {dragActive && (
          <div className="absolute inset-0 rounded-3xl border-4 border-yellow-400 animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default PDFUploader;