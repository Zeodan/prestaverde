import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

//Obtencion de la lista de todos los clientes
export async function GET() {
  const clientes = await prisma.cliente.findMany({
      include: {
          productos: true,
          idioma: {
              include: {
                  mensaje: true
              }
          }
      }
  });
  return NextResponse.json(clientes);
}

//Crear un nuevo cliente
export async function POST(request) {
    const {
      empresa,
      nombre,
      precio_transporte,
      telefono,
      email,
      descuento,
      comunicaciones,
      productos,
      idioma,
    } = await request.json()
    
    const nuevo_Cliente = await prisma.cliente.create({
        data: {
          empresa,
          nombre,
          precio_transporte,
          telefono,
          email,
          descuento,
          comunicaciones,
          productos : {
            connect : productos.map(id => ({id}))
          },
          idioma : {
            connect : {id : idioma}
          }
        }
    })

    return NextResponse.json(nuevo_Cliente)
}