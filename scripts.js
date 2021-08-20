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
    console.log(cpf_digitado);
    
    let resultado_validacao = validador_cpf(cpf_digitado);
    
    if (!resultado_validacao){
        input.querySelector('.error').style.display = 'block';
    }
    
    else{
        input.querySelector('.error').style.display = 'none';
    }

}