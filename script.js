// ===== MENU MOBILE =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== LINK ATIVO CONFORME SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (link) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ===== ANIMAÇÃO DE CONTADORES =====
const statNumbers = document.querySelectorAll('.stat__number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statNumbers.forEach(num => {
        const target = +num.getAttribute('data-target');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const update = () => {
            current += step;
            if (current < target) {
                num.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                num.textContent = target;
            }
        };
        update();
    });
    statsAnimated = true;
}

// ===== ANIMAÇÃO REVEAL AO SCROLL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Ativa contadores quando a hero aparece
            if (entry.target.closest('.hero')) {
                animateStats();
            }
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Ativa contadores quando a hero entra em vista
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) animateStats();
    });
}, { threshold: 0.3 });

const hero = document.querySelector('.hero');
if (hero) heroObserver.observe(hero);

// ===== CALCULADORA DE PEGADA ECOLÓGICA =====
const banho = document.getElementById('banho');
const carne = document.getElementById('carne');
const plastico = document.getElementById('plastico');
const transporte = document.getElementById('transporte');

const banhoValue = document.getElementById('banhoValue');
const carneValue = document.getElementById('carneValue');
const plasticoValue = document.getElementById('plasticoValue');
const transporteValue = document.getElementById('transporteValue');

function updateValues() {
    banhoValue.textContent = banho.value + ' min';
    carneValue.textContent = carne.value + ' dias';
    plasticoValue.textContent = plastico.value + ' vezes';
    transporteValue.textContent = transporte.value + ' km';
}

[banho, carne, plastico, transporte].forEach(input => {
    input.addEventListener('input', updateValues);
});

document.getElementById('calcBtn').addEventListener('click', () => {
    // Cálculo aproximado de CO2 emitido por mês (kg)
    const co2Banho = (banho.value * 0.5) * 30; // água aquecida
    const co2Carne = (carne.value * 4) * 4; // kg CO2 por refeição
    const co2Plastico = plastico.value * 0.5 * 4; // produção plástico
    const co2Transporte = (transporte.value * 0.21) * 30; // carro comum
    
    const totalCO2 = co2Banho + co2Carne + co2Plastico + co2Transporte;
    const arvores = Math.ceil(totalCO2 / 22); // 1 árvore absorve ~22kg CO2/ano
    
    const resultNumber = document.getElementById('resultNumber');
    const resultText = document.getElementById('resultText');
    const resultTip = document.getElementById('resultTip');
    
    resultNumber.textContent = arvores;
    
    if (arvores <= 5) {
        resultText.textContent = 'Excelente! Sua pegada é bem pequena! 🌟';
        resultTip.textContent = '💡 Continue assim! Você é um exemplo de consciência ambiental.';
    } else if (arvores <= 15) {
        resultText.textContent = 'Sua pegada está moderada. Pode melhorar! 🌿';
        resultTip.textContent = '💡 Tente reduzir o uso do carro e consumir menos carne vermelha.';
    } else if (arvores <= 30) {
        resultText.textContent = 'Atenção! Sua pegada está alta. ⚠️';
        resultTip.textContent = '💡 Reduza banhos demorados, evite plásticos e prefira transporte público.';
    } else {
        resultText.textContent = 'Sua pegada está muito alta! 🚨';
        resultTip.textContent = '💡 Pequenas mudanças fazem grande diferença. Comece hoje mesmo!';
    }
    
    // Animação do resultado
    const result = document.querySelector('.calculator__result');
    result.style.animation = 'none';
    setTimeout(() => {
        result.style.animation = 'fadeInUp 0.6s ease';
    }, 10);
});

// ===== QUIZ =====
const quizData = [
    {
        question: "🌱 O que é agricultura sustentável?",
        options: [
            "Usar apenas agrotóxicos fortes",
            "Produzir respeitando o meio ambiente e as pessoas",
            "Desmatar florestas para plantar",
            "Ignorar as leis ambientais"
        ],
        correct: 1,
        explanation: "✅ Correto! A agricultura sustentável busca equilibrar produção com preservação ambiental e valorização social."
    },
    {
        question: "💧 Qual técnica ajuda a economizar água no campo?",
        options: [
            "Irrigação por gotejamento",
            "Deixar a torneira aberta",
            "Regar ao meio-dia",
            "Usar mangueiras o dia todo"
        ],
        correct: 0,
        explanation: "✅ Exato! O gotejamento leva a água direto na raiz, economizando até 70% de água!"
    },
    {
        question: "🌳 O que é o sistema ILPF?",
        options: [
            "Um tipo de adubo químico",
            "Integração Lavoura-Pecuária-Floresta",
            "Uma marca de trator",
            "Um programa de computador"
        ],
        correct: 1,
        explanation: "✅ Perfeito! O ILPF combina agricultura, pecuária e floresta na mesma área, aumentando a produtividade e a sustentabilidade."
    },
    {
        question: "🐝 Qual a importância das abelhas na agricultura?",
        options: [
            "Elas só fazem mel",
            "Elas polinizam as plantas, ajudando na produção",
            "Elas comem as pragas",
            "Elas não têm importância"
        ],
        correct: 1,
        explanation: "✅ Isso mesmo! Cerca de 75% das culturas agrícolas dependem da polinização das abelhas!"
    },
    {
        question: "♻️ O que é controle biológico?",
        options: [
            "Usar mais agrotóxicos",
            "Queimar as plantações",
            "Usar inimigos naturais para controlar pragas",
            "Deixar as pragas se multiplicarem"
        ],
        correct: 2,
        explanation: "✅ Correto! O controle biológico usa predadores naturais das pragas, reduzindo o uso de químicos."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const quizFinal = document.getElementById('quizFinal');

function loadQuestion() {
    answered = false;
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    feedbackEl.className = 'quiz__feedback';
    feedbackEl.style.display = 'none';
    nextBtn.style.display = 'none';
    
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz__option';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectAnswer(index, btn));
        optionsEl.appendChild(btn);
    });
    
    progressText.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
}

function selectAnswer(index, btn) {
    if (answered) return;
    answered = true;
    
    const q = quizData[currentQuestion];
    const allOptions = document.querySelectorAll('.quiz__option');
    
    allOptions.forEach((opt, i) => {
        if (i === q.correct) {
            opt.classList.add('correct');
        }
        opt.style.pointerEvents = 'none';
    });
    
    if (index === q.correct) {
        score++;
        btn.classList.add('correct');
        feedbackEl.textContent = q.explanation;
        feedbackEl.className = 'quiz__feedback correct show';
    } else {
        btn.classList.add('wrong');
        feedbackEl.textContent = `❌ Resposta correta: ${q.options[q.correct]}`;
        feedbackEl.className = 'quiz__feedback wrong show';
    }
    
    feedbackEl.style.display = 'block';
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Ver Resultado 🏆' : 'Próxima ➡️';
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showFinal();
    }
});

function showFinal() {
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    feedbackEl.style.display = 'none';
    nextBtn.style.display = 'none';
    document.querySelector('.quiz__progress').style.display = 'none';
    quizFinal.style.display = 'block';
    
    document.getElementById('finalScore').textContent = `${score}/${quizData.length}`;
    
    let message = '';
    if (score === quizData.length) {
        message = '🌟 Incrível! Você é um verdadeiro especialista em sustentabilidade!';
    } else if (score >= 3) {
        message = '🌿 Muito bom! Você tem bons conhecimentos sobre o tema.';
    } else {
        message = '📚 Continue estudando! Cada aprendizado conta para um futuro melhor.';
    }
    document.getElementById('finalMessage').textContent = message;
}

document.getElementById('restartBtn').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    questionEl.style.display = 'block';
    optionsEl.style.display = 'flex';
    document.querySelector('.quiz__progress').style.display = 'block';
    quizFinal.style.display = 'none';
    loadQuestion();
});

// Inicia o quiz
loadQuestion();

// ===== FORMULÁRIO DE CONTATO =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`✅ Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Em breve entraremos em contato! 🌱`);
        e.target.reset();
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1000);
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== EFEITO PARALLAX SUAVE NO HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBg = document.querySelector('.hero__bg');
    if (heroBg && scrolled < 800) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
    }
});

console.log('🌱 Site Agrinho carregado com sucesso!');
console.log('💚 Agro Forte, Futuro Sustentável');
