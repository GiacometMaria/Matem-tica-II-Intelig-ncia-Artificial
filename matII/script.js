
document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const btnCorrect = document.getElementById('btn-correct');
    const resultsSection = document.getElementById('results');
    const suggestionsList = document.getElementById('suggestions-list');

    // Dicionário simples de erros comuns e substituições
    const commonErrors = [
        { wrong: /\bmais\b/gi, right: 'mas', context: 'Verifique o uso de "mais" (quantidade) vs "mas" (porém).' },
        { wrong: /\bagente\b/gi, right: 'a gente', context: '"Agente" é de polícia/espionagem. Para grupo, use "a gente".' },
        { wrong: /\bcom certeza\b/gi, right: 'com certeza', context: 'Lembre-se: escreve-se separado.' },
        { wrong: /\bconserteza\b/gi, right: 'com certeza', context: 'Grafia incorreta de "com certeza".' },
        { wrong: /\bpara mim fazer\b/gi, right: 'para eu fazer', context: 'Mim não faz ação. Use "para eu fazer".' }
    ];

    btnCorrect.addEventListener('click', () => {
        const text = textInput.value;
        suggestionsList.innerHTML = '';
        let hasErrors = false;

        if (!text.trim()) {
            alert('Por favor, digite algum texto antes de analisar.');
            return;
        }

        commonErrors.forEach(rule => {
            if (rule.wrong.test(text)) {
                hasErrors = true;
                
                const li = document.createElement('li');
                li.innerHTML = `
                    <span><strong>Atenção:</strong> ${rule.context}</span>
                    <button class="fix-btn">Corrigir</button>
                `;

                // Botão para aplicar a correção diretamente no texto
                const fixBtn = li.querySelector('.fix-btn');
                fixBtn.addEventListener('click', () => {
                    textInput.value = textInput.value.replace(rule.wrong, rule.right);
                    li.remove();
                    if (suggestionsList.children.length === 0) {
                        resultsSection.classList.add('hidden');
                    }
                });

                suggestionsList.appendChild(li);
            }
        });

        if (hasErrors) {
            resultsSection.classList.remove('hidden');
        } else {
            resultsSection.classList.remove('hidden');
            suggestionsList.innerHTML = '<li>Nenhum erro comum foi encontrado no texto!</li>';
        }
    });
});
