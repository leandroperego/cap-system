"use client";
import Image from "next/image";
import Link from "next/link";
import MenuNavegacaoMobile from "./MenuNavegacaoMobile";
import CardMenu from "./CardMenu";

export default function LayoutResponsivo() {
    return (
        <>
            <aside className="lg:hidden flex justify-between items-center py-2 px-6">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        className="h-8 w-auto"
                        width={50}
                        height={50}
                    />
                </Link>
                <MenuNavegacaoMobile />
            </aside>
            <aside className="hidden lg:flex flex-col w-1/3 h-screen fixed top-0 left-0 bg-blue-gray-800 2xl:w-1/4">
                <CardMenu />
            </aside>
        </>

    )
}