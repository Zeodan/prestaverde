import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export function GET(request, {params}) {

    return NextResponse.json("Obteniendo Producto " + params.id)
}

export async function PUT(request, {params}) {
	try {
		const data = await request.json()
		const updatedProducto = await prisma.producto.update({
			where: {id: parseInt(params.id)},
			data,
		})
		return NextResponse.json(updatedProducto)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "Error al actualizar el producto"})
	}
}

export async function DELETE(request, {params}) {
    try {
        await prisma.producto.delete({
            where: {id: parseInt(params.id)}
        })
        return NextResponse.json({message: "Producto eliminado"})
    } catch (error) {
      console.error(error)
			return NextResponse.json({ error: "Error al eliminar el producto"})
    }
}
    