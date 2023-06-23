import { useGlobalContext } from "@/context/globalContext";
import Link from "next/link";
import logo from '../../assets/images/logo.png';

import { Button, Navbar } from 'flowbite-react';
import Image from "next/image";

export default function HomeLayout({ children }) {
    const { user, setUserDetailsModal } = useGlobalContext();

    return (
        <>
            <Navbar
                fluid
                rounded
            >
                <Navbar.Brand as={Link} href="/">
                    <Image
                        alt="Flowbite React Logo"
                        className="mr-3 h-6 sm:h-9"
                        width={'32'}
                        height={'32'}
                        src={logo}
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Animal Bond
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Button as={Link} href="/sign-in">
                        Sign In
                    </Button>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/about"}>About</Link>
                    <Link href={"/services"}>Services</Link>
                </Navbar.Collapse>
            </Navbar>
            <main>
                {children}
            </main>
        </>
    )
}