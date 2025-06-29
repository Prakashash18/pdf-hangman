import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker with the correct version to match the API
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs`;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    // Validate file type
    if (file.type !== 'application/pdf') {
      throw new Error('Please select a valid PDF file');
    }

    // Convert file to array buffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      cMapUrl: 'https://unpkg.com/pdfjs-dist@4.10.38/cmaps/',
      cMapPacked: true,
    });
    
    const pdf = await loadingTask.promise;
    
    if (pdf.numPages === 0) {
      throw new Error('PDF appears to be empty');
    }
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Extract text items and join them
        const pageText = textContent.items
          .filter((item: any) => item.str && typeof item.str === 'string')
          .map((item: any) => item.str.trim())
          .filter(text => text.length > 0)
          .join(' ');
        
        if (pageText) {
          fullText += pageText + '\n\n';
        }
      } catch (pageError) {
        console.warn(`Failed to extract text from page ${pageNum}:`, pageError);
        // Continue with other pages
      }
    }
    
    const cleanedText = fullText.trim();
    
    if (!cleanedText || cleanedText.length < 50) {
      throw new Error('PDF contains insufficient text content for quiz generation');
    }
    
    return cleanedText;
  } catch (error) {
    console.error('PDF parsing error:', error);
    
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to extract text from PDF. Please ensure the PDF contains readable text.');
    }
  }
};