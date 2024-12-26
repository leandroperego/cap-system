"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Card,
    IconButton
} from "../lib/material-tailwind.config";

import {
    PlusCircleIcon,
    PhoneArrowUpRightIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";

import {
    XMarkIcon,
} from "@heroicons/react/24/outline";

import { efetuarLogout } from "../infra/db/login/user";
import { getImoveis } from "../infra/db/collections/imoveis";
import Image from "next/image";

export default function CardMenu({ closeCard }) {

    const [listaImoveis, setListaImoveis] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const imoveis = await getImoveis();
            setListaImoveis(imoveis);
        }

        fetchData();
    }, []);
    
    const router = useRouter();

    const tamanhoLista = useMemo(() => {
        return listaImoveis?.filter(imovel => imovel.status === '').length || 0;
    }, [listaImoveis]);

    const handleLogout = async () => {
        closeCard();
        await efetuarLogout();
        router.push("/login");
    }

    return (
        <Card
            color="transparent"
            shadow={false}
            className="h-[calc(100vh-2rem)] w-full p-4"
        >
            <div className="mb-2 flex items-center justify-between lg:justify-normal lg:gap-4 p-4">
                <Link href={"/"} onClick={closeCard}>
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={50}
                        height={50}
                    />
                </Link>
                <Typography variant="h5" className="text-blue-gray lg:text-white">
                    CapSystem
                </Typography>
                <IconButton variant="text" size="sm" className="lg:hidden" onClick={closeCard}>
                    <XMarkIcon className="h-6 w-6 stroke-2" />
                </IconButton>
            </div>
            <List className="lg:*:text-white">
                <Link href={"/dashboard/cadastrar-imovel"} onClick={closeCard}>
                    <ListItem>
                        <ListItemPrefix>
                            <PlusCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Cadastrar imóvel
                    </ListItem>
                </Link>

                <Link href={"/dashboard/listagem-contatos"} onClick={closeCard}>
                    <ListItem>
                        <ListItemPrefix>
                            <PhoneArrowUpRightIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Contatos a fazer
                        <ListItemSuffix>
                            <Chip
                                value={tamanhoLista}
                                size="sm"
                                variant="ghost"
                                className="rounded-full text-blue-gray lg:*:text-blue-gray-50 lg:bg-blue-gray-300"
                            />
                        </ListItemSuffix>
                    </ListItem>
                </Link>

                <ListItem onClick={handleLogout}>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Sair
                </ListItem>
            </List>
        </Card>
    );
}