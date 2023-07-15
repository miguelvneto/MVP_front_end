const listarAtividades = async() => {

    var tabela = document.getElementById('tabelaAtividades');

    // garantir que a tabela nao tem linhas
    while (tabela.rows.length > 0) {
    tabela.deleteRow(0);
    }

    let url = 'http://127.0.0.1:5000/listar_atividade';
    fetch(url, {
        method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
            data.atividades.forEach(atv => insereNaTabela(
            atv.id, atv.data, atv.atividade, atv.autor
            )
        )
    }).catch((error) => {
        console.error('Erro: ', error)
    })
};

listarAtividades();

const botaoDelete = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u274c");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}

function inverterData(data) {
    // Inverter o valor da data
    var partes = data.split('/');
    var dataInvertida = partes.reverse().join('/');

    return dataInvertida;
}

// Evento de submit do formulário de cadastro
document.getElementById('cadastroForm').addEventListener('submit', inverterData);

const novaAtividade = () => {
    var atv = document.getElementById("atv").value;
    var aut = document.getElementById("aut").value;
    var data = document.getElementById("data").value;
    data = inverterData(data);

    if (atv ===''){
        alert("Descreva a atividade.")
    } else if (aut===''){
        alert("Informe a autoria da atividade.")
    } else if (data === '') {
        alert('Por favor, insira uma data válida.');
    } else {

        // Objeto JavaScript com os dados a serem enviados
        var novo = {
            data: data,
            atividade: atv,
            autor: aut
        };
        
        // Converter o objeto em uma string JSON
        var atvJson = JSON.stringify(novo);
        let url = 'http://127.0.0.1:5000/cadastrar_atividade';

        // Exemplo de requisição POST usando o método fetch()
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: atvJson
        })
        .then(response => response.json())
        .then(novo => {
            console.log(novo);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
        // insereNaTabela(id, data, atv, aut);
        
    };
    document.getElementById("data").value = "";
    document.getElementById("atv").value = "";
    document.getElementById("aut").value = "";
    listarAtividades();
}

const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
            deleteItem(nomeItem)
            div.remove()
          alert("Removido!")
        }
      }
    }
}

const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/deletar_atividade/' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

const insereNaTabela = (id, data, atividade, autor) => {
    var atv = [id, data, atividade, autor]
    var tab = document.getElementById('tabelaAtividades')
    var lin = tab.insertRow();

    for (var i = 0; i < atv.length; i++){
        var cel = lin.insertCell(i);
        cel.textContent = atv[i];
    }
    botaoDelete(lin.insertCell(-1));

    removeElement();
    // document.getElementById
}