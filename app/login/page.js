"use client";

import { Input, Button, Spinner } from "../lib/material-tailwind.config";
import CardInput from "../components/Forms/formsComponents/CardInput";
import ContainerForm from "../components/Forms/formsComponents/ContainerForm";
import RowForm from "../components/Forms/formsComponents/RowForm";
import * as formik from "formik";
import * as yup from "yup";
import { efetuarLogin } from "../infra/db/login/user";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getUsuarioLogado } from "../infra/db/login/user";
import Image from "next/image";

export default function Login() {

    const user = getUsuarioLogado();
  
    const router = useRouter();
    const { Formik } = formik;
  
    const schema = yup.object().shape({
      email: yup.string().email().required("Email obrigatório"),
      password: yup.string().required("Senha obrigatória"),
    });
  
    const handleSubmit = async (values, resetForm) => {
      const usuarioLogado = await efetuarLogin(values.email, values.password);
      if (!usuarioLogado) {
        alert("Email ou senha inválidos");
      } else {
        router.push("/");
      }
      resetForm();
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
              Entre com sua conta
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  
            <Formik
              validationSchema={schema}
              onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
              initialValues={{
                email: user?.email || '',
                password: '',
              }}
            >
              {
                ({ handleSubmit, handleChange, resetForm, values, touched, errors, isSubmitting }) => (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <ContainerForm >
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
                            error={touched.password && errors.password}
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
                            Entrar
                          </Button>
                        </CardInput>
                      </RowForm>
                    </ContainerForm>
                  </form>
                )
              }
            </Formik>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Ainda não tem cadastro?{' '}
              <Link href={'/criar-conta'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Crie sua conta aqui
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }