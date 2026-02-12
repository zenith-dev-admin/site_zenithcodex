import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, projectType, description, budget } = body;

        // 1. Save to Supabase
        const { error: dbError } = await supabase
            .from('budget_requests')
            .insert([
                { name, email, project_type: projectType, description, budget, status: 'pending' }
            ]);

        if (dbError) {
            console.error('Supabase Error:', dbError);
            return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
        }

        // 2. Send Email Notification (to Admin)
        await sendEmail({
            to: 'contact@zenithcodex.com', // Replace with admin email
            subject: `New Budget Request: ${projectType} from ${name}`,
            html: `
        <h1>New Project Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `
        });

        // 3. Send Confirmation Email (to User)
        await sendEmail({
            to: email,
            subject: 'Recebemos sua solicitação - ZenithCodex',
            html: `
        <h1>Olá, ${name}!</h1>
        <p>Recebemos sua solicitação de orçamento para um projeto de <strong>${projectType}</strong>.</p>
        <p>Nossa equipe analisará os detalhes e entrará em contato em breve.</p>
        <br>
        <p>Atenciosamente,</p>
        <p>Equipe ZenithCodex</p>
      `
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
