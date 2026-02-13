import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend'; // Importação direta da SDK

// Inicializa o Resend (Certifique-se de ter RESEND_API_KEY no seu .env.local)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, projectType, companySize, description, budget } = body;

        // 1. Validação básica
        if (!name || !email || !phone || !projectType) {
            return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
        }

        // 2. Salvar no Supabase
        const { error: dbError } = await supabase
            .from('budget_requests')
            .insert([
                {
                    name,
                    email,
                    phone,
                    project_type: projectType,
                    company_size: companySize,
                    description,
                    budget,
                    status: 'pending'
                }
            ]);

        if (dbError) {
            console.error('Erro no Supabase:', dbError);
            return NextResponse.json({ error: 'Falha ao salvar no banco de dados' }, { status: 500 });
        }

        // 3. E-mail de Confirmação para o CLIENTE (Visual Profissional)
        await resend.emails.send({
            from: 'ZenithCodex <comercial@noreply.zenithcodex.com>', // Requer domínio verificado no Resend
            to: email,
            subject: 'Solicitação de Orçamento Recebida - ZenithCodex',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
                    <div style="background-color: #8c52ff; padding: 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">ZenithCodex</h1>
                    </div>
                    <div style="padding: 30px; color: #18181b; line-height: 1.6;">
                        <h2 style="font-size: 18px;">Olá, ${name}!</h2>
                        <p>Recebemos sua solicitação de orçamento para o projeto de <strong>${projectType}</strong>.</p>
                        <p>Nossa equipe técnica já está analisando os detalhes. Valorizamos seu interesse e daremos prioridade ao seu caso.</p>
                        
                        <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8c52ff;">
                            <p style="margin: 0; font-size: 14px;"><strong>O que esperar agora?</strong></p>
                            <p style="margin: 5px 0 0 0; font-size: 14px;">Em até 24 horas úteis, entraremos em contato via WhatsApp (<strong>${phone}</strong>) ou e-mail para agendarmos uma reunião de alinhamento.</p>
                        </div>

                        <p>Atenciosamente,<br /><strong>Equipe ZenithCodex</strong></p>
                    </div>
                    <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #a1a1aa;">
                        &copy; 2026 ZenithCodex. Tecnologia e Inovação.
                    </div>
                </div>
            `
        });

        // 4. Notificação para o ADMIN (Você)
        await resend.emails.send({
            from: 'Sistema ZenithCodex <contact@zenithcodex.com>',
            to: 'comercial@zenithcodex.com',
            subject: `🔥 Novo Lead: ${name} - ${projectType}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #8c52ff;">Nova Solicitação de Orçamento</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Telefone:</strong> ${phone}</p>
                    <p><strong>Tamanho da Empresa:</strong> ${companySize}</p>
                    <p><strong>Tipo:</strong> ${projectType}</p>
                    <p><strong>Orçamento:</strong> ${budget || 'Não informado'}</p>
                    <p><strong>Descrição:</strong></p>
                    <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${description}</div>
                </div>
            `
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
    }
}