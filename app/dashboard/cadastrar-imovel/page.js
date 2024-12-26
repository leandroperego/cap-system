import FormCadastroContato from "../../components/Forms/formsComponents/FormCadastroContato";
import HeaderPages from '../../components/HeaderPages';

export default function CadastrarContato() {
    return (
        <>
            <HeaderPages title="Cadastrar novo contato"/>
            <div className="mx-auto max-w-5xl p-6 sm:px-8 lg:px-10 2xl:mx-auto">
                <FormCadastroContato />
            </div>
        </>
    );
}