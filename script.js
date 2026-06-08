// Aguarda o DOM (HTML) carregar completamente
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. FUNÇÃO DE INTERATIVIDADE (Simulação de Análise) ---
    const botaoAnalise = document.getElementById("btn-analise");
    const textoResultado = document.getElementById("resultado-analise");

    botaoAnalise.addEventListener("click", function() {
        // Gera uma resposta dinâmica aleatória para simular os dados do campo
        const statusSolo = ["Umidade Ideal", "Solo Seco - Necessita Irrigação", "Solo Encharcado"];
        const resultadoSorteado = statusSolo[Math.floor(Math.random() * statusSolo.length)];
        
        // Exibe o resultado na página
        textoResultado.textContent = `Status do Solo no Paraná: ${resultadoSorteado}`;
    });

    // --- 2. FUNÇÃO DE VALIDAÇÃO DE FORMULÁRIO ---
    const formulario = document.getElementById("form-agrinho");

    formulario.addEventListener("submit", function(event) {
        // Impede o envio padrão do formulário (recarregar a página)
        event.preventDefault(); 
        
        const nomeInput = document.getElementById("nome").value;

        // Validação simples
        if (nomeInput.trim() === "") {
            alert("Por favor, preencha o campo de nome.");
        } else {
            alert(`Olá, ${nomeInput}! Seu projeto para o Agrinho foi registrado com sucesso!`);
            formulario.reset(); // Limpa o formulário
        }
    });

});
