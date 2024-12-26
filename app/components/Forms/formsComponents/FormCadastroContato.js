
"use client";

import * as formik from 'formik';
import * as yup from 'yup';

import {
    Input,
    Select,
    Option,
    Button,
    Spinner,
    Textarea,
} from "../../../lib/material-tailwind.config";
import CardInput from './CardInput';
import RowForm from './RowForm';
import ContainerForm from './ContainerForm';
import { addImovel } from '../../../infra/db/collections/imoveis';

export default function FormCadastroContato() {
    const { Formik } = formik;
    // const {updateLista, setUpdateLista} = useContext(ListaImoveisContext)

    const tiposImoveis = [
        'Casa',
        'Apartamento',
        'Sobrado',
        'Ponto Comercial',
    ];

    const schema = yup.object().shape({
        comercializacao: yup.string().required().oneOf(['Venda', 'Aluguel']),
        tipo: yup.string().required("Tipo de imóvel é obrigatório").oneOf(tiposImoveis),
        endereco: yup.string(),
        cidade: yup.string().required('Campo obrigatório'),
        bairro: yup.string(),
        pontoRef: yup.string(),
        img: yup.string(),
        nome: yup.string(),
        telefone1: yup.string().required('Campo obrigatório'),
        telefone2: yup.string(),
        anotacoes: yup.string(),
    });

    const handleSubmit = async (data, reset) => {
        const imovelId = await addImovel({ ...data, status: '', anotacoes: '' });

        if (imovelId) {
            alert('Imóvel registrado com sucesso!');
            // setUpdateLista(!updateLista);
            reset();
        } else {
            alert('Houve um erro ao registrar o imóvel. Tente novamente');
        }

    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
            initialValues={{
                comercializacao: 'Venda',
                tipo: '',
                cidade: '',
                endereco: '',
                bairro: '',
                pontoRef: '',
                img: 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg',
                nome: '',
                telefone1: '',
                telefone2: '',
                anotacoes: '',
            }}
        >
            {
                ({ handleSubmit, handleChange, resetForm, values, setValues, touched, errors, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        {/* Dados do Imóvel */}
                        <ContainerForm title='Dados do Imóvel'>
                            <RowForm>
                                <CardInput
                                    isInvalided={touched.comercializacao && errors.comercializacao}
                                    error={errors.comercialacao}
                                >
                                    <Select
                                        label="Comercialização"
                                        name="comercializacao"
                                        value={values.comercializacao}
                                        onChange={(val) => { setValues({ ...values, comercializacao: val }); handleChange }}
                                    >
                                        <Option value="Venda">Venda</Option>
                                        <Option value="Aluguel">Aluguel</Option>
                                    </Select>
                                </CardInput>

                                <CardInput
                                    isInvalided={touched.tipo && errors.tipo}
                                    error={errors.tipo}
                                >
                                    <Select
                                        label="Tipo de Imóvel"
                                        name="tipo"
                                        value={values.tipo}
                                        onChange={(val) => { setValues({ ...values, tipo: val }); handleChange }}
                                        error={touched.tipo && errors.tipo}
                                    >
                                        {
                                            tiposImoveis.map((tipo, index) => (
                                                <Option value={tipo} key={index}>{tipo}</Option>
                                            ))
                                        }
                                    </Select>
                                </CardInput>
                            </RowForm>

                            <RowForm>
                                <CardInput>
                                    <Input
                                        label="Endereço"
                                        name="endereco"
                                        value={values.endereco}
                                        onChange={handleChange}
                                    />
                                </CardInput>
                            </RowForm>

                            <RowForm>
                                <CardInput
                                    isInvalided={touched.cidade && errors.cidade}
                                    error={errors.cidade}
                                >
                                    <Input
                                        label="Cidade"
                                        name="cidade"
                                        value={values.cidade}
                                        onChange={handleChange}
                                        error={touched.cidade && errors.cidade}
                                    />
                                </CardInput>

                                <CardInput>
                                    <Input
                                        label="Bairro"
                                        name="bairro"
                                        value={values.bairro}
                                        onChange={handleChange}
                                    />
                                </CardInput>

                                <CardInput>
                                    <Input
                                        label="Ponto de Referência"
                                        name="pontoRef"
                                        value={values.pontoRef}
                                        onChange={handleChange}
                                    />
                                </CardInput>
                            </RowForm>
                            {/* <RowForm>
                                <CardInput>
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block pl-2 text-sm font-medium leading-6 text-blue-gray-500">
                                            Foto do Imóvel
                                        </label>
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer"
                                        >
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">

                                                <div className="text-center">
                                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">

                                                        <span className='text-blue-800'>Carregue a foto</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                        <p className="pl-1">ou arraste e solte aqui</p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                </div>

                                            </div>
                                        </label>
                                    </div>
                                </CardInput>
                            </RowForm> */}
                            <RowForm>
                                <CardInput>
                                    <Input
                                        label="Imagem do Imóvel"
                                        name="img"
                                        value={values.img}
                                        onChange={handleChange}
                                    />
                                </CardInput>
                            </RowForm>
                        </ContainerForm>

                        {/* Dados de Contato */}
                        <ContainerForm title='Dados de Contato'>
                            <RowForm>

                                <CardInput>
                                    <Input
                                        label="Nome do responsável"
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange}
                                    />
                                </CardInput>

                                <CardInput
                                    isInvalided={touched.telefone1 && errors.telefone1}
                                    error={errors.telefone1}
                                >
                                    <Input
                                        label="Telefone 1"
                                        name="telefone1"
                                        value={values.telefone1}
                                        onChange={handleChange}
                                        error={touched.telefone1 && errors.telefone1}
                                    />
                                </CardInput>

                                <CardInput>
                                    <Input
                                        label="Telefone 2"
                                        name="telefone2"
                                        value={values.telefone2}
                                        onChange={handleChange}
                                    />
                                </CardInput>

                            </RowForm>
                            <ContainerForm title={'Anotações gerais'} containerProps={{ className: '!mb-0' }}>
                                <RowForm>
                                    <CardInput >
                                        <Textarea
                                            className="text-sm"
                                            variant="outlined"
                                            label='Anotações'
                                            name='anotacoes'
                                            rows={5}
                                            value={values.anotacoes}
                                            onChange={handleChange}
                                        />
                                    </CardInput>
                                </RowForm>
                            </ContainerForm>

                        </ContainerForm>
                        <Button
                            color="blue"
                            className="min-w-min w-full sm:w-2/5 md:w-1/5 lg:w-auto flex items-center justify-center gap-2"
                            type='submit'
                        >
                            {
                                isSubmitting &&
                                <Spinner className='w-4 h-4' />
                            }
                            Cadastrar
                        </Button>
                    </form>
                )
            }

        </Formik>
    );
}