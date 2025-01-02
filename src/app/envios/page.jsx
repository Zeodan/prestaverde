'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@nextui-org/react';
import { generarCorreos } from '@/libs/generarCorreos';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Envios() {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [botonEnviar, setBotonEnviar] = useState("Espere por favor ...");
  const [disableEnviar, setdisableEnviar] = useState(true);
  const [correos, setCorreos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const correosGenerados = await generarCorreos();
      setCorreos(correosGenerados);
      setdisableEnviar(false);
      setBotonEnviar('Iniciar Envío');
    };

    // Usando toast.promise para manejar la promesa
    const promesa = obtenerDatos();
    toast.promise(
      promesa,
      {
        pending: 'Preparando datos...',
        success: 'Datos preparados',
        error: 'Error al preparar los datos'
      },
      {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }, []);

  // Inicia el proceso de envío de correos
  const startEmailSending = async () => {
    setBotonEnviar("Enviando");
    setProgress(true);
    setdisableEnviar(true);
    setStatusMessage('Enviando correos...');

    const envioPromesa = fetch(`${process.env.NEXT_PUBLIC_API_URL}/pv-api/enviar_correos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(correos),
    });

    toast.promise(
      envioPromesa,
      {
        pending: 'Enviando correos...',
        success: 'Todos los correos han sido enviados',
        error: 'Hubo un error al enviar los correos'
      },
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

    const response = await envioPromesa;

    if (response.ok) {
      setStatusMessage('Todos los correos han sido enviados');
      setProgress(false);
      setBotonEnviar("Iniciar Envío");
      setdisableEnviar(false);
    } else {
      setStatusMessage('Hubo un error al enviar los correos');
      setProgress(false);
      setBotonEnviar("Iniciar Envío");
      setdisableEnviar(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-[calc(100vh-3rem)]">
        <div className="text-center items-center">
          <Button isDisabled={disableEnviar} onClick={startEmailSending} className="dark te mb-4 text-xl w-48 h-12 text-blue-200">{botonEnviar}</Button>
          <div className='flex items-center justify-center mt-5 mb-5'>
            {progress && <CircularProgress className='' color="success" size='lg' />}
          </div>
          <div className='text-blue-200 text-xl'>
            {statusMessage}
          </div>
        </div>
      </div>
    </>
  );
}

