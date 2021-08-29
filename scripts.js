// VALIDADOR DE CPF

function validador_cpf(cpf_digitado){
    if (cpf_digitado.length != 11){
        return false
    }
    else{
        // Validação primeiro dígito
        let numeros = cpf_digitado.substring(0,9);
        let digitos = cpf_digitado.substring(9);
        
        let soma = 0;
        for (let i = 10; i > 1; i--){
            soma += numeros.charAt(10 - i) * i ;
        }

        let teste = soma % 11 < 2
        let resultado = teste ? 0 : 11 - (soma % 11);

        if (resultado != digitos.charAt(0)){
            return false;
        }

        // Validação segundo dígito
        soma = 0;
        numeros = cpf_digitado.substring(0, 10);

        for (i = 11; i > 1; i--){
            soma += numeros.charAt(11 - i) * i ;
        }

        teste = soma % 11 < 2
        resultado = teste ? 0 : 11 - (soma % 11);

        if (resultado != digitos.charAt(1)){
            return false;
        }
        else{
            return true
        }
    }
}

CPF.addEventListener('blur', (e) => validacao_cpf(e))

function validacao_cpf(e) {
    let input = e.target.parentElement;
    input.querySelector('.error').style.display = 'none';
    let cpf_digitado = CPF.value;
    
    let resultado_validacao = validador_cpf(cpf_digitado);
    
    if (!resultado_validacao){
        input.querySelector('.error').style.display = 'block';
    }
    
    else{
        input.querySelector('.error').style.display = 'none';
    }

}








// VALIDADOR DE CEP

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('endereco').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('endereco').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('estado').value=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

CEP.addEventListener('blur', (e) => pesquisacep(e))

function pesquisacep(e) {

    let valor = e.target.value;
    //Nova variável "cep" somente com dígitos.
    let cep = valor.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        let validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('endereco').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('estado').value="...";

            //Cria um elemento javascript.
            let script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
    };


const Formulario = () => {
    let form = {

        nome: document.getElementById('nome').value,
        cargo: document.getElementById('cargo').value,
        birth: document.getElementById('birth').value,
        estadocivil: document.getElementById('estadocivil').value,
        genero: document.getElementById('genero').value,
        CEP: document.getElementById('CEP').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        celular: document.getElementById('celular').value,
        telefone1: document.getElementById('telefone1').value,
        email: document.getElementById('email').value,
        identidade: document.getElementById('identidade').value,
        CPF: document.getElementById('CPF').value,
        veiculo: document.getElementById('veiculo').value,
        habilitacao: document.getElementById('habilitacao').value,

    };
    console.log(form);
    return form
}

const criarCandidato = async (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/form', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(Formulario())
      }).then((response) => {

          console.log('deu certo');

      }, (response) => {

        console.log('deu ruim');
        
      }).catch((error) => {
          console.log(error);
      });
  }