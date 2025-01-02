'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody, Divider, Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { CldUploadWidget } from 'next-cloudinary';
import Link from 'next/link';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Formulario de creación de nuevo producto
export default function NuevoProducto() {
  //Funciones del módulo React Hook Form
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Realizar la petición POST
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/productos`, {
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
      toast.success('Producto creado', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Limpiar el formulario si la operación fue exitosa
      reset();
      console.log('Registro creado exitosamente:', result);
    } catch (error) {
      // Manejo de errores, imprimir en la consola el motivo del error
      console.error('Hubo un error al crear el registro:', error);
      toast.error('Error al crear el registro', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const [fotoProducto, setfotoProducto] = useState(undefined);

  return (
    <div className='text-blue-50 flex items-center justify-center min-h-[calc(100vh-3rem)] dark'>
      <ToastContainer />
      <Card className=''>
        <CardHeader>
          Nuevo Producto
        </CardHeader>
        <Divider />
        <CardBody>
          <form className='gap-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-5'>
              <label htmlFor="nombre">Nombre</label>
              <Input type="text" className='mt-1' {...register('nombre')} />
            </div>

            <div className='mb-5'>
              <label htmlFor="precio_palet">Precio Palet</label>
              <Input type="number" name='precio_palet' className='mt-1' {...register('precio_palet', { valueAsNumber: true })} />
            </div>

            <div className='mb-5'>
              <label htmlFor="precio">Precio</label>
              <Input type="number" className='mt-1' {...register('precio', { valueAsNumber: true })} />
            </div>

            <div className='mb-5'>
              <label className='' htmlFor="unidad_venta">Unidad de Venta : </label>
              <br/>
              <div className='flex flex-row gap-10'>
                <div className=''>
                  <label className='text-lg'>Kilo</label>
                  <br/>
                  <input className='w-5 h-5 mt-2' type='radio' name='unidad_venta' value='kilo' {...register("unidad_venta")} />
                </div>
                <div className=''>
                  <label className='text-lg'>Bulto</label>
                  <br/>
                  <input className='w-5 h-5 mt-2' type='radio' name='unidad_venta' value='bulto' {...register("unidad_venta")} />
                </div>
                <div className=''>
                  <label className='text-lg'>Pieza</label>
                  <br/>
                  <input className='w-5 h-5 mt-2' type='radio' name='unidad_venta' value='pieza' {...register("unidad_venta")} />
                </div>
              </div>
            </div>

            <div className='mb-5 mt-5'>
              <label htmlFor="precio_transporte">Precio Transporte</label>
              <Input type="number" className='mt-1' {...register('precio_transporte', { valueAsNumber: true })} />
            </div>

            <div className='mt-10'>
              <label htmlFor="foto">Imagen : </label>
              <CldUploadWidget 
                uploadPreset="productos"
                onSuccess={(results) => {
                  setValue("foto", results.info.url);
                  setfotoProducto(results.info.url);
                }}
              >
                {({ cloudinary, widget, open }) => (
                  <Button className='ml-16' onClick={() => open()}>
                    Subir imagen
                  </Button>
                )}
              </CldUploadWidget>
            </div>
            <div>
              {fotoProducto && (
                <Image src={fotoProducto} width={100} height={100} alt='foto' />
              )}
            </div>

            <div>
              <Link href='/productos'>
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
