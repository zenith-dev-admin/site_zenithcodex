import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Destruturação com os novos campos: phone e companySize
        const { name, email, phone, projectType, companySize, description, budget } = body;

        // Validação básica (Telefone agora é obrigatório para um lead qualificado)
        if (!name || !email || !phone || !projectType) {
            return NextResponse.json({ error: 'Campos obrigatórios ausentes (Nome, E-mail, Telefone e Tipo de Projeto)' }, { status: 400 });
        }

        // 1. Salvar no Supabase (Mapeando camelCase do front para snake_case do banco)
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
            console.error('Erro no Supabase:', JSON.stringify(dbError, null, 2));
            return NextResponse.json({
                error: 'Falha ao salvar no banco de dados',
                details: dbError.message
            }, { status: 500 });
        }

        // 2. Notificação para o Admin (ZenithCodex) com os novos detalhes
        const emailAdmin = await sendEmail({
            to: 'contact@zenithcodex.com',
            subject: `🔥 Novo Lead: ${name} - ${projectType}`,
            html: `
                <div style="font-family: sans-serif; color: #333;">
                    <h2 style="color: #8c52ff;">Nova Solicitação de Orçamento</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>WhatsApp/Telefone:</strong> ${phone}</p>
                    <p><strong>Tamanho da Empresa:</strong> ${companySize || 'Não informado'}</p>
                    <p><strong>Tipo de Projeto:</strong> ${projectType}</p>
                    <p><strong>Orçamento Estimado:</strong> ${budget || 'Não especificado'}</p>
                    <hr />
                    <p><strong>Descrição:</strong></p>
                    <p style="background: #f4f4f4; p-4: rounded: 8px;">${description}</p>
                </div>
            `
        });

        if (!emailAdmin.success) {
            console.warn('Falha no e-mail administrativo:', emailAdmin.error);
        }

        // 3. E-mail de Confirmação para o Cliente (Mais profissional)
        const emailUser = await sendEmail({
            to: email,
            subject: 'Confirmamos o recebimento da sua solicitação - ZenithCodex',
            html: `
                <div style="font-family: sans-serif; max-width: 600px;">
                    <h1 style="color: #8c52ff;">Olá, ${name}!</h1>
                    <p>Recebemos sua solicitação para o projeto de <strong>${projectType}</strong>.</p>
                    <p>Nossos especialistas já estão analisando suas informações e entraremos em contato via e-mail ou WhatsApp (<strong>${phone}</strong>) para agendarmos uma breve reunião técnica.</p>
                    <br />
                    <p>Atenciosamente,</p>
                    <p><strong>Equipe ZenithCodex</strong></p>
                    <p style="font-size: 12px; color: #888;">Este é um e-mail automático, não é necessário responder.</p>
                </div>
            `
        });

        if (!emailUser.success) {
            console.warn('Falha no e-mail do usuário:', emailUser.error);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
    }
}