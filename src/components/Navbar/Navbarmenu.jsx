'use client'

import { FaHome, FaUserTie, FaProductHunt, FaTruck, FaRegSun, FaLanguage, FaEnvelope    } from "react-icons/fa";
import { useState } from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarItem, NavbarMenuItem, Link, Button, Image} from "@nextui-org/react";




export default function Navbarmenu() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Clientes",
    "Productos",
    "Idiomas",
    "Mensajes",
    "Configuracion",
    "Tests",
  ];

  return (
    <Navbar position='static' onMenuOpenChange={setIsMenuOpen} className='bg-lime-600 h-12'>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand className=" my-auto mr-20">
        <p className="font-bold text-inherit text-3xl" >Super comercial</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem className="">
              <Link color="foreground" href="/" className=" gap-1 " isBlock >
                <FaHome />
                Inicio
              </Link>
        </NavbarItem >
        <NavbarItem className=''>
            <Link color="foreground" href="/clientes" variant='solid' className=" gap-1 " isBlock> 
              <FaUserTie />
              Clientes
            </Link>
        </NavbarItem>
        <NavbarItem className=''>
            <Link color="foreground" href="/productos" className=" gap-1 " isBlock>
              <FaProductHunt />
              Productos
            </Link>
        </NavbarItem>
        <NavbarItem className=''>
            <Link color="foreground" href="/mensajes" variant='solid' className=" gap-1 " isBlock> 
              <FaEnvelope />
              Mensajes
            </Link>
        </NavbarItem>
        <NavbarItem className=''>
            <Link color="foreground" href="/idiomas" className=" gap-1 " isBlock>
              <FaLanguage />
              Idiomas
            </Link>
        </NavbarItem>
        <NavbarItem className=''>
            <Link color="foreground" href="/envios" className=" gap-1 " isBlock>
            <FaTruck />
              Envios
            </Link>
        </NavbarItem>
        <NavbarItem className=''>
            <Link color="foreground" href="/configuracion" className=" gap-1 " isBlock>
              <FaRegSun />
              Configuracion
            </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Menu version Movil */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
