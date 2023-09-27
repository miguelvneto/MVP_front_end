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

const botaoEdit = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u2710");
    span.className = "edit";
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
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const id_atividade = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
            deleteItem(id_atividade)
            div.remove()
          alert("Atividade removida.")
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

  const editElement = () => {
    let editButtons = document.getElementsByClassName("edit");
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const id_atividade = div.getElementsByTagName('td')[0].innerHTML

        editItem(id_atividade);

      };
    }
  };
  
  const editItem = (id_atividade) => {
    // Usando window.prompt para obter as entradas do usuário
    const updatedData = {};
  
    updatedData.atividade = window.prompt('Digite a nova atividade:', '');
    updatedData.autor = window.prompt('Digite o novo autor:', '');
    updatedData.data = window.prompt('Digite a nova data (formato YYYY-MM-DD):', '2023-01-01');
  
    // Verificar se o usuário cancelou a operação ou deixou algum campo em branco
    if (
      updatedData.atividade === null ||
      updatedData.autor === null ||
      updatedData.data === null ||
      updatedData.atividade.trim() === '' ||
      updatedData.autor.trim() === '' ||
      updatedData.data.trim() === ''
    ) {
      return; // O usuário cancelou a operação ou deixou algum campo em branco
    }
  
    // Continuar com a atualização
    let url = 'http://127.0.0.1:5000/atualizar_atividade/' + id_atividade;
    fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), // Enviando os dados a serem atualizados como JSON no corpo da requisição
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item atualizado com sucesso:', data);
        // Você pode atualizar a interface do usuário aqui, se necessário
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  };
  
  

const insereNaTabela = (id, data, atividade, autor) => {
    var atv = [id, data, atividade, autor]
    var tab = document.getElementById('tabelaAtividades')
    var lin = tab.insertRow();

    for (var i = 0; i < atv.length; i++){
        var cel = lin.insertCell(i);
        cel.textContent = atv[i];
    }
    
    botaoEdit(lin.insertCell(-1));
    editElement();

    botaoDelete(lin.insertCell(-1));
    removeElement();
    // document.getElementById
}