"use client";

import { Typography } from "../../../lib/material-tailwind.config";
import { useContext } from "react";
import { ImovelContext } from "../../../context/imovel-context";

export default function TabBodyIdentificacao() {

    const imovel = useContext(ImovelContext);

    return (
        <section className="flex justify-between items-center">
            <div className="w-full h-full flex flex-col justify-around">
                <Typography variant="h4" className="mb-2 text-black">
                    {imovel.tipo.toUpperCase()}
                </Typography>
                <Typography >
                    Bairro: <span className="font-bold">{imovel.bairro}</span>
                </Typography>
                <Typography>
                    {imovel.cidade}
                </Typography>
            </div>

            <img src={imovel.img} alt="foto do imóvel" className="rounded-2xl object-contain w-[150px] h-[150px] hidden md:block " />

        </section>
    )
}