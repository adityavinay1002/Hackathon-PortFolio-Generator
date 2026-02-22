const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const { parseResumeText } = require('../services/resumeParser');

exports.parseResume = async (req, res) => {
    try {
        console.log('--- Resume Parse Started ---');
        if (!req.file) {
            console.log('No file in request');
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        console.log('File received:', req.file.originalname, 'Type:', req.file.mimetype);
        let resumeText = '';

        if (req.file.mimetype === 'application/pdf') {
            try {
                console.log('Attempting to parse PDF buffer of size:', req.file.buffer.length);
                const data = await pdf(req.file.buffer);
                resumeText = data.text;
                console.log('PDF text extracted, length:', resumeText?.length || 0);
            } catch (pdfErr) {
                console.error('PDF Parse Detailed Error:', pdfErr);
                console.error('Error stack:', pdfErr.stack);
                return res.status(400).json({
                    success: false,
                    message: 'Failed to read PDF file',
                    error: pdfErr.message
                });
            }
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            try {
                const data = await mammoth.extractRawText({ buffer: req.file.buffer });
                resumeText = data.value;
                console.log('DOCX text extracted, length:', resumeText.length);
            } catch (docxErr) {
                console.error('DOCX Parse Error:', docxErr);
                return res.status(400).json({ success: false, message: 'Failed to read DOCX file' });
            }
        } else {
            console.log('Unsupported mimetype:', req.file.mimetype);
            return res.status(400).json({ success: false, message: 'Unsupported file type. Please use PDF or DOCX' });
        }

        if (!resumeText || resumeText.trim().length === 0) {
            console.log('Extracted text is empty');
            return res.status(400).json({ success: false, message: 'Resume appears to be empty or unscannable' });
        }

        const parsedData = parseResumeText(resumeText);
        console.log('Data parsed successfully');

        res.status(200).json({
            success: true,
            data: parsedData
        });
    } catch (err) {
        console.error('Critical Resume Parse Error:', err);
        res.status(500).json({ success: false, message: 'Server error during parsing: ' + err.message });
    }
};
