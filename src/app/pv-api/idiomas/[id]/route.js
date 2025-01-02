import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export function GET(request, {params}) {

    return NextResponse.json("Obteniendo Idioma " + params.id)
}

export async function PUT(request, {params}) {
	try {
		const data = await request.json()
		const updatedIdioma = await prisma.idioma.update({
			where: {id: parseInt(params.id)},
			data,
		})
		return NextResponse.json(updatedIdioma)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "Error al actualizar el idioma"})
	}
}

export async function DELETE(request, {params}) {
    try {
        await prisma.idioma.delete({
            where: {id: parseInt(params.id)}
        })
        return NextResponse.json({message: "Idioma eliminado"})
    } catch (error) {
      console.error(error)
			return NextResponse.json({ error: "Error al eliminar el idioma"})
    }
}
    