

export default function HeaderAccordion({ imovel, open }) {
    return (
        <div className={`w-full flex flex-wrap transition-opacity ${open === imovel.id ? "opacity-10" : ""}`}>
            <section className={`${imovel.comercializacao === "Venda" ? "text-red-600" : "text-green-900"} w-full flex items-center md:w-auto md:basis-1/3`}>
                {imovel.comercializacao.toUpperCase()}
            </section>
            <div className="w-full flex justify-between items-center mt-2 md:w-auto md:mt-0 md:basis-2/3">
                <section className="h-auto flex justify-center items-center text-gray-700">
                    {imovel.tipo}
                </section>
                <section className="flex flex-col text-sm text-nowrap">
                    <span className="">
                        {imovel.cidade}
                    </span>
                    <span className="">
                        {imovel.bairro}
                    </span>
                </section>
            </div>
        </div>
    );
}