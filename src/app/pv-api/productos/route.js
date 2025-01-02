import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

//Obtencion de la lista de todos los clientes
export async function GET() {
    const productos = await prisma.producto.findMany({
        include: {
          clientes: true,
        }
    })
    return NextResponse.json(productos)
}


//Crear un nuevo producto
export async function POST(request) {
  const {
    nombre,
    precio_palet,
    precio,
    foto,
    unidad_venta,
  } = await request.json()
  
  const nuevo_Producto = await prisma.producto.create({
      data: {
        nombre,
        precio_palet,
        precio,
        foto,
        unidad_venta,
      }
  })

  return NextResponse.json(nuevo_Producto)
}