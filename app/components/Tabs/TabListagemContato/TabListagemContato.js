"use client";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "../../../lib/material-tailwind.config";
import TabBodyIdentificacao from "./TabBodyIdentificacao";
import TabBodyContato from "./TabBodyContato";
import TabBodyAnotacoes from "./TabBodyAnotacoes";
import { useContext } from "react";
import { ImovelContext } from "../../../context/imovel-context";

export default function TabListagemContato() {

  const imovel = useContext(ImovelContext);

  const tabs = [
    {
      label: "Identificação",
      value: `id-${imovel.id}`,
      desc: <TabBodyIdentificacao />,
    },
    {
      label: "Contato",
      value: `contato-${imovel.id}`,
      desc: <TabBodyContato/>,
    },
    {
      label: "Anotações",
      value: `anotacoes-${imovel.id}`,
      desc: <TabBodyAnotacoes/>,
    },
  ];

  return (
    <Tabs key={imovel.id} value={`id-${imovel.id}`}>
      <TabsHeader
        className="bg-gray-300 p-3 pb-0 rounded-b-none flex-col"
        indicatorProps={{
          className: "bg-white shadow-none rounded-b-none !text-gray-900",
        }}
      >
        <header className="pr-3 mb-2 hidden md:block">
          <h3 className={`text-2xl font-bold text-right ${imovel.comercializacao === "Venda" ? "text-red-600" : "text-green-600"}`}>{imovel.comercializacao}</h3>
        </header>
        <div className="w-full flex justify-evenly md:justify-start md:gap-5 ">
          {tabs.map(({ label, value }) => (
            <Tab key={value} value={value} className="md:w-auto">
              {label}
            </Tab>
          ))}
        </div>
      </TabsHeader>

      <TabsBody>
          {tabs.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
      </TabsBody>
    </Tabs>
  );
}