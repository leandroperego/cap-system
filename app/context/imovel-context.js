import { createContext } from "react";

export const ImovelContext = createContext({});

export const ImovelProvider = ({ children, imovel }) => {
    return (
        <ImovelContext.Provider value={imovel}>
            {children}
        </ImovelContext.Provider>
    );
}