let codigoFonte="";
        
    function gerarModel() {
        let nomeClasse = document.getElementById("inputNomeClasse").value;
        let atributos = document.getElementById("inputAtributos").value;
        let vetAtributos = atributos.split(",");

        codigoFonte = 
        "class " + nomeClasse + "{\n" +
        "   constructor (" + atributos + ") {\n";

        for (let i = 0; i < vetAtributos.length; i++) {
            const a = vetAtributos[i];
            codigoFonte += "          this." + a + " = " + a + ";\n";
        }
        codigoFonte+="          this.posicaoNaLista = null;\n" + "   }\n}\n";
            
        document.getElementById("taCodigoFonte").textContent = codigoFonte;
    }

    function gerarView(){
        let nomeClasse = document.getElementById("inputNomeClasse").value;
        let atributos = document.getElementById("inputAtributos").value;
        let vetAtributos = atributos.split(",");

        let tipos  = document.getElementById("inputTipos").value;
        let vetTipos = tipos.split(",");

        codigoFonte = 
        "<!DOCTYPE html> \n" +
        '<html lang="en"> \n\n'+
        "<head> \n"+
        '    <meta charset="UTF-8">\n'+
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'+
        "    <title>CRUD " + nomeClasse +"</title>\n"+
        "</head> \n\n"+
        "<body> \n\n"
        "    <h1>Cadastro de " +nomeClasse+":</h1>\n\n";

        const a = vetAtributos[0]
        codigoFonte += 
        '    <label for="'+a+'">'+a+':</label>\n' +
        '    <input type="number" name="'+a+'" id="'+a+'">\n\n';

        codigoFonte += 
        '    <input type="button" value="Procure" id="btProcure" onclick="procure()" style="display:inline;">\n' +
        '    <input type="button" value="Inserir" id="btInserir" onclick="inserir()" style="display:none;">\n'+
        '    <input type="button" value="Alterar" id="btAlterar" onclick="alterar()" style="display:none;">\n'+
        '    <input type="button" value="Excluir" id="btExcluir" onclick="excluir()" style="display:none;">\n\n' +       
        '    <br><br>\n\n';

        for (let i = 1; i < vetAtributos.length; i++) {
            const a = vetAtributos[i];
            const t = vetTipos[i];
            switch (t) {
                case 'text':
                    codigoFonte +=
                    '    <label for="'+a+'">'+a+':</label>\n' +
                    '    <input type="text" name="'+a+'" id="'+a+'">\n\n' + '    <br><br>\n\n';
                    break;
                case 'number':
                    codigoFonte +=
                    '    <label for="'+a+'">'+a+':</label>\n' +
                    '    <input type="number" name="'+a+'" id="'+a+'">\n\n' + '    <br><br>\n\n';
                    break;
                case 'date':
                    codigoFonte +=
                    '    <label for="'+a+'">'+a+':</label>\n' +
                    '    <input type="date" name="'+a+'" id="'+a+'">\n\n' + '    <br><br>\n\n';
                    break;
            }
        }

        codigoFonte +=
        '    <div id="divAviso" style="background-color: antiquewhite;"></div>\n' +
        '    <br>\n'+
        '    <input type="button" value="Salvar" id="btSalvar" onclick="salvar()" style="display:none;">\n'+
        '    <input type="button" value="Cancelar" id="btCancelar" onclick="cancelarOperacao()" style="display:none;">\n'+
        '    <br><br>\n'+
        '    <div id="outputSaida" style="background-color: aqua;">...</div>\n\n';

        codigoFonte +=
        '    <script src="./'+nomeClasse+'.js"><'+'/script>\n' +
        '    <script src="./'+nomeClasse+'Controle.js"><'+'/script>\n'+
        "</body>\n" +      
        "</html>";
        document.getElementById("taCodigoFonte").textContent = codigoFonte;
    }

    function gerarController(){
        let nomeClasse = document.getElementById("inputNomeClasse").value;
        let atributos = document.getElementById("inputAtributos").value;
        let vetAtributos = atributos.split(",");
        
        const lista = "lista" + nomeClasse;
        const tema = nomeClasse.toLowerCase();
        const chave = vetAtributos[0];
        let linha1 = "";
        let linha2 = "";
        let linha3 = "";
        let linha4 = "";

        codigoFonte = 
        "let " + lista + " = [];\n" +
        "let oQueEstaFazendo = '';\n" + 
        "let " + tema + " = null;\n" +
        "bloquearAtributos(true);\n\n";
        
        codigoFonte +=
        "function procurePorChavePrimaria(chave) {\n" +
        "    for (let i = 0; i < " + lista +".length; i++) {\n" +
        "        const " + tema + " = "+ lista + "[i];\n" +
        "        if (" + tema + "." + chave + " == chave) {\n" +
        "            " + tema + ".posicaoNaLista = i;\n" +
        "            return " + lista + "[i];\n" + "        }\n" + "    }\n" + "    return null;\n" + "}\n\n";
        
        codigoFonte +=
        "function procure() {\n" +
        '    const '+chave +' = document.getElementById("'+ chave +'").value;\n' +
        "    if (isNaN("+ chave +") || !Number.isInteger(Number("+ chave +"))) {\n" +
        '        mostrarAviso("Precisa ser um número inteiro");\n' +
        '        document.getElementById("'+ chave +'").focus();\n' + "        return;\n" + "    }\n\n" +
        "    if ("+ chave +") { \n" +
        "        " + tema +" = procurePorChavePrimaria("+ chave +");\n" +
        "        if ("+ tema +") { \n" +
        "            mostrarDados"+nomeClasse+"("+ tema +");\n" +
        "            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');\n" +
        '            mostrarAviso("Achou na lista, pode alterar ou excluir");\n' +
        "        } else { \n" +
        "            limparAtributos();\n" +
        "            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');\n" +
        '            mostrarAviso("Não achou na lista, pode inserir");\n' + "        }\n" +"    } else {\n" +
        '        document.getElementById("'+ chave +'").focus();\n' + "        return;\n" + "    }\n" + "}\n\n";

        codigoFonte +=
        "function inserir() {\n" +
        "    bloquearAtributos(false);\n" +
        "    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');\n" +
        "    oQueEstaFazendo = 'inserindo';\n" +
        '    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");\n' +
        '    document.getElementById("'+ chave +'").focus();\n' + "}\n\n";

        codigoFonte +=
        "function alterar() {\n" +
        "    bloquearAtributos(false);\n" +
        "    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');\n" +
        "    oQueEstaFazendo = 'alterando';\n" +
        '    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");\n' + "}\n\n";

        codigoFonte +=
        "function excluir() {\n" +
        "    bloquearAtributos(false);\n" +
        "    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');\n" +
        "    oQueEstaFazendo = 'excluindo';\n" +
        '    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");\n' + "}\n\n";

        codigoFonte +=
        "function salvar() {\n" +
        "    let "+ chave +";\n" +
        "    if (" + tema +" == null) {\n" +
        "        " + chave + ' = parseInt(document.getElementById("'+ chave +'").value);\n' +
        "    } else {\n" + "        "+ chave + " = " + tema + "." + chave + ";\n" + "    }\n\n";

        for (let i = 1; i < vetAtributos.length; i++) {
            const a = vetAtributos[i]
            codigoFonte += 
            "    const " + a + '= document.getElementById("' + a + '").value;\n';
        }
        
        linha1 = "if(" + chave
        for (let i = 1; i < vetAtributos.length; i++) {
            const a = vetAtributos[i];
            linha1 += " && " + a
        }
        linha1 += " ){";
        codigoFonte += linha1 + "\n";

        codigoFonte +=
        "        switch (oQueEstaFazendo) {\n" +
        "            case 'inserindo':\n";

        linha2 = "                " + tema + " = new " + nomeClasse + "(" + chave;
        for (let i = 1; i < vetAtributos.length; i++) {
            const a = vetAtributos[i];
            linha2 += "," + a;
        }
        linha2 += ");"
        codigoFonte += linha2 + "\n";

        codigoFonte += 
        "                " + lista + ".push("+ tema +");\n" +
        '                mostrarAviso("Inserido na lista");\n' +
        "                break;\n" + "            case 'alterando':\n";

        linha3 = "                " + tema + "Alterado = new " + nomeClasse + "(" + chave;
        for (let i = 1; i < vetAtributos.length; i++) {
            const a = vetAtributos[i];
            linha3 += "," + a;
        }
        linha3 += ");"
        codigoFonte += linha3 + "\n";

        codigoFonte +=
        "                " + lista + "[" + tema +".posicaoNaLista] = " + tema + "Alterado;\n" +
        '                mostrarAviso("Alterado");\n' + "                break;\n" + 
        "            case 'excluindo':\n" + 
        "                let novaLista = [];\n" +
        "                for (let i = 0; i < "+ lista +".length; i++) {\n" +
        "                    if ("+ tema + ".posicaoNaLista != i) {\n" +
        "                        novaLista.push("+ lista +"[i]);\n" + "                    }\n" + "                }\n" +
        "                " + lista +" = novaLista;\n" +
        '                mostrarAviso("EXCLUIDO");\n' + "                break;\n" + "            default:\n" +
        '                mostrarAviso("Erro aleatório");\n' + "        }\n" +
        "        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');\n" +
        "        limparAtributos();\n" + "        listar();\n" + 
        '        document.getElementById("'+ chave +'").focus();\n' +
        "    } else {\n" + '        alert("Erro nos dados digitados");\n' + "        return;\n" + "    }\n" + "}\n\n";

        codigoFonte +=
        "function preparaListagem(vetor) {\n" +
        '    let texto = "";\n' +
        "    for (let i = 0; i < vetor.length; i++) {\n" +
        "        const linha = vetor[i];\n" +
        "        texto += \n";

        linha4 = "         linha." + chave
        for (let i = 1; i < vetAtributos.length; i++) {
            const a = vetAtributos[i];
            linha4 += ' + " - " + \n ' +
            "        linha." + a
        }
        linha4 += '+"<br>";';
        codigoFonte += linha4 + "\n";
        
        codigoFonte += "    }\n" + "    return texto;\n" + "}\n\n";

        codigoFonte += 
        "function listar() {\n" +
        '    document.getElementById("outputSaida").innerHTML = preparaListagem('+ lista +');\n' + "}\n\n";

        codigoFonte += 
        "function cancelarOperacao() {\n" +
        "    limparAtributos();\n" +
        "    bloquearAtributos(true);\n" +
        "    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');\n" +
        '    mostrarAviso("Cancelou a operação de edição");' + "}\n\n";

        codigoFonte +=
        "function mostrarAviso(mensagem) {\n" +
        '    document.getElementById("divAviso").innerHTML = mensagem;\n' + "}\n\n"

        codigoFonte +=
        "function mostrarDados"+ nomeClasse + "(" + tema + ") {\n";
        for (let i = 0; i < vetAtributos.length; i++) {
            const a = vetAtributos[i];
            codigoFonte += '    document.getElementById("'+ a +'").value = ' + tema + '.' + a + ';\n';
        }
        codigoFonte += "    bloquearAtributos(true);\n" + "}\n\n";

        codigoFonte += 
        "function limparAtributos() {\n";
        for(let i = 1; i < vetAtributos.length; i++) {
            const a = vetAtributos[i];
            codigoFonte += '    document.getElementById("'+ a +'").value = "";\n'
        }
        codigoFonte += "    bloquearAtributos(true);\n" + "}\n\n";

        codigoFonte += 
        "function bloquearAtributos(soLeitura) {\n" +
        '    document.getElementById("'+ chave +'").readOnly = !soLeitura;\n';
        for (let i = 1;i < vetAtributos.length; i++) {
            const a = vetAtributos[i];
            codigoFonte += '    document.getElementById("'+ a +'").readOnly = soLeitura;\n';
        }
        codigoFonte += "}\n\n"
        
        codigoFonte += 
        'function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {\n' +
        '    document.getElementById("btProcure").style.display = btProcure;\n' +
        '    document.getElementById("btInserir").style.display = btInserir;\n' +
        '    document.getElementById("btAlterar").style.display = btAlterar;\n' +
        '    document.getElementById("btExcluir").style.display = btExcluir;\n' +
        '    document.getElementById("btSalvar").style.display = btSalvar;\n' +
        '    document.getElementById("btCancelar").style.display = btSalvar;\n' + 
        '    document.getElementById("'+ chave +'").focus();\n' + "}"

        document.getElementById("taCodigoFonte").textContent = codigoFonte;
    }

    function copiarTexto() {
        const texto = document.getElementById("taCodigoFonte").value;
        
        navigator.clipboard.writeText(texto).then(() => {
            alert("Texto Copiado");
        }).catch(err => {
            console.error("Deu erro aqui em...", err);
        });
    }