import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default class ArquivoController {

    static getHinos() {
        const diretorio = path.join(process.cwd(), 'app', 'arquivos', 'times', 'hinos');

        const nomeArquivos = fs.readdirSync(diretorio);

        const dados = nomeArquivos.map((nomeArquivo) => {
            const id = nomeArquivo.replace('.mdx', '');
            const fullPath = path.join(diretorio, nomeArquivo);
            const conteudo = fs.readFileSync(fullPath, 'utf-8');
            const hino = matter(conteudo);

            return {
                id,
                ...hino,
            };
        });

        return dados.sort((a, b) => {
            if (a.data.time < b.data.time) {
                return -1;
            }
            if (a.data.time > b.data.time) {
                return 1;
            }
            return 0;
        });
    }

    static getHinoById(id) {
        const dados = this.getHinos();

        return dados.find((hino) => hino.id === id);
    }
}