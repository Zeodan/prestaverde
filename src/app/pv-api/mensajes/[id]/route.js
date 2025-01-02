import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export function GET(request, {params}) {

    return NextResponse.json("Obteniendo Mensaje " + params.id)
}

export async function PUT(request, {params}) {
	try {
		const data = await request.json()
		const updatedMensaje = await prisma.mensaje.update({
			where: {id: parseInt(params.id)},
			data,
		})
		return NextResponse.json(updatedMensaje)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "Error al actualizar el mensaje"})
	}
}

export async function DELETE(request, {params}) {
    try {
        await prisma.mensaje.delete({
            where: {id: parseInt(params.id)}
        })
        return NextResponse.json({message: "Mensaje eliminado"})
    } catch (error) {
      console.error(error)
			return NextResponse.json({ error: "Error al eliminar el mensaje"})
    }
}
    