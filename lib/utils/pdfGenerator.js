import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generate a comprehensive PDF report from resume analysis data
 * @param {Object} data - Complete analysis data
 * @param {string} fileName - Original resume file name
 */
export const generateAnalysisPDF = (data, fileName = 'Resume') => {
    try {
        // Validate input data
        if (!data || typeof data !== 'object') {
            console.error('Invalid data provided to PDF generator');
            alert('Cannot generate PDF: Invalid data');
            return;
        }

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let yPosition = 20;

        // Helper function to add new page if needed
        const checkPageBreak = (requiredSpace = 20) => {
            if (yPosition + requiredSpace > pageHeight - 20) {
                doc.addPage();
                yPosition = 20;
                return true;
            }
            return false;
        };

        // Helper function to add section header with enhanced styling
        const addSectionHeader = (title, icon = '') => {
            checkPageBreak(20);

            // Add some spacing before header
            yPosition += 5;

            // Background with rounded corners effect
            doc.setFillColor(241, 245, 249); // Light gray background
            doc.roundedRect(14, yPosition - 6, pageWidth - 28, 14, 2, 2, 'F');

            // Left accent bar
            doc.setFillColor(59, 130, 246); // Blue accent
            doc.roundedRect(14, yPosition - 6, 4, 14, 1, 1, 'F');

            // Title text
            doc.setTextColor(30, 58, 138); // Dark blue
            doc.setFontSize(15);
            doc.setFont('helvetica', 'bold');
            doc.text(title, 24, yPosition + 3);

            yPosition += 16;
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
        };

        // ===== ENHANCED HEADER =====
        // Main header background
        doc.setFillColor(30, 58, 138); // Darker professional blue
        doc.rect(0, 0, pageWidth, 45, 'F');

        // Accent stripe
        doc.setFillColor(59, 130, 246); // Lighter blue accent
        doc.rect(0, 45, pageWidth, 3, 'F');

        // Title
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('Resume Analysis Report', pageWidth / 2, 18, { align: 'center' });

        // Subtitle with file name
        doc.setFontSize(13);
        doc.setFont('helvetica', 'normal');
        doc.text(fileName, pageWidth / 2, 28, { align: 'center' });

        // Date
        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200);
        const dateStr = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        doc.text(`Generated: ${dateStr}`, pageWidth / 2, 38, { align: 'center' });

        yPosition = 58;
        doc.setTextColor(0, 0, 0);

        // ===== OVERVIEW SECTION =====
        const aiAnalysis = data.aiAnalysis || data.ai_analysis || {};

        addSectionHeader('Overall Score');

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');

        // Overall score box with shadow effect
        // Shadow
        doc.setFillColor(200, 200, 200);
        doc.roundedRect(22, yPosition + 2, 64, 34, 4, 4, 'F');

        // Main box
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(59, 130, 246);
        doc.setLineWidth(1);
        doc.roundedRect(20, yPosition, 64, 34, 4, 4, 'FD');

        // Score number
        doc.setFontSize(36);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(59, 130, 246);
        doc.text(String(aiAnalysis.overallScore || 0), 52, yPosition + 18, { align: 'center' });

        // "out of 100" text
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text('out of 100', 52, yPosition + 27, { align: 'center' });

        // Summary text with better formatting
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(11);
        if (aiAnalysis.summary) {
            const summaryLines = doc.splitTextToSize(aiAnalysis.summary, pageWidth - 105);
            doc.text(summaryLines, 92, yPosition + 12);
        }

        yPosition += 44;

        // Detailed Scores
        if (aiAnalysis.scores && Object.keys(aiAnalysis.scores).length > 0) {
            checkPageBreak(35);
            doc.setFontSize(13);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(60, 60, 60);
            doc.text('Detailed Scores:', 20, yPosition);
            yPosition += 10;

            const scoresData = Object.entries(aiAnalysis.scores).map(([category, score]) => [
                category.charAt(0).toUpperCase() + category.slice(1),
                String(score)
            ]);

            autoTable(doc, {
                startY: yPosition,
                head: [['Category', 'Score']],
                body: scoresData,
                theme: 'striped',
                headStyles: {
                    fillColor: [59, 130, 246],
                    textColor: [255, 255, 255],
                    fontSize: 11,
                    fontStyle: 'bold',
                    halign: 'left'
                },
                bodyStyles: {
                    fontSize: 10,
                    textColor: [60, 60, 60]
                },
                alternateRowStyles: {
                    fillColor: [248, 250, 252]
                },
                margin: { left: 20, right: 20 },
                columnStyles: {
                    0: { cellWidth: 120, fontStyle: 'normal' },
                    1: { cellWidth: 50, halign: 'center', fontStyle: 'bold', textColor: [59, 130, 246] }
                }
            });

            yPosition = doc.lastAutoTable.finalY + 12;
        }

        // ===== STRENGTHS =====
        if (aiAnalysis.strengths && aiAnalysis.strengths.length > 0) {
            addSectionHeader('✅ Strengths');

            doc.setFontSize(10);
            aiAnalysis.strengths.forEach((strength, idx) => {
                checkPageBreak(12);

                // Bullet point with better design
                doc.setFillColor(34, 197, 94); // Green
                doc.circle(22, yPosition - 0.5, 2, 'F');

                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(strength, pageWidth - 52);
                doc.text(lines, 28, yPosition);
                yPosition += lines.length * 5.5 + 4;
            });
            yPosition += 8;
        }

        // ===== IMPROVEMENTS =====
        if (aiAnalysis.improvements && aiAnalysis.improvements.length > 0) {
            addSectionHeader('⚠️ Areas for Improvement');

            doc.setFontSize(10);
            aiAnalysis.improvements.forEach((improvement, idx) => {
                checkPageBreak(12);

                // Warning icon bullet
                doc.setFillColor(245, 158, 11); // Amber
                doc.circle(22, yPosition - 0.5, 2, 'F');

                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(improvement, pageWidth - 52);
                doc.text(lines, 28, yPosition);
                yPosition += lines.length * 5.5 + 4;
            });
            yPosition += 8;
        }

        // ===== RECOMMENDATIONS =====
        if (aiAnalysis.recommendations && aiAnalysis.recommendations.length > 0) {
            addSectionHeader('💡 Recommendations');

            doc.setFontSize(10);
            aiAnalysis.recommendations.forEach((rec, idx) => {
                checkPageBreak(12);

                // Lightbulb bullet
                doc.setFillColor(59, 130, 246); // Blue
                doc.circle(22, yPosition - 0.5, 2, 'F');

                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(rec, pageWidth - 52);
                doc.text(lines, 28, yPosition);
                yPosition += lines.length * 5.5 + 4;
            });
            yPosition += 8;
        }

        // ===== ATS SCORE =====
        const atsScore = data.atsScore || data.ats_score || {};

        if (atsScore.overall_score !== undefined) {
            addSectionHeader('🎯 ATS Compatibility Score');

            // Overall ATS Score with enhanced design
            // Shadow
            doc.setFillColor(200, 200, 200);
            doc.roundedRect(22, yPosition + 2, 64, 30, 4, 4, 'F');

            // Main box
            doc.setFillColor(255, 255, 255);
            doc.setDrawColor(59, 130, 246);
            doc.setLineWidth(1);
            doc.roundedRect(20, yPosition, 64, 30, 4, 4, 'FD');

            doc.setFontSize(32);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(59, 130, 246);
            doc.text(String(atsScore.overall_score || 0), 52, yPosition + 16, { align: 'center' });

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text('ATS Score', 52, yPosition + 24, { align: 'center' });

            // ATS Friendly indicator
            doc.setTextColor(60, 60, 60);
            doc.setFontSize(11);
            const atsFriendly = atsScore.ats_friendly ? '✓ ATS Friendly' : '✗ Needs Improvement';
            const friendlyColor = atsScore.ats_friendly ? [34, 197, 94] : [239, 68, 68];
            doc.setTextColor(...friendlyColor);
            doc.setFont('helvetica', 'bold');
            doc.text(atsFriendly, 92, yPosition + 15);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');

            yPosition += 40;

            // Category Scores
            if (atsScore.category_scores && Object.keys(atsScore.category_scores).length > 0) {
                checkPageBreak(35);
                doc.setFontSize(13);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(60, 60, 60);
                doc.text('Category Breakdown:', 20, yPosition);
                yPosition += 10;

                const categoryData = Object.entries(atsScore.category_scores).map(([category, score]) => [
                    category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    String(score)
                ]);

                autoTable(doc, {
                    startY: yPosition,
                    head: [['Category', 'Score']],
                    body: categoryData,
                    theme: 'striped',
                    headStyles: {
                        fillColor: [59, 130, 246],
                        textColor: [255, 255, 255],
                        fontSize: 11,
                        fontStyle: 'bold',
                        halign: 'left'
                    },
                    bodyStyles: {
                        fontSize: 10,
                        textColor: [60, 60, 60]
                    },
                    alternateRowStyles: {
                        fillColor: [248, 250, 252]
                    },
                    margin: { left: 20, right: 20 },
                    columnStyles: {
                        0: { cellWidth: 120, fontStyle: 'normal' },
                        1: { cellWidth: 50, halign: 'center', fontStyle: 'bold', textColor: [59, 130, 246] }
                    }
                });

                yPosition = doc.lastAutoTable.finalY + 12;
            }

            // ATS Recommendations
            if (atsScore.recommendations && atsScore.recommendations.length > 0) {
                checkPageBreak(15);
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('ATS Recommendations:', 20, yPosition);
                yPosition += 8;

                doc.setFontSize(11);
                doc.setFont('helvetica', 'normal');
                atsScore.recommendations.forEach((rec, idx) => {
                    checkPageBreak(10);
                    doc.setTextColor(59, 130, 246);
                    doc.text(`${idx + 1}.`, 22, yPosition);
                    doc.setTextColor(0, 0, 0);
                    const lines = doc.splitTextToSize(rec, pageWidth - 50);
                    doc.text(lines, 28, yPosition);
                    yPosition += lines.length * 6 + 2;
                });
                yPosition += 5;
            }
        }

        // ===== SKILLS =====
        const skills = data.skills || {};

        if (skills.current || skills.suggested) {
            addSectionHeader('🔧 Skills Analysis');

            // Detected Role
            if (skills.detected_role) {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text('Detected Role: ', 20, yPosition);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(59, 130, 246);
                doc.text(skills.detected_role, 60, yPosition);
                doc.setTextColor(0, 0, 0);
                yPosition += 8;
            }

            // Skill Gap Count
            if (skills.skill_gap_count !== undefined) {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text('Skill Gap Count: ', 20, yPosition);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(239, 68, 68);
                doc.text(String(skills.skill_gap_count), 60, yPosition);
                doc.setTextColor(0, 0, 0);
                yPosition += 10;
            }

            // Current Skills - handle both array and object formats
            let currentSkillsArray = [];
            if (Array.isArray(skills.current)) {
                currentSkillsArray = skills.current;
            } else if (skills.current && typeof skills.current === 'object') {
                // If it's an object with technical/soft skills
                if (skills.current.technical) {
                    // Flatten technical skills from categories
                    Object.values(skills.current.technical).forEach(categorySkills => {
                        if (Array.isArray(categorySkills)) {
                            currentSkillsArray = currentSkillsArray.concat(categorySkills);
                        }
                    });
                }
                if (Array.isArray(skills.current.soft)) {
                    currentSkillsArray = currentSkillsArray.concat(skills.current.soft);
                }
            }

            if (currentSkillsArray.length > 0) {
                checkPageBreak(15);
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('Current Skills:', 20, yPosition);
                yPosition += 8;

                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                let xPos = 20;
                currentSkillsArray.forEach((skill, idx) => {
                    const skillText = String(skill); // Ensure it's a string
                    const skillWidth = doc.getTextWidth(skillText) + 8;
                    if (xPos + skillWidth > pageWidth - 20) {
                        xPos = 20;
                        yPosition += 8;
                        checkPageBreak(10);
                    }

                    doc.setFillColor(219, 234, 254); // Light blue
                    doc.roundedRect(xPos, yPosition - 5, skillWidth, 7, 1, 1, 'F');
                    doc.setTextColor(30, 64, 175); // Dark blue
                    doc.text(skillText, xPos + 4, yPosition);
                    xPos += skillWidth + 3;
                });

                yPosition += 12;
                doc.setTextColor(0, 0, 0);
            }

            // Suggested Skills
            const suggestedSkillsArray = Array.isArray(skills.suggested) ? skills.suggested : [];
            if (suggestedSkillsArray.length > 0) {
                checkPageBreak(15);
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('Suggested Skills to Learn:', 20, yPosition);
                yPosition += 8;

                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                let xPos = 20;
                suggestedSkillsArray.forEach((skill, idx) => {
                    const skillText = String(skill); // Ensure it's a string
                    const skillWidth = doc.getTextWidth(skillText) + 8;
                    if (xPos + skillWidth > pageWidth - 20) {
                        xPos = 20;
                        yPosition += 8;
                        checkPageBreak(10);
                    }

                    doc.setFillColor(254, 243, 199); // Light amber
                    doc.roundedRect(xPos, yPosition - 5, skillWidth, 7, 1, 1, 'F');
                    doc.setTextColor(146, 64, 14); // Dark amber
                    doc.text(skillText, xPos + 4, yPosition);
                    xPos += skillWidth + 3;
                });

                yPosition += 15;
                doc.setTextColor(0, 0, 0);
            }
        }

        // ===== LEARNING ROADMAP =====
        const roadmap = data.roadmap || {};

        if (roadmap.items && roadmap.items.length > 0) {
            addSectionHeader('🗺️ Learning Roadmap');

            // Total Time
            if (roadmap.total_time) {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text('Total Estimated Time: ', 20, yPosition);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(59, 130, 246);
                doc.text(roadmap.total_time, 70, yPosition);
                doc.setTextColor(0, 0, 0);
                yPosition += 10;
            }

            // Roadmap Items
            roadmap.items.forEach((item, idx) => {
                checkPageBreak(25);

                // Item number badge
                doc.setFillColor(59, 130, 246);
                doc.circle(22, yPosition + 2, 3, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(8);
                doc.text(String(idx + 1), 22, yPosition + 3, { align: 'center' });

                // Item details
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text(item.skill || item.title || `Step ${idx + 1}`, 28, yPosition + 3);

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                yPosition += 8;

                if (item.description) {
                    const descLines = doc.splitTextToSize(item.description, pageWidth - 55);
                    doc.text(descLines, 28, yPosition);
                    yPosition += descLines.length * 5;
                }

                // Resources and timeline
                doc.setFontSize(8);
                doc.setTextColor(100, 100, 100);

                if (item.resources && item.resources.length > 0) {
                    doc.text(`Resources: ${item.resources.join(', ')}`, 28, yPosition);
                    yPosition += 5;
                }

                if (item.timeline || item.duration) {
                    doc.text(`Timeline: ${item.timeline || item.duration}`, 28, yPosition);
                    yPosition += 5;
                }

                if (item.phase) {
                    doc.text(`Phase: ${item.phase}`, 28, yPosition);
                    yPosition += 5;
                }

                doc.setTextColor(0, 0, 0);
                yPosition += 5;
            });

            // Phases Summary
            if (roadmap.phases && roadmap.phases.length > 0) {
                checkPageBreak(20);
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('Learning Phases:', 20, yPosition);
                yPosition += 8;

                roadmap.phases.forEach((phase, idx) => {
                    checkPageBreak(8);
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`Phase ${idx + 1}: ${phase.name || phase}`, 25, yPosition);
                    yPosition += 6;

                    if (phase.duration) {
                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(9);
                        doc.text(`Duration: ${phase.duration}`, 30, yPosition);
                        yPosition += 5;
                    }
                });
            }
        }

        // ===== EXTRACTION METADATA =====
        const extraction = data.extraction || {};

        if (extraction.word_count || extraction.char_count) {
            checkPageBreak(20);
            addSectionHeader('📄 Document Metadata');

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');

            if (extraction.word_count) {
                doc.text(`Word Count: ${extraction.word_count}`, 20, yPosition);
                yPosition += 7;
            }

            if (extraction.char_count) {
                doc.text(`Character Count: ${extraction.char_count}`, 20, yPosition);
                yPosition += 7;
            }
        }

        // ===== FOOTER =====
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(
                `Page ${i} of ${totalPages} | Generated by Resume Analyzer`,
                pageWidth / 2,
                pageHeight - 10,
                { align: 'center' }
            );
        }

        // Save the PDF
        const pdfFileName = `${fileName.replace(/\.[^/.]+$/, '')}_analysis_${Date.now()}.pdf`;
        doc.save(pdfFileName);

        console.log('PDF generated successfully:', pdfFileName);
    } catch (error) {
        console.error('PDF Generation Error:', error);
        alert(`Failed to generate PDF: ${error.message}\n\nPlease try again or contact support if the issue persists.`);
    }
}

export default generateAnalysisPDF;
