"use client";

import { Input, Button, Spinner } from "../lib/material-tailwind.config";
import CardInput from "../components/Forms/formsComponents/CardInput";
import ContainerForm from "../components/Forms/formsComponents/ContainerForm";
import RowForm from "../components/Forms/formsComponents/RowForm";
import * as formik from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { criarUsuario } from "../infra/db/login/user";

export default function CriarConta() {

    const router = useRouter();
    const { Formik } = formik;

    const schema = yup.object().shape({
        nome: yup.string().required("Nome obrigatório"),
        email: yup.string().email().required("Email obrigatório"),
        password: yup.string().required("Senha obrigatória"),
    });

    const setUserForLogin = (values) => {
        sessionStorage.setItem("user", JSON.stringify({ email: values.email }));
        router.push("/login");
    }

    const handleSubmit = async (values, resetForm) => {
        
        const usuarioRef = await criarUsuario(values);

        if (!usuarioRef) {
            alert("Houve um erro ao criar sua conta. Tente novamente");
            return;
        } else {
            alert("Conta criada com sucesso. Faça o login para continuar.");
        }
        
        resetForm();
        
        setUserForLogin(values);
        
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src="/logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Crie sua conta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <Formik
                        validationSchema={schema}
                        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                        initialValues={{
                            nome: '',
                            email: '',
                            password: '',
                        }}
                    >
                        {
                            ({ handleSubmit, handleChange, resetForm, values, touched, errors, isSubmitting }) => (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <ContainerForm >
                                        <RowForm>
                                            <CardInput
                                                isInvalided={touched.nome && errors.nome}
                                                error={errors.nome}
                                            >
                                                <label htmlFor="nome" className="block text-sm pb-2 pl-1 font-medium leading-6 text-gray-900">Nome</label>
                                                <Input
                                                    type="text"
                                                    name="nome"
                                                    id="nome"
                                                    autoComplete="nome"
                                                    className={`pr-20 !border !border-gray-500 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10`}
                                                    labelProps={{
                                                        className: 'hidden',
                                                    }}
                                                    value={values.nome}
                                                    onChange={handleChange}
                                                />

                                            </CardInput>
                                        </RowForm>
                                        <RowForm>
                                            <CardInput
                                                isInvalided={touched.email && errors.email}
                                                error={errors.email}
                                            >
                                                <label htmlFor="email" className="block text-sm pb-2 pl-1 font-medium leading-6 text-gray-900">Endereço de Email:</label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    autoComplete="email"
                                                    className={`pr-20 !border !border-gray-500 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10`}
                                                    labelProps={{
                                                        className: 'hidden',
                                                    }}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    error={touched.email && errors.email}
                                                />

                                            </CardInput>
                                        </RowForm>
                                        <RowForm>
                                            <CardInput
                                                isInvalided={touched.password && errors.password}
                                                error={errors.password}
                                            >
                                                {/* TODO colocar icone de revelar senha */}
                                                <label htmlFor="password" className="block text-sm pb-2 pl-1 font-medium leading-6 text-gray-900">Senha:</label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className={`pr-20 !border !border-gray-500 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10`}
                                                    labelProps={{
                                                        className: 'hidden',
                                                    }}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                />

                                            </CardInput>
                                        </RowForm>
                                        <RowForm>
                                            <CardInput>
                                                <Button type="submit" fullWidth className="flex items-center justify-center gap-2" color="blue">
                                                    {
                                                        isSubmitting &&
                                                        <Spinner className="h-4 w-4" />
                                                    }
                                                    Criar conta
                                                </Button>
                                            </CardInput>
                                        </RowForm>
                                    </ContainerForm>
                                </form>
                            )
                        }
                    </Formik>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Já tem cadastro?{' '}
                        <Link href={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Entre aqui
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}