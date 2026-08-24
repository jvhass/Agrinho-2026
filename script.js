/* ============================================
   MENU MOBILE
============================================ */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Fecha menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

/* ============================================
   HEADER SCROLL
============================================ */
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    updateActiveLink();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   LINK ATIVO NA NAVEGAÇÃO
============================================ */
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   PARTÍCULAS DO HERO (folhas flutuando)
============================================ */
const particlesContainer = document.getElementById('particles');
const emojis = ['🍃', '🌾', '🌱', '🍀', '☘️', '🌿'];

function createParticle() {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    particlesContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), 20000);
}

setInterval(createParticle, 800);
for (let i = 0; i < 8; i++) setTimeout(createParticle, i * 300);

/* ============================================
   CONTADOR ANIMADO (STATS)
============================================ */
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    statNumbers.forEach(num => {
        const target = parseInt(num.dataset.target);
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
}

/* ============================================
   ANIMAÇÕES AO SCROLL (Intersection Observer)
============================================ */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Ativa contador quando stats entra na tela
            if (entry.target.classList.contains('stats')) {
                if (!statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            }
        }
    });
}, observerOptions);

// Aplica estilo inicial e observa
document.querySelectorAll('.about-card, .pillar-card, .practice-card, .ods-card, .contribute-card, .stat-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
    observer.observe(el);
});

// Observa seções especiais
document.querySelectorAll('.stats').forEach(el => observer.observe(el));

/* ============================================
   QUIZ INTERATIVO
============================================ */
const quizQuestions = [
    {
        question: "O que significa a sigla ILPF?",
        options: [
            "Irrigação, Lavoura, Produção Familiar",
            "Integração Lavoura-Pecuária-Floresta",
            "Inovação, Logística, Produção Florestal",
            "Indústria, Lavoura, Preservação Florestal"
        ],
        correct: 1
    },
    {
        question: "Qual técnica preserva o solo ao não revolver a terra?",
        options: [
            "Aragem profunda",
            "Queimada controlada",
            "Plantio Direto",
            "Monocultura intensiva"
        ],
        correct: 2
    },
    {
        question: "Quantos são os Objetivos de Desenvolvimento Sustentável (ODS) da ONU?",
        options: ["10", "15", "17", "20"],
        correct: 2
    },
    {
        question: "O que é controle biológico na agricultura?",
        options: [
            "Uso de agrotóxicos importados",
            "Uso de insetos e microrganismos benéficos contra pragas",
            "Irrigação com água da chuva",
            "Plantio em estufas climatizadas"
        ],
        correct: 1
    },
    {
        question: "Qual fonte de energia é considerada renovável e usada no agro?",
        options: [
            "Carvão mineral",
            "Petróleo",
            "Biogás e energia solar",
            "Gás natural"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const quizBody = document.getElementById('quizBody');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizResult = document.getElementById('quizResult');
const quizProgress = document.getElementById('quizProgress');
const currentQ = document.getElementById('currentQ');
const totalQ = document.getElementById('totalQ');
const restartQuiz = document.getElementById('restartQuiz');

totalQ.textContent = quizQuestions.length;

function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    quizQuestion.textContent = q.question;
    quizOptions.innerHTML = '';
    currentQ.textContent = currentQuestion + 1;
    quizProgress.style.width = ((currentQuestion + 1) / quizQuestions.length * 100) + '%';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.addEventListener('click', () => selectAnswer(i, btn));
        quizOptions.appendChild(btn);
    });
}

function selectAnswer(index, btn) {
    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(opt => opt.disabled = true);
    
    if (index === q.correct) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        options[q.correct].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1200);
}

function showResult() {
    quizBody.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    const percent = (score / quizQuestions.length) * 100;
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    
    if (percent === 100) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = 'Perfeito! Você é um expert!';
        resultText.textContent = `Acertou todas as ${quizQuestions.length} perguntas! Você entende muito sobre agro sustentável.`;
    } else if (percent >= 60) {
        resultIcon.textContent = '🌟';
        resultTitle.textContent = 'Muito bem!';
        resultText.textContent = `Você acertou ${score} de ${quizQuestions.length}. Está no caminho certo para um futuro sustentável!`;
    } else {
        resultIcon.textContent = '🌱';
        resultTitle.textContent = 'Continue aprendendo!';
        resultText.textContent = `Você acertou ${score} de ${quizQuestions.length}. Explore o site e descubra mais sobre o tema!`;
    }
}

restartQuiz.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizBody.classList.remove('hidden');
    quizResult.classList.add('hidden');
    loadQuestion();
});

loadQuestion();

/* ============================================
   CALCULADORA DE PEGADA VERDE
============================================ */
const calcForm = document.getElementById('calcForm');
const calcResult = document.getElementById('calcResult');
const resetCalc = document.getElementById('resetCalc');

calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const alimentacao = parseInt(document.getElementById('alimentacao').value);
    const desperdicio = parseInt(document.getElementById('desperdicio').value);
    const consumo = parseInt(document.getElementById('consumo').value);
    const natureza = parseInt(document.getElementById('natureza').value);
    
    const total = alimentacao + desperdicio + consumo + natureza;
    
    document.getElementById('scoreValue').textContent = total;
    
    const scoreCircle = document.getElementById('scoreCircle');
    const calcTitle = document.getElementById('calcTitle');
    const calcText = document.getElementById('calcText');
    const calcTips = document.getElementById('calcTips');
    
    let title, text, tips, color;
    
    if (total <= 15) {
        title = '🌟 Você é um Guardião Verde!';
        text = 'Suas atitudes mostram grande consciência ambiental. Continue inspirando outras pessoas!';
        color = 'linear-gradient(135deg, #2d7a3e, #7cb342)';
        tips = [
            'Compartilhe seus hábitos com amigos e família',
            'Apoie produtores locais e feiras orgânicas',
            'Participe de projetos de reflorestamento'
        ];
    } else if (total <= 30) {
        title = '🌱 Você está no caminho certo!';
        text = 'Você já tem boas práticas, mas pode melhorar ainda mais. Pequenas mudanças fazem grande diferença!';
        color = 'linear-gradient(135deg, #4a9d5b, #c0a062)';
        tips = [
            'Prefira alimentos orgânicos e da estação',
            'Reduza o desperdício planejando refeições',
            'Plante uma árvore ou hortinha em casa'
        ];
    } else {
        title = '💡 Hora de transformar hábitos!';
        text = 'Suas atitudes ainda têm alto impacto. Que tal começar com pequenas mudanças hoje mesmo?';
        color = 'linear-gradient(135deg, #d97706, #c0a062)';
        tips = [
            'Diminua o consumo de industrializados',
            'Aproveite melhor os alimentos antes de descartar',
            'Reutilize e conserte em vez de comprar novo',
            'Passe mais tempo em contato com a natureza'
        ];
    }
    
    scoreCircle.style.background = color;
    calcTitle.textContent = title;
    calcText.textContent = text;
    calcTips.innerHTML = tips.map(t => `<li>${t}</li>`).join('');
    
    calcForm.classList.add('hidden');
    calcResult.classList.remove('hidden');
});

resetCalc.addEventListener('click', () => {
    calcForm.reset();
    calcForm.classList.remove('hidden');
    calcResult.classList.add('hidden');
});

/* ============================================
   ANIMAÇÃO DE ENTRADA INICIAL
============================================ */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
