'use client'

import { Card, CardHeader, CardBody, Divider, Input, Textarea, Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import ModalMensajes from '@/components/Mensajes/ModalMensajes/ModalMensajes'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Formulario de creacion de nuevo cliente
export default function NuevoIdioma() {

	//Router

	//Funciones del modulo React Hook Form
	const {register, handleSubmit, setValue, getValues} = useForm()

	//Funcion de captura y seteado de valores en el formulario desde la modal de Mensaje
	const handleModalMensajeSubmit = (modalMensajeData) => {
		setValue('mensaje', modalMensajeData)
	}
	const onSubmit = async (data) => {
    try {
			
      // Realizar la petición POST
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/idiomas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Enviar los datos del formulario como JSON
      });

      // Verificar si la respuesta no es exitosa
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parsear la respuesta como JSON
      const result = await response.json();
      
      // Imprimir el resultado exitoso en la consola
			toast.success('Registro creado', {
							position: "top-right",
							autoClose: 3000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
      console.log('Registro creado exitosamente:', result);

      // Limpiar el formulario si la operación fue exitosa
      reset();
    } catch (error) {
      // Manejo de errores, imprimir en la consola el motivo del error
      console.error('Hubo un error al crear el registro:', error);
    }
  };
		


	return (
		<div className=' text-blue-50 flex items-center justify-center min-h-[calc(100vh-3rem)] dark'>
			<ToastContainer />
			<Card  className=' '>
				<CardHeader>
					Nuevo Idioma
				</CardHeader>
				<Divider />
				<CardBody>
					<form className=' gap-6' onSubmit={handleSubmit(onSubmit)}>
						
							<div className='mb-5'>
								<label htmlFor="nombre">Nombre</label>
								<Input  type="text" className='mt-1'
								{...register('nombre')}
								/>
							</div>

						<div>
							<Link href='/idiomas'>
							<Button color="danger" variant="light" className='mr-10 ml-60 mt-20' >
								Cancelar
							</Button>
							</Link>
							<Button type='submit' color='primary'>
								Guardar
							</Button>
						</div>
					</form>
				</CardBody>
			</Card>
			
		</div>
	)
}