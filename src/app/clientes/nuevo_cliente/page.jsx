'use client'

import { Card, CardHeader, CardBody, Divider, Input, Checkbox, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import ModalProductos from '@/components/Productos/ModalProductos/ModalProductos';
import ModalIdiomas from '@/components/Idiomas/ModalIdiomas/ModalIdiomas';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Formulario de creación de nuevo cliente
export default function NewClient() {
  //Funciones del módulo React Hook Form
  const { register, handleSubmit, setValue, reset } = useForm();

  //Función de captura y seteado de valores en el formulario desde la modal de Productos
  const handleModalProductosSubmit = (modalProductosData) => {
    setValue('productos', modalProductosData);
  };

  //Función de captura y seteado de valores en el formulario desde la modal de Idioma
  const handleModalIdiomaSubmit = (modalIdiomaData) => {
    setValue('idioma', modalIdiomaData);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Realizar la petición POST
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/clientes`, {
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

      // Mostrar notificación de éxito
      toast.success('Cliente creado', {
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
      toast.error('Error al crear el cliente', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className='text-blue-50 flex items-center justify-center min-h-[calc(100vh-3rem)] dark'>
      <ToastContainer />
      <Card className=''>
        <CardHeader>
          Nuevo Cliente
        </CardHeader>
        <Divider />
        <CardBody>
          <form className='grid grid-cols-2 gap-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-5'>
              <label htmlFor="empresa">Empresa</label>
              <Input type="text" className='mt-1' {...register('empresa')} />
            </div>

            <div className='mb-5'>
              <label htmlFor="nombre">Nombre Contacto</label>
              <Input type="text" name='nombre' className='mt-1' {...register('nombre')} />
            </div>

            <div className='mb-5'>
              <label htmlFor="email">Email</label>
              <Input type="email" className='mt-1' {...register('email')} />
            </div>

            <div className='mb-5'>
              <label htmlFor="telefono">Teléfono</label>
              <Input type="text" className='mt-1' {...register('telefono')} />
            </div>

            <div className='mb-5'>
              <label htmlFor="descuento">Descuento</label>
              <Input type="number" className='mt-1' {...register('descuento', { valueAsNumber: true })} />
            </div>

            <div className='mb-5'>
              <label htmlFor="precio_transporte">Precio Transporte</label>
              <Input type="number" className='mt-1' {...register('precio_transporte', { valueAsNumber: true })} />
            </div>

            <div className='justify-between flex mb-2 mt-2'>
              <label htmlFor="comunicaciones">Comunicaciones</label>
              <Checkbox type='checkbox' defaultSelected className='mr-8' {...register('comunicaciones')}></Checkbox>
            </div>

            <div className='mb-5 mt-2'>
              <label htmlFor="productos">Productos</label>
              <ModalProductos onSubmit={handleModalProductosSubmit} {...register('productos')} />
            </div>

            <div className='mb-5'>
              <label htmlFor="idioma">Idioma</label>
              <ModalIdiomas onSubmit={handleModalIdiomaSubmit} {...register('idioma')} />
            </div>

            <div>
              <Link href='/clientes'>
                <Button color="danger" variant="light" className='mr-10 ml-60 mt-20'>
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
  );
}
