document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calcular').addEventListener('click', calcularIMC);
    document.getElementById('altura').addEventListener('input', formatarAltura);
});

function aplicarMascaraAltura(input) {
    // Remove espaços em branco e caracteres não numéricos
    const valorLimpo = input.value.replace(/\D/g, '');

    // Adiciona a máscara (1,67)
    if (valorLimpo.length >= 3) {
        const parteInteira = valorLimpo.slice(0, -2);
        const parteDecimal = valorLimpo.slice(-2);
        const alturaFormatada = parteInteira + ',' + parteDecimal;
        input.value = alturaFormatada;
    } else {
        input.value = valorLimpo;
    }
}

function calcularIMC() {
    const nome = document.getElementById('nome').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (isNaN(peso) || isNaN(altura)) {
        alert('Por favor, insira valores válidos para peso e altura.');
        return;
    }

    const imc = peso / (altura * altura);
    const resultadoElement = document.getElementById('resultado');

    let categoria;
    let mensagem;

    if (imc < 18.5) {
        categoria = 'Baixo Peso';
        mensagem = 'Ao contrário do que algumas pessoas possam pensar, ter um peso abaixo do recomendável é tão ou mais prejudicial do que ter excesso de peso.';
    } else if (imc < 25) {
        categoria = 'Peso Normal';
        mensagem = 'O peso normal é o peso ideal que cada pessoa deve ter, de acordo com a sua idade, gênero e outras variáveis.';
    } else if (imc < 30) {
        categoria = 'Excesso de Peso';
        mensagem = 'De um modo geral, o excesso de peso pode corresponder a um IMC entre 25 e 30. Esta é também considerada uma situação de pré-obesidade.';
    } else if (imc < 35) {
        categoria = 'Obesidade Grau I';
        mensagem = 'Afigura-se como um quadro de obesidade ou de obesidade grave, quando genericamente existe um IMC de 30 ou mais. A obesidade pode ser classificada como moderada, grave, mórbida ou superobesidade.';
    } else if (imc < 40) {
        categoria = 'Obesidade Grau II';
        mensagem = 'A obesidade pode ser classificada como moderada, grave, mórbida ou superobesidade.';
    } else {
        categoria = 'Obesidade Mórbida';
        mensagem = 'A obesidade pode ser classificada como moderada, grave, mórbida ou superobesidade.';
    }

    exibirResultado(nome, imc, categoria, mensagem);
}

function exibirResultado(nome, imc, categoria, mensagem) {
    const resultadoElement = document.getElementById('resultado');

    // Remove todas as classes de resultado existentes
    resultadoElement.className = 'resultado';

    // Adiciona uma classe específica para a categoria de resultado
    resultadoElement.classList.add(obterClassePorCategoria(categoria));

    // Adiciona um link condicionalmente, a partir de Excesso de Peso
    const linkSugestao = (imc > 25) ? '<p><a href="#" onclick="exibirSugestao()">Sugestões de hábitos Saudáveis</a></p>' : '';

    resultadoElement.innerHTML = `
        <p><strong>${nome}</strong></p>
        <p>IMC: ${imc.toFixed(2)}</p>
        <p>Categoria: ${categoria}</p>
        <p>${mensagem}</p>
        ${linkSugestao}
    `;
}

function obterClassePorCategoria(categoria) {
    switch (categoria) {
        case 'Baixo Peso':
            return 'categoria-amarela';
        case 'Peso Normal':
            return 'categoria-verde';
        case 'Excesso de Peso':
            return 'categoria-laranja';
        default:
            return 'categoria-vermelha';
    }
}

function exibirSugestao() {
    alert('Fazer uma alimentação saudável:\n\nTodos, mesmo quem tem um IMC normal, devem adotar uma dieta equilibrada, rica em vitaminas, sais minerais e proteína, mas sempre pobre em comida ou açúcar processado.\n\nÉ ainda importante comer, pelo menos, de 3 em 3 horas, de forma a evitar longos períodos de jejum, e beber pelo menos 1,5 litros de água por dia. Esta é uma forma de manter o peso controlado e manter um IMC Saudável.\n\nSer ativo:\n\nEvitar o sedentarismo é outra medida essencial para um IMC saudável. Caminhar 30 minutos por dia é suficiente para colher alguns benefícios da atividade física regular.\n\nDe acordo com a Direção-Geral da Saúde (DGS) os adultos devem praticar por semana 150 minutos de exercício físico moderado a intenso ou 75 minutos de atividade física vigorosa.\n\nTambém é recomendável praticarem, pelo menos duas vezes por semana, exercício físico que melhore a força e a resistência musculares.\n\nMantenha-se ativo, pela sua Saúde!');
}
