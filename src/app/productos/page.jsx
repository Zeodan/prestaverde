'use client'

import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import TablaProductos from '@/components/Productos/TablaProductos/TablaProductos'
import { Card, CardHeader, CardBody, Divider, Link, Button } from '@nextui-org/react'
import { FaProductHunt, FaPlus  } from 'react-icons/fa'


export default function Productos() {
  return (
    <Card className="dark flex flex-col  ">
          <CardHeader className="flex">
            <div className="flex gap-3 items-center">
              <FaProductHunt />
              Productos
            </div>
            <div className="ml-96">
              <Link  href="/productos/nuevo_producto" className=" gap-1 text-slate-300" isBlock >
                  <FaPlus />
                  Nuevo Producto
              </Link>
            </div> 
            
          </CardHeader>
          <Divider />
          <CardBody>
            <TablaProductos />
          </CardBody>
        </Card>
    
  )
}