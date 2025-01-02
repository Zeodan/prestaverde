import React from 'react'
import TablaClientes from '@/components/Clientes/TablaClientes/TablaClientes'
import { Card, CardHeader, CardBody, Divider, Link } from '@nextui-org/react'
import { FaUserTie, FaPlus } from "react-icons/fa";

export default function Clientes() {
  return (

    <div className='flex flex-col '>
      <Card className="dark">
          <CardHeader className="flex">
            <div className="flex gap-3 items-center">
              <FaUserTie />
              Clientes
            </div>
            <div className="ml-96">
              <Link  href="/clientes/nuevo_cliente" className=" gap-1 text-slate-300" isBlock >
                  <FaPlus />
                  Nuevo Cliente
              </Link>
            </div>
            
          </CardHeader>
          <Divider />
          <CardBody>
            <TablaClientes />
          </CardBody>
        </Card>
    </div>
  )
}