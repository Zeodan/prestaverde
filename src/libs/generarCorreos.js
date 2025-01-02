
export async function generarCorreos() {
	const clientes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/clientes`).then(response => response.json());

	// Funcion de calculo de precio final ********************************************************************************************
	function calcularPrecio(producto, cliente) {
		const descuento = cliente.descuento / 100;
			return producto.precio + (cliente.precio_transporte / producto.precio_palet) - (producto.precio * descuento);
	}
	// *******************************************************************************************************************************

	function generarContenidoHtml(cliente, mensaje, productosCliente) {
			let contenidoHtml = `<p>${mensaje.prenombre} ${cliente.nombre}</p>`;
			contenidoHtml += `<p>${mensaje.contenido}</p>`;
			contenidoHtml += "";
			productosCliente.forEach(producto => {
					const precio = calcularPrecio(producto, cliente);
					contenidoHtml += `
							<ul>
									<img src="${producto.foto}" alt="${producto.nombre}" style="max-width: 200px; height: auto;" />
									<p>${producto.nombre}: ${precio.toFixed(2)} €/${producto.unidad_venta}</p>
							</ul>
					`;
			});
			contenidoHtml += "";
			return contenidoHtml;
	}

	const correos = clientes
			.filter(cliente => cliente.comunicaciones)
			.map(cliente => {
					const mensaje = cliente.idioma.mensaje;
					const productosCliente = cliente.productos;
					const contenidoHtml = generarContenidoHtml(cliente, mensaje, productosCliente);
					return {
							recipient: cliente.email,
							subject: "Información de nuestros productos",
							text: `Hola ${mensaje.prenombre} ${cliente.nombre},\n${mensaje.contenido}\nProductos:\n${productosCliente.map(producto => `${producto.nombre}: ${calcularPrecio(producto, cliente).toFixed(2)} /${producto.unidad_venta}`).join('\n')}`,
							html: contenidoHtml
					};
			});

	return correos;
}
