import { NextResponse } from 'next/server';
import dataStore from '@/lib/storage/dataStore';

/**
 * GET /api/resumes/[id] - Get specific resume
 */
export async function GET(req, { params }) {
    try {
        const { id } = params;
        const resume = dataStore.getResume(id);

        if (!resume) {
            return NextResponse.json(
                { success: false, error: 'Resume not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: resume,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('GET RESUME ERROR:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch resume' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/resumes/[id] - Update resume metadata
 */
export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const data = await req.json();

        const resume = dataStore.getResume(id);
        if (!resume) {
            return NextResponse.json(
                { success: false, error: 'Resume not found' },
                { status: 404 }
            );
        }

        // Update allowed fields
        const updates = {};
        if (data.fileName) updates.fileName = data.fileName;
        if ('notes' in data) updates.notes = data.notes;

        const updated = dataStore.updateResume(id, updates);

        return NextResponse.json(
            {
                success: true,
                message: 'Resume updated successfully',
                data: updated,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('UPDATE RESUME ERROR:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to update resume' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/resumes/[id] - Delete resume
 */
export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        const deleted = dataStore.deleteResume(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, error: 'Resume not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Resume deleted successfully',
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('DELETE RESUME ERROR:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to delete resume' },
            { status: 500 }
        );
    }
}
