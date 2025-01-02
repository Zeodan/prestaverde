import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export function GET(request, {params}) {

    return NextResponse.json("Obteniendo Cliente " + params.id)
}

export async function PUT(request, {params}) {
	try {
		const data = await request.json()
		const updatedCliente = await prisma.cliente.update({
			where: {id: parseInt(params.id)},
			data,
		})
		return NextResponse.json(updatedCliente)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "Error al actualizar el cliente"})
	}
}

export async function DELETE(request, {params}) {
    try {
        await prisma.cliente.delete({
            where: {id: parseInt(params.id)}
        })
        return NextResponse.json({message: "Cliente eliminado"})
    } catch (error) {
      console.error(error)
			return NextResponse.json({ error: "Error al eliminar el cliente"})
    }
}
    