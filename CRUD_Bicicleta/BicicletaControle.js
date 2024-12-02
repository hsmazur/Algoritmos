let listaBicicleta = [];
let oQueEstaFazendo = '';
let bicicleta = null;
bloquearAtributos(true);

function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaBicicleta.length; i++) {
        const bicicleta = listaBicicleta[i];
        if (bicicleta.id == chave) {
            bicicleta.posicaoNaLista = i;
            return listaBicicleta[i];
        }
    }
    return null;
}

function procure() {
    const id = document.getElementById("id").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("id").focus();
        return;
    }

    if (id) { 
        bicicleta = procurePorChavePrimaria(id);
        if (bicicleta) { 
            mostrarDadosBicicleta(bicicleta);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { 
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("id").focus();
        return;
    }
}

function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("id").focus();
}

function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    let id;
    if (bicicleta == null) {
        id = parseInt(document.getElementById("id").value);
    } else {
        id = bicicleta.id;
    }

    const nome= document.getElementById("nome").value;
    const fabricante= document.getElementById("fabricante").value;
    const dataDeLancamento= document.getElementById("dataDeLancamento").value;
    const preco= parseFloat(document.getElementById("preco").value);
    const peso= parseFloat(document.getElementById("peso").value);
if(id && nome && fabricante && dataDeLancamento && preco && peso ){
        switch (oQueEstaFazendo) {
            case 'inserindo':
                bicicleta = new Bicicleta(id,nome,fabricante,dataDeLancamento,preco,peso);
                listaBicicleta.push(bicicleta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                bicicletaAlterado = new Bicicleta(id,nome,fabricante,dataDeLancamento,preco,peso);
                listaBicicleta[bicicleta.posicaoNaLista] = bicicletaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaBicicleta.length; i++) {
                    if (bicicleta.posicaoNaLista != i) {
                        novaLista.push(listaBicicleta[i]);
                    }
                }
                listaBicicleta = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("id").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto += 
         linha.id + " - " + 
         linha.nome + " - " + 
         linha.fabricante + " - " + 
         linha.dataDeLancamento + " - " + 
         linha.preco + " - " + 
         linha.peso+"<br>";
    }
    return texto;
}

function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaBicicleta);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");}

function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosBicicleta(bicicleta) {
    document.getElementById("id").value = bicicleta.id;
    document.getElementById("nome").value = bicicleta.nome;
    document.getElementById("fabricante").value = bicicleta.fabricante;
    document.getElementById("dataDeLancamento").value = bicicleta.dataDeLancamento;
    document.getElementById("preco").value = bicicleta.preco;
    document.getElementById("peso").value = bicicleta.peso;
    bloquearAtributos(true);
}

function limparAtributos() {
    document.getElementById("nome").value = "";
    document.getElementById("fabricante").value = "";
    document.getElementById("dataDeLancamento").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("peso").value = "";
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("id").readOnly = !soLeitura;
    document.getElementById("nome").readOnly = soLeitura;
    document.getElementById("fabricante").readOnly = soLeitura;
    document.getElementById("dataDeLancamento").readOnly = soLeitura;
    document.getElementById("preco").readOnly = soLeitura;
    document.getElementById("peso").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar;
    document.getElementById("id").focus();
}

//salvamento no disco
function prepararESalvarCSV() {
    let nomeDoArquivoDestino = "./Bicicleta.csv";
    let textoCSV = "";
    for (let i = 0; i < listaBicicleta.length; i++) {
        const linha = listaBicicleta[i];
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.fabricante + ";" +
            linha.dataDeLancamento + ";" +
            linha.preco + ";" +
            linha.peso + "\n";
    }
    persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}

function persistirEmLocalPermanente(nomeArq, conteudo) {
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArq;
    link.click();
    URL.revokeObjectURL(link.href);
}

function abrirArquivoSalvoEmLocalPermanente() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = function (event) {
        const arquivo = event.target.files[0];
        console.log(arquivo.name);
        if (arquivo) {
            converterDeCSVparaListaObjeto(arquivo);
        }
    };
    input.click();
}

function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result;
        const linhas = conteudo.split('\n');
        listaBicicleta = [];
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(';');
                if (dados.length === 6) {
                    listaBicicleta.push({
                        id: dados[0],
                        nome: dados[1],
                        fabricante: dados[2],
                        dataDeLancamento: dados[3],
                        preco: dados[4],
                        peso: dados[5]
                    });
                }
            }
        }
        listar();
    };
    leitor.readAsText(arquivo);
}

//funcoes pedidas segunda passada
function procurarPorPeso() {
    const pesoInformado = parseFloat(document.getElementById("pesoInformado").value);
    let texto = "";

    for (let i = 0; i < listaBicicleta.length; i++) {
        const linha = listaBicicleta[i];
        if (linha.peso < pesoInformado) {
            texto += 
                linha.id + " - " + 
                linha.nome + " - " + 
                linha.fabricante + " - " + 
                linha.dataDeLancamento + " - " + 
                linha.preco + " - " + 
                linha.peso + "<br>";
        }
    }
    if (texto === "") {
        document.getElementById("outputSaida").innerHTML = "Não encontrou nenhuma";
    } else {
        document.getElementById("outputSaida").innerHTML = texto;
    }
}

function procurarPreco() {
    let menorPreco = listaBicicleta[0].preco

    let texto = ""
    for (let i = 1; i < listaBicicleta.length; i++) {
        let linha = listaBicicleta[i];
        if (linha.preco < menorPreco) {
            menorPreco = linha.preco;
        }
    }
    for (let i = 0; i < listaBicicleta.length; i++) {
        let linha = listaBicicleta[i]
        if (linha.preco == menorPreco) {
            texto +=  linha.nome + "<br>"
        } 
    }
    document.getElementById("outputSaida").innerHTML = texto;

}
