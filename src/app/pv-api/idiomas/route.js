import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

//Obtencion de la lista de todos los clientes
export async function GET() {
    const idiomas = await prisma.idioma.findMany({
        include: {
            mensaje: true,
            clientes: true,
        }
    })
    return NextResponse.json(idiomas)
}

//Crear un nuevo idioma
export async function POST(request) {
    const {
      nombre,
    } = await request.json()
    
    const nuevo_Idioma = await prisma.idioma.create({
        data: {
          nombre,
        }
    })

    return NextResponse.json(nuevo_Idioma)
}