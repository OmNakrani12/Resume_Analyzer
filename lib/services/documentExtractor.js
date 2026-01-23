
import PDFParser from 'pdf2json';
import mammoth from 'mammoth';
import fs from 'fs/promises';

class DocumentExtractor {
    /**
     * Extract text from PDF using pdf2json
     */
    static async extractFromPdf(filePath) {
        return new Promise((resolve, reject) => {
            const pdfParser = new PDFParser();

            pdfParser.on('pdfParser_dataError', (errData) => {
                reject(new Error(`Failed to extract PDF text: ${errData.parserError}`));
            });

            pdfParser.on('pdfParser_dataReady', (pdfData) => {
                try {
                    // Extract text from all pages
                    let text = '';
                    if (pdfData.Pages) {
                        pdfData.Pages.forEach((page) => {
                            if (page.Texts) {
                                page.Texts.forEach((textItem) => {
                                    if (textItem.R) {
                                        textItem.R.forEach((r) => {
                                            if (r.T) {
                                                try {
                                                    // Try to decode URI component
                                                    text += decodeURIComponent(r.T) + ' ';
                                                } catch (e) {
                                                    // If decoding fails, use raw text
                                                    text += r.T.replace(/%/g, '') + ' ';
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                            text += '\n';
                        });
                    }
                    resolve(this.cleanText(text));
                } catch (error) {
                    reject(new Error(`Failed to parse PDF data: ${error.message}`));
                }
            });

            pdfParser.loadPDF(filePath);
        });
    }

    /**
     * Extract text from DOCX files
     */
    static async extractFromDocx(filePath) {
        try {
            const result = await mammoth.extractRawText({ path: filePath });
            return this.cleanText(result.value);
        } catch (error) {
            throw new Error(`Failed to extract DOCX text: ${error.message}`);
        }
    }

    /**
     * Extract text from TXT files
     */
    static async extractFromTxt(filePath) {
        try {
            const text = await fs.readFile(filePath, 'utf-8');
            return this.cleanText(text);
        } catch (error) {
            throw new Error(`Failed to extract TXT text: ${error.message}`);
        }
    }

    /**
     * Clean and normalize extracted text
     */
    static cleanText(text) {
        // Remove excessive whitespace
        text = text.replace(/\s+/g, ' ');
        // Remove special characters but keep important punctuation
        text = text.replace(/[^\w\s\.\,\@\-\+\#\(\)\/]/g, '');
        // Remove multiple newlines
        text = text.replace(/\n+/g, '\n');
        return text.trim();
    }

    /**
     * Main method to extract text based on file type
     */
    static async extractText(filePath, fileExtension) {
        try {
            let text;

            if (fileExtension.toLowerCase() === 'pdf') {
                text = await this.extractFromPdf(filePath);
            } else if (['docx', 'doc'].includes(fileExtension.toLowerCase())) {
                text = await this.extractFromDocx(filePath);
            } else if (fileExtension.toLowerCase() === 'txt') {
                text = await this.extractFromTxt(filePath);
            } else {
                throw new Error(`Unsupported file format: ${fileExtension}`);
            }

            return {
                success: true,
                text,
                word_count: text.split(/\s+/).length,
                char_count: text.length,
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                text: '',
            };
        }
    }
}

export default DocumentExtractor;
