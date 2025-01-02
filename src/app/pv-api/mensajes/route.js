import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

//Obtencion de la lista de todos los clientes
export async function GET() {
    const mensajes = await prisma.mensaje.findMany({
        include: {
          idioma: true,
        }
    })
    return NextResponse.json(mensajes)
}

//Crear un nuevo mensaje
export async function POST(request) {
  const {
    prenombre,
    contenido,
    idioma,
  } = await request.json()
  
  const nuevo_Mensaje = await prisma.mensaje.create({
      data: {
        prenombre,
        contenido,
        idioma : {
          connect : {id : idioma}
        }
      }
  })

  return NextResponse.json(nuevo_Mensaje)
}