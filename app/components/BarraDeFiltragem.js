import { Button, ButtonGroup } from "../lib/material-tailwind.config";

export default function BarraDeFiltragem({handleChangeFiltro, btnAtual}) {
    
    function handleClick(e) {
        handleChangeFiltro(e.target.value);
    }

    return (
        <section className="w-full flex items-center justify-center">
            <ButtonGroup variant="text" className="w-full flex sm:justify-center" >
                <Button
                    className={`${getClassBgColor(btnAtual, 'todos')} ${getClassStandard()}`}
                    value={'todos'}
                    onClick={handleClick}
                >
                    Todos
                </Button>

                <Button
                    className={`text-blue-600 ${getClassBgColor(btnAtual, 'nao_realizado')} ${getClassStandard()}`}
                    value={'nao_realizado'}
                    onClick={handleClick}
                >
                    Não realizado
                </Button>

                <Button
                    className={`text-green-600 ${getClassBgColor(btnAtual, 'aprovado')} ${getClassStandard()}`}
                    value={'aprovado'}
                    onClick={handleClick}
                >
                    Aprovados
                </Button>

                <Button
                    className={`text-red-600 ${getClassBgColor(btnAtual, 'rejeitado')} ${getClassStandard()}`}
                    value={'rejeitado'}
                    onClick={handleClick}
                >
                    Rejeitados
                </Button>
            </ButtonGroup>
        </section>
    );
}

function getClassBgColor(btnAtual, value) {
    return btnAtual === value ? 'bg-gray-100' : 'bg-transparent';
}

function getClassStandard() {
    return 'p-0 py-4 grow sm:grow-0 sm:p-4';
}