'use client'

import { 	AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function TablaClientes({ children, href }) {

	//Datos para mostrar
	const [rowData, setRowData] = useState()
	const router = useRouter()

	
	// Guardar cambios en la tabla
	const handleSave = async (data) => {
		const { idioma, productos, ...dataToSend } = data; 
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/clientes/${data.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataToSend),
			});
	
			if (!response.ok) {
				throw new Error('Error al guardar los cambios del cliente');
			}
	
			const result = await response.json();
			console.log('Cliente guardado exitosamente:', result);
			toast.success('Cambios guardados', {
							position: "top-right",
							autoClose: 3000,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
		} catch (error) {
			console.error('Error al guardar los cambios del cliente:', error);
		}
	};
	
	// Eliminar un registro
	const handleDelete = async (id) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/clientes/${id}`, {
				method: 'DELETE',
			});
	
			if (!response.ok) {
				throw new Error('Error al eliminar el cliente');
			}
	
			const result = await response.json();
			console.log('Cliente eliminado exitosamente:', result);
			toast.error('Registro eliminado', {
							position: "top-right",
							autoClose: 3000,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
			// Actualizar los datos de la tabla después de la eliminación
			setRowData((prev) => prev.filter((cliente) => cliente.id !== id));
		} catch (error) {
			console.error('Error al eliminar el cliente:', error);
		}
	};
	


	useEffect(( ) => {
    const fetchClientes = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/clientes`);
      const clientes = (await response.json())
      setRowData(clientes)
    }

    fetchClientes()

		}, [])
    
		//Cambio de idioma
		const localeText = AG_GRID_LOCALE_ES;

    
    //Configuracion de las columnas
    const [colDefs, setColDefs] = useState([
				{
					headerName: "Empresa",
					field: "empresa",
					filter: true,
					floatingFilter: true,
					editable: true,
				},
				{
					headerName: "Nombre contacto",
					field: "nombre",
					filter: true,
					floatingFilter: true,
					editable: true,
				},
				{
					headerName: "Teléfono",
					field: "telefono",
					filter: true,
					floatingFilter: true,
					editable: true,
				},
				{
					headerName: "Email",
					field: "email",
					filter: true,
					floatingFilter: true,
					editable: true,
				},
				{
					headerName: "Precio Transporte",
					field: "precio_transporte",
					editable: true,
				},
				{
					headerName: "Descuento (%)",
					field: "descuento",
					editable: true,
				},
				{
					headerName: "Comunicaciones (Si/No)",
					field: "comunicaciones",
					editable: true,
				},
				{
					headerName: "Idioma",
					field: "idioma.nombre",
				},
				{
					headerName: "Acciones",
					field: "",
					cellRenderer: (params) => (
						<div> 
							<Button className='h-7 mr-2' onClick={() => handleSave(params.data)}>Guardar</Button> 
							<Button className='h-7' color="danger" onClick={() => handleDelete(params.data.id)}>Eliminar</Button>
						</div>
					)
				},
				

    ])

    return (
        <div
				className={"ag-theme-quartz-dark"}
				style={{ height: 795 }} 
				>
					<ToastContainer />
					<AgGridReact 
						localeText={localeText}
						rowData={rowData}
						columnDefs={colDefs}
						rowSelection={'multiple'}
						pagination={true}
						paginationPageSize={20}
						paginationPageSizeSelector={[10,20,30,40,50]}
						onGridReady={(params) => params.api.sizeColumnsToFit()}
					/>

				</div>
    )
}