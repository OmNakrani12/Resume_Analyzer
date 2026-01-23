import { NextResponse } from 'next/server';
import ExportService from '@/lib/services/exportService';

/**
 * POST /api/export - Export analysis in various formats
 */
export async function POST(req) {
    try {
        const { searchParams } = new URL(req.url);
        const format = searchParams.get('format') || 'json';

        const data = await req.json();

        if (!data) {
            return NextResponse.json(
                { success: false, error: 'No data provided' },
                { status: 400 }
            );
        }

        // Handle different export formats
        if (format === 'json') {
            return handleJsonExport(data);
        } else if (format === 'markdown') {
            return handleMarkdownExport(data);
        } else if (format === 'summary') {
            return handleSummaryExport(data);
        } else if (format === 'download-json') {
            return handleJsonDownload(data);
        } else if (format === 'download-markdown') {
            return handleMarkdownDownload(data);
        }

        // Default to JSON export
        return handleJsonExport(data);
    } catch (err) {
        console.error('EXPORT API ERROR:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to export data' },
            { status: 500 }
        );
    }
}

function handleJsonExport(data) {
    const jsonExport = ExportService.generateJsonExport(data);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];

    return NextResponse.json(
        {
            success: true,
            data: jsonExport,
            filename: `resume_analysis_${timestamp}.json`,
        },
        { status: 200 }
    );
}

function handleMarkdownExport(data) {
    const markdownReport = ExportService.generateMarkdownReport(data);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];

    return NextResponse.json(
        {
            success: true,
            data: markdownReport,
            filename: `resume_analysis_${timestamp}.md`,
        },
        { status: 200 }
    );
}

function handleSummaryExport(data) {
    const summary = ExportService.generateSummaryStats(data);

    return NextResponse.json(
        {
            success: true,
            data: summary,
        },
        { status: 200 }
    );
}

function handleJsonDownload(data) {
    const jsonExport = ExportService.generateJsonExport(data);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = `resume_analysis_${timestamp}.json`;

    return new NextResponse(jsonExport, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="${filename}"`,
        },
    });
}

function handleMarkdownDownload(data) {
    const markdownReport = ExportService.generateMarkdownReport(data);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = `resume_analysis_${timestamp}.md`;

    return new NextResponse(markdownReport, {
        status: 200,
        headers: {
            'Content-Type': 'text/markdown',
            'Content-Disposition': `attachment; filename="${filename}"`,
        },
    });
}
