import {
    Radio,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
    IconButton,
} from "../../../lib/material-tailwind.config";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { useState, useContext, useEffect } from "react";
import { ImovelContext } from "../../../context/imovel-context";
// import { ListaImoveisContext } from "../../../context/lista-imoveis-context";
import { updateImovel } from "../../../infra/db/collections/imoveis";

export default function GroupRadioAction() {

    const imovelAtual = useContext(ImovelContext);
    // const { updateLista, setUpdateLista } = useContext(ListaImoveisContext);

    const [radioChecked, setRadioChecked] = useState();
    const [isModified, setIsModified] = useState();

    useEffect(() => {
        setRadioChecked(imovelAtual.status);
        setIsModified(false);
    }, [imovelAtual.status])


    const handleChange = (e) => {
        setRadioChecked(e.target.value);
        setIsModified(true);
    }

    const handleCancelChange = () => {
        setRadioChecked(imovelAtual.status);
        setIsModified(false);
    }

    const handleConfirmRadio = async () => {
        await updateImovel(imovelAtual.id, { status: radioChecked })
            .then(() => {
                alert("Imóvel atualizado com sucesso!");
            })
            .catch((error) => {
                alert("Houve um erro: " + error.message);
            });

        setRadioChecked(imovelAtual.status);
        setIsModified(false);
        // setUpdateLista(!updateLista);
    };

    return (
        <Card key={imovelAtual.id} className="min-w-fit flex flex-row flex-wrap items-center justify-around grow">
            <List className="w-full flex-row flex-wrap justify-center">
                <ListItem className="max-w-fit p-0">
                    <label
                        htmlFor={`aprovado-${imovelAtual.id}`}
                        className="flex w-full cursor-pointer items-center p-2"
                    >
                        <ListItemPrefix className="mr-3">
                            <Radio
                                color="green"
                                checked={radioChecked == "aprovado"}
                                name={`validacao-${imovelAtual.id}`}
                                id={`aprovado-${imovelAtual.id}`}
                                value={"aprovado"}
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                                onClick={(e) => setRadioChecked(e.target.id)}
                                onChange={handleChange}
                            />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="font-medium text-green-600"
                        >
                            Aprovou
                        </Typography>
                    </label>
                </ListItem>
                <ListItem className="max-w-fit p-0">
                    <label
                        htmlFor={`rejeitado-${imovelAtual.id}`}
                        className="flex w-full cursor-pointer items-center p-2"
                    >
                        <ListItemPrefix className="mr-3">
                            <Radio
                                color="red"
                                checked={radioChecked == "rejeitado"}
                                name={`validacao-${imovelAtual.id}`}
                                id={`rejeitado-${imovelAtual.id}`}
                                value={"rejeitado"}
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0",
                                }}
                                onClick={(e) => setRadioChecked(e.target.id)}
                                onChange={handleChange}
                            />
                        </ListItemPrefix>
                        <Typography
                            color="blue-gray"
                            className="font-medium text-red-600"
                        >
                            Rejeitou
                        </Typography>
                    </label>
                    
                </ListItem>
            </List>

            <div className={radioChecked && isModified ? "flex flex-row pb-3" : "hidden"}>
                <IconButton variant="outlined" color="red" size="sm" className="mr-4">
                    <XMarkIcon className="h-6 w-6 text-red-900" onClick={handleCancelChange}/>
                </IconButton>
                <IconButton variant="outlined" color="green" size="sm" className="mr-4" onClick={handleConfirmRadio}>
                    <CheckIcon className="h-6 w-6 text-green-900" />
                </IconButton>
            </div>
        </Card>
    );
}