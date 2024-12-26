"use client";

import { Textarea, Button } from "../../../lib/material-tailwind.config";
import { useState } from "react";
import { useContext } from "react";
import { ImovelContext } from "../../../context/imovel-context";
import { updateImovel } from "../../../infra/db/collections/imoveis";

export default function TabBodyAnotacoes() {

  const imovel = useContext(ImovelContext);

  const [isModified, setIsModified] = useState(false);
  const [contatoAnotacoes, setContatoAnotacoes] = useState(imovel.anotacoes);

  const handleChange = (e) => {
    setIsModified(true);
    setContatoAnotacoes(e.target.value);
  }

  const handleCancel = () => {
    setContatoAnotacoes(imovel.anotacoes);
    setIsModified(!isModified);
  }

  const handleAtualizacao = async () => {

    await updateImovel(imovel.id, { anotacoes: contatoAnotacoes })
            .then(() => {
                alert("Anotações atualizadas com sucesso.")
            })
            .catch((error) => {
                alert("Houve um erro: " + error.message);
            });
  }

  return (
    <div className="relative">
      <Textarea
        name={`anotacoes-${imovel.id}`}
        id={`anotacoes-${imovel.id}`}
        className="text-xl"
        variant="static"
        placeholder="Faça aqui suas anotações"
        rows={8}
        value={contatoAnotacoes}
        onChange={handleChange}
      />
      <div className="flex w-full justify-end py-1.5">
        <div className="flex gap-2">
          <Button size="sm" color="red" variant="text" className="rounded-md" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button size="sm" color="green" className="rounded-md" onClick={handleAtualizacao} disabled={!isModified}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}