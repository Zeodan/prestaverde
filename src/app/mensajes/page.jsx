import React from 'react'
import TablaMensajes from '@/components/Mensajes/TablaMensajes/TablaMensajes'
import { Card, CardHeader, CardBody, Divider, Link } from '@nextui-org/react'
import { FaEnvelope, FaPlus  } from 'react-icons/fa'


export default function Mensajes() {
  return (
    <Card className="dark">
          <CardHeader className="flex">
            <div className="flex gap-3 items-center">
              <FaEnvelope />
              Mensajes
            </div>
            <div className="ml-96">
              <Link  href="/mensajes/nuevo_mensaje" className=" gap-1 text-slate-300" isBlock >
                  <FaPlus />
                  Nuevo Mensaje
              </Link>
            </div>
            
          </CardHeader>
          <Divider />
          <CardBody>
            <TablaMensajes />
          </CardBody>
        </Card>
    
  )
}