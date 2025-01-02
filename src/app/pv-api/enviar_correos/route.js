import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const emails = await req.json(); 

    if (!emails || emails.length === 0) {
      return NextResponse.json(
        { error: 'La lista de correos está vacía.' },
        { status: 400 }
      );
    }

    // Configuración del transporte SMTP
    const transporter = nodemailer.createTransport({
      host: 'mail.prestaverde.net', 
      port: 465,
      secure: true,
      auth: {
        user: 'mail@prestaverde.net',
        pass: 'presta2024', 
      },
    });

    // Iteramos sobre cada correo personalizado y enviamos
    let emailCount = emails.length;
    let emailIndex = 0;

    for (const emailData of emails) {
      try {
        await transporter.sendMail({
          from: '"PRESTAVERDE <mail@prestaverde.net>', // Remitente
          to: emailData.recipient, // Destinatario
          subject: emailData.subject, // Asunto del correo
          text: emailData.text, // Cuerpo del correo en texto
          html: emailData.html, // Cuerpo del correo en HTML
        });
      } catch (error) {
        console.error(`Error enviando correo a ${emailData.recipient}:`, error);
      
      }
    }

    return NextResponse.json({
      message: 'Todos los correos fueron enviados correctamente.',
    });
  } catch (error) {
    console.error('Error al enviar correos:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al enviar los correos.' },
      { status: 500 }
    );
  }
}
