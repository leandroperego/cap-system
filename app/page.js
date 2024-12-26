import Image from 'next/image';
import HeaderPages from './components/HeaderPages';
import { Typography } from './lib/material-tailwind.config';

export default function Home() {
    return (
        <>
            <HeaderPages title="Bem vindo" />
            <div className="h-full mx-auto max-w-7xl pt-14 p-8 sm:px-6 lg:px-8 2xl:mx-auto flex flex-col grow items-center">
                <div className='w-full flex flex-col gap-5 items-center'>
                    <Typography variant="h3" className='text-wrap'>Sistema de gerenciamento de imóveis</Typography>
                    <div>
                        <Typography variant="lead">Gerencie seus levantamentos de imóveis e mantenha tudo organizado!</Typography>
                        <Typography variant="lead">Cadastre novos imóveis, siga a lista de contatos e fale com todos.</Typography>
                    </div>
                </div>
                <Image src="/cadastro-img.png" alt="Logo sistema" width={500} height={500}/>
            </div>
        </>
    );
}
