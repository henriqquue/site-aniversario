'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Star,
  Camera,
  Award,
  Palette,
  Coffee,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  Calendar,
  ChevronDown,
  Gift,
  Bookmark,
  HeartCrack
} from 'lucide-react';

// Interface para as memórias de polaroid
interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'art' | 'cooking' | 'sweet' | 'special';
  imageUrl?: string;
  color: string;
}

const defaultMemories: Memory[] = [
  {
    id: 'mem-1',
    title: 'Festinha na Chácara',
    description: 'Quando ela passou a tarde fazendo aquele doce maravilhoso só para nos ver sorrir. O aroma de açúcar e carinho tomou conta da casa inteira! Cada ingrediente que ela mistura parece carregar uma porção mágica de felicidade.',
    date: '12/04/2026',
    category: 'cooking',
    imageUrl: '/foto1.jpeg',
    color: 'from-[#FAD0C4] to-[#FFD1FF]'
  },
  {
    id: 'mem-2',
    title: 'Sua Franky Preferida',
    description: 'Um dos desenhos cheios de sensibilidade que ela criou. A forma como ela segura o pincel e combina as cores revela a profundidade de sua alma artística. Cada traço é uma janela para o mundo lindo que ela carrega no peito.',
    date: '28/04/2026',
    category: 'art',
    imageUrl: '/foto2.jpeg',
    color: 'from-[#FF9A9E] to-[#FECFEF]'
  },
  {
    id: 'mem-3',
    title: 'Você na Faculdade 😡',
    description: 'Aquele pequeno recado surpresa escrito à mão e deixado no lugar mais inesperado. É a prova de que ela pensa nos mínimos detalhes e espalha doçura por onde passa. Guardarei esse papelzinho para sempre.',
    date: '10/05/2026',
    category: 'sweet',
    imageUrl: '/foto3.jpeg',
    color: 'from-[#A1C4FD] to-[#C2E9FB]'
  },
  {
    id: 'mem-4',
    title: 'Tudo que eu mais queria',
    description: 'O dia em que ela superou um grande desafio com foco, garra e determinação. Ver a expressão de orgulho no rosto dela ao vencer essa etapa provou que ela é capaz de realizar absolutamente tudo o que desejar.',
    date: '20/05/2026',
    category: 'special',
    imageUrl: '/foto4.jpeg',
    color: 'from-[#E2D4F9] to-[#FCE3EC]'
  }
];

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>(defaultMemories);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  // Estados do Formulário
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<'art' | 'cooking' | 'sweet' | 'special'>('special');
  const [newImage, setNewImage] = useState('');
  const [showFormSuccess, setShowFormSuccess] = useState(false);

  // Efeitos de Scroll
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalScrollProgress } = useScroll({
    target: horizontalSectionRef
  });

  // Mapeamento de scroll vertical para horizontal (apenas desktop) - sintonizado para h-[130vh]
  const xTranslation = useTransform(horizontalScrollProgress, [0.1, 0.8], ["0%", "-55%"]);

  // Detectar Mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carregar memórias do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('site_meu_amor_memories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Filtra as memórias salvas para manter apenas as criadas pelo usuário (que não começam com mem-1, mem-2, etc.)
        // e combina com as memórias padrão atualizadas no código.
        const userCreated = parsed.filter((m: Memory) => !['mem-1', 'mem-2', 'mem-3', 'mem-4'].includes(m.id));
        setMemories([...defaultMemories, ...userCreated]);
      } catch (e) {
        console.error('Erro ao ler memórias', e);
      }
    }
  }, []);

  // Gerar brilhinhos flutuantes aleatórios no fundo
  useEffect(() => {
    const items = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 10
    }));
    setSparkles(items);
  }, []);

  // Sintetizador Web Audio API: Caixinha de música mágica
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMusic = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Frequências pentatônicas delicadas (Caixinha de música de brinquedo)
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

      // Sequência de notas da melodia doce e repetitiva
      const melody = [
        { note: 2, duration: 0.6 }, // E4
        { note: 4, duration: 0.6 }, // A4
        { note: 5, duration: 0.6 }, // C5
        { note: 7, duration: 1.2 }, // E5
        { note: 5, duration: 0.6 }, // C5
        { note: 4, duration: 0.6 }, // A4

        { note: 3, duration: 0.6 }, // G4
        { note: 5, duration: 0.6 }, // C5
        { note: 6, duration: 0.6 }, // D5
        { note: 8, duration: 1.2 }, // G5
        { note: 6, duration: 0.6 }, // D5
        { note: 5, duration: 0.6 }  // C5
      ];

      let step = 0;
      const playTone = (freq: number, time: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine'; // Som de caixinha de música puro
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, time);

        // Envelope: ataque rápido e decaimento doce
        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(0.12, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + dur - 0.05);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + dur);
      };

      const beatDuration = 400; // ms
      intervalRef.current = setInterval(() => {
        const currentItem = melody[step % melody.length];
        const freq = scale[currentItem.note];
        const now = ctx.currentTime;
        playTone(freq, now, currentItem.duration);

        // Acompanhamento suave no baixo de vez em quando
        if (step % 2 === 0) {
          const bassNote = scale[(currentItem.note - 2 + scale.length) % scale.length] / 2;
          playTone(bassNote, now, currentItem.duration * 1.5);
        }

        step++;
      }, beatDuration);

      setIsPlaying(true);
    } catch (e) {
      console.error('Falha ao iniciar áudio:', e);
    }
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // Limpeza de áudio
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Rolar suave até uma seção
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tratar submissão de nova memória
  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    // Gradientes românticos aleatórios de backup se não fornecer foto
    const gradients = [
      'from-[#FAD0C4] to-[#FFD1FF]',
      'from-[#FF9A9E] to-[#FECFEF]',
      'from-[#A1C4FD] to-[#C2E9FB]',
      'from-[#E2D4F9] to-[#FCE3EC]',
      'from-[#FBC2EB] to-[#A6C1EE]'
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const created: Memory = {
      id: `mem-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      date: newDate || new Date().toLocaleDateString('pt-BR'),
      category: newCategory,
      imageUrl: newImage || undefined,
      color: randomGradient
    };

    const updated = [created, ...memories];
    setMemories(updated);
    localStorage.setItem('site_meu_amor_memories', JSON.stringify(updated));

    // Reset formulário
    setNewTitle('');
    setNewDesc('');
    setNewDate('');
    setNewImage('');

    // Efeito visual fofo de sucesso
    setShowFormSuccess(true);
    setTimeout(() => setShowFormSuccess(false), 3000);
  };

  // Excluir memória
  const handleDeleteMemory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = memories.filter(m => m.id !== id);
    setMemories(filtered);
    localStorage.setItem('site_meu_amor_memories', JSON.stringify(filtered));
    if (selectedMemory?.id === id) {
      setSelectedMemory(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#F3E5F5] text-[#2C1A4D] relative select-none font-sans overflow-x-hidden">

      {/* 1. Partículas de Brilho Mágico de Fundo */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {sparkles.map((star) => (
          <span
            key={star.id}
            className="absolute text-[#B39DDB]/30 animate-pulse pointer-events-none select-none text-2xl"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${5 + star.size}s`,
              fontSize: `${star.size}px`
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* 2. Barra de Progresso de Scroll Mágica */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#9575CD] via-[#B39DDB] to-[#7E57C2] origin-left z-50 shadow-md flex items-center justify-end"
        style={{ scaleX: scaleProgress }}
      >
        <div className="bg-[#7E57C2] w-5 h-5 rounded-full flex items-center justify-center -mr-1 shadow-md border-2 border-white animate-heart-pulse">
          <Heart className="w-3 h-3 text-white fill-current" />
        </div>
      </motion.div>

      {/* 3. Player de Música Flutuante */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          id="btn-music-toggle"
          onClick={toggleMusic}
          className={`flex items-center gap-2 p-4 rounded-full font-medium text-white shadow-lg transition-all duration-300 ${isPlaying ? 'bg-[#7E57C2] hover:bg-[#5E35B1]' : 'bg-slate-400 hover:bg-slate-500'
            } active:scale-95`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-5 h-5 animate-bounce" />
              <span className="text-xs hidden md:inline font-semibold">Caixinha Mágica Ativa</span>
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5" />
              <span className="text-xs hidden md:inline font-semibold">Ligar Caixinha de Música</span>
            </>
          )}
        </motion.button>
      </div>

      {/* 4. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pb-20 md:pb-28 text-center z-10 bg-[#FDF9FE] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[#9575CD] font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 magic-glow">
            ★── ⋆˖˚🌸 My Mahou Shoujo 🌸˚˖⋆ ──★
          </span>

          <h1 className="text-[#7E57C2] font-serif text-5xl md:text-8xl leading-tight font-extrabold mt-6 drop-shadow-sm">
            Para a minha <br />
            <span className="relative">
              Garota Mágica
              <span className="absolute -bottom-2 left-0 right-0 h-2 bg-[#9575CD]/30 rounded-full"></span>
            </span>
          </h1>

          <p className="text-lg md:text-2xl italic font-medium mt-8 text-[#7E57C2] max-w-xl mx-auto font-serif">
            "O Amor da Minha vida, e por quem eu faria tanto."
          </p>

          <p className="text-sm md:text-base text-[#2C1A4D] max-w-xl mx-auto leading-relaxed mt-6 font-medium">
            Hoje é o seu dia especial, e eu quis criar algo tão único e maravilhoso
            quanto você é para mim. Rola para baixo para ver por que você é a pessoa mais incrível que já conheci.
          </p>

          {/* Contêiner dos Botões */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button
              id="btn-scroll-start"
              onClick={() => scrollTo('talentos')}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white bg-[#7E57C2] shadow-lg shadow-purple-200/50 transition-all duration-300 hover:scale-105 hover:bg-[#5E35B1] hover:shadow-xl active:scale-95 group cursor-pointer"
            >
              <span>Ver suas conquistas</span>
              <Heart className="w-4 h-4 transition-transform duration-300 group-hover:scale-125 fill-current" />
            </button>

            <button
              id="btn-scroll-polaroid"
              onClick={() => scrollTo('polaroids')}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-[#7E57C2] bg-white border-2 border-[#9575CD] shadow-sm transition-all duration-300 hover:bg-[#D1C4E9]/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Ver fotos Polaroids</span>
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Itens Flutuantes Decorações de Madoka Mágica (Inspirado na imagem do usuário) */}
        {/* Top-Left: Gema da Alma Roxa (Homura) */}
        <motion.div
          className="absolute top-[8%] left-[3%] md:left-[8%] w-14 md:w-20 h-auto pointer-events-none z-0 opacity-80"
          animate={{ y: [0, -12, 0], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PurpleSoulGem />
        </motion.div>

        {/* Mid-Left: Gema da Alma Amarela (Mami) */}
        <motion.div
          className="absolute bottom-[22%] left-[4%] md:left-[14%] w-10 md:w-16 h-auto pointer-events-none z-0 opacity-80"
          animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <YellowSoulGem />
        </motion.div>

        {/* Bottom-Left: Gema da Alma Rosa (Madoka) */}
        <motion.div
          className="absolute bottom-[10%] left-[10%] md:left-[4%] w-18 md:w-28 h-auto pointer-events-none z-0 opacity-80"
          animate={{ y: [0, -15, 0], rotate: [-2, 3, -3, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <PinkSoulGem />
        </motion.div>

        {/* Bottom-Right-Center: Gema da Alma Azul (Sayaka) */}
        <motion.div
          className="absolute bottom-[12%] right-[10%] md:right-[18%] w-10 md:w-14 h-auto pointer-events-none z-0 opacity-85"
          animate={{ y: [0, -8, 0], rotate: [-1, 2, -2, -1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <BlueSoulGem />
        </motion.div>

        {/* Bottom-Right: Bastão Mágico com Coração e Asinhas de Madoka */}
        <motion.div
          className="absolute bottom-[5%] right-[2%] md:right-[6%] w-20 md:w-32 h-auto pointer-events-none z-0 opacity-90"
          animate={{ y: [0, -20, 0], rotate: [12, 18, 8, 12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <MagicalWand />
        </motion.div>

        <div className="absolute bottom-12 animate-bounce cursor-pointer flex flex-col items-center text-[#7E57C2] z-30" onClick={() => scrollTo('talentos')}>
          <span className="text-xs font-semibold uppercase tracking-wider mb-2">Role para baixo</span>
          <ChevronDown className="w-6 h-6" />
        </div>
        <WaveDivider fill="#F3E5F5" className="bottom-0" />
      </section>

      {/* 5. Seção de Scroll Horizontal ("Mundo de Talentos Dela") */}
      <section
        id="talentos"
        ref={horizontalSectionRef}
        className={`relative ${isMobile ? 'pt-16 pb-24' : 'h-[135vh]'} bg-[#F3E5F5] z-10 flex flex-col justify-center overflow-hidden`}
      >
        {!isMobile ? (
          /* Versão Desktop: Sticky Horizontal Scroll */
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            {/* TÍTULO CENTRALIZADO */}
            <div className="text-center mb-6 px-4 max-w-3xl mx-auto flex flex-col items-center">
              <span className="text-[#9575CD] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <Star className="w-4 h-4 fill-current animate-pulse" /> Detalhes Que Brilham
              </span>
              <h2 className="text-[#7E57C2] font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold mt-2 text-center">
                O que lhe Torna Única.
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-2 text-center">Role verticalmente para percorrer a galeria de seus talentos maravilhosos.</p>
            </div>

            {/* Trilha horizontal */}
            <div className="w-full flex items-center">
              <motion.div
                style={{ x: xTranslation }}
                className="flex gap-8 pl-[20vw] pr-[40vw] py-4"
              >
                {/* Card 1: Arte */}
                <div className="w-[450px] shrink-0 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-purple-100 shadow-xl shadow-purple-100/30 flex flex-col justify-between group hover:border-[#9575CD] transition-colors duration-300">
                  <div>
                    <div className="w-14 h-14 bg-[#D1C4E9] rounded-2xl flex items-center justify-center text-[#7E57C2] group-hover:scale-110 transition-transform duration-300">
                      <Palette className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-serif font-extrabold mt-6 text-[#7E57C2]">O Dom da Arte</h3>
                    <p className="text-sm leading-relaxed mt-4 text-[#2C1A4D]/80 text-justify">
                      Seus desenhos e pinturas não são apenas imagens; são sentimentos traduzidos em formas e cores. A sua dedicação a cada detalhe e a forma sensível como enxerga o mundo transforma qualquer papel em branco em pura poesia.
                    </p>
                  </div>

                  {/* Amostra da Magia Interativa */}
                  <div className="mt-8 border-t border-[#F3E5F5] pt-6">
                    <span className="text-xs font-semibold text-[#9575CD] uppercase tracking-wider block mb-3 text-center">Amostra da Magia (Passe o mouse)</span>
                    <div className="flex gap-2 justify-center py-2 bg-[#FDF9FE] rounded-xl relative overflow-hidden group/art">
                      <div className="w-5 h-5 rounded-full bg-purple-400 group-hover/art:translate-y-[-4px] transition-transform duration-300"></div>
                      <div className="w-5 h-5 rounded-full bg-amber-300 group-hover/art:translate-y-[-8px] transition-transform duration-300 delay-75"></div>
                      <div className="w-5 h-5 rounded-full bg-cyan-300 group-hover/art:translate-y-[-4px] transition-transform duration-300 delay-150"></div>
                      <div className="w-5 h-5 rounded-full bg-emerald-400 group-hover/art:scale-125 transition-transform duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Card 2: Culinária */}
                <div className="w-[450px] shrink-0 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-purple-100 shadow-xl shadow-purple-100/30 flex flex-col justify-between group hover:border-[#9575CD] transition-colors duration-300">
                  <div>
                    <div className="w-14 h-14 bg-[#B39DDB] rounded-2xl flex items-center justify-center text-[#7E57C2] group-hover:scale-110 transition-transform duration-300">
                      <Coffee className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-serif font-extrabold mt-6 text-[#7E57C2]">Magia Culinária</h3>
                    <p className="text-sm leading-relaxed mt-4 text-[#2C1A4D]/80 text-justify">
                      Tudo o que você cozinha carrega um sabor inigualável de aconchego. Cada receita é feita com um capricho que alimenta não só o corpo, mas a alma. Você transforma ingredientes simples em celebrações perfeitas.
                    </p>
                  </div>

                  {/* Amostra da Magia Interativa */}
                  <div className="mt-8 border-t border-[#F3E5F5] pt-6">
                    <span className="text-xs font-semibold text-[#9575CD] uppercase tracking-wider block mb-3 text-center">Amostra da Magia (Passe o mouse)</span>
                    <div className="h-10 bg-[#FDF9FE] rounded-xl flex items-center justify-center gap-1 group-hover:bg-[#D1C4E9]/30 transition-colors duration-300 relative overflow-hidden">
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
                        <Gift className="w-5 h-5 text-[#7E57C2]" />
                      </motion.div>
                      <span className="text-xs font-bold text-[#7E57C2]">Feito com pitadas de amor!</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: O Carinho Dela */}
                <div className="w-[450px] shrink-0 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-purple-100 shadow-xl shadow-purple-100/30 flex flex-col justify-between group hover:border-[#9575CD] transition-colors duration-300">
                  <div>
                    <div className="w-14 h-14 bg-[#B39DDB] rounded-2xl flex items-center justify-center text-[#7E57C2] group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-7 h-7 fill-current" />
                    </div>
                    <h3 className="text-2xl font-serif font-extrabold mt-6 text-[#7E57C2]">Pequenos Gestos</h3>
                    <p className="text-sm leading-relaxed mt-4 text-[#2C1A4D]/80 text-justify">
                      Sua preocupação, o abraço apertado nos dias difíceis, os bilhetes espontâneos. Esses detalhes miúdos revelam a grandeza imensa do seu coração. Você sabe acolher e amar de um jeito que cura e ilumina a vida.
                    </p>
                  </div>

                  {/* Amostra da Magia Interativa */}
                  <div className="mt-8 border-t border-[#F3E5F5] pt-6">
                    <span className="text-xs font-semibold text-[#9575CD] uppercase tracking-wider block mb-3 text-center">Amostra da Magia (Passe o mouse)</span>
                    <div className="h-10 bg-[#FDF9FE] rounded-xl flex items-center justify-center group/gesto cursor-default overflow-hidden relative">
                      <span className="text-xs font-semibold group-hover/gesto:translate-y-[-30px] transition-transform duration-300 text-slate-500">Passe para abrir o bilhete</span>
                      <span className="text-xs font-bold text-[#7E57C2] absolute translate-y-[30px] group-hover/gesto:translate-y-0 transition-transform duration-300">"Você é o meu lugar favorito no mundo!"</span>
                    </div>
                  </div>
                </div>

                {/* Card 4: Brilho Especial */}
                <div className="w-[450px] shrink-0 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-purple-100 shadow-xl shadow-purple-100/30 flex flex-col justify-between group hover:border-[#9575CD] transition-colors duration-300">
                  <div>
                    <div className="w-14 h-14 bg-[#D1C4E9] rounded-2xl flex items-center justify-center text-[#7E57C2] group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-serif font-extrabold mt-6 text-[#7E57C2]">Brilho de Garota Mágica</h3>
                    <p className="text-sm leading-relaxed mt-4 text-[#2C1A4D]/80 text-justify">
                      Seu sorriso contagia instantaneamente. O entusiasmo quando você fala do que gosta e a sua persistência frente aos obstáculos provam a sua verdadeira essência de Mahou Shoujo. Você espalha brilho mágico em cada canto.
                    </p>
                  </div>

                  {/* Amostra da Magia Interativa */}
                  <div className="mt-8 border-t border-[#F3E5F5] pt-6">
                    <span className="text-xs font-semibold text-[#9575CD] uppercase tracking-wider block mb-3 text-center">Amostra da Magia (Passe o mouse)</span>
                    <div className="h-10 bg-[#FDF9FE] rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#D1C4E9]/40 transition-all duration-300 overflow-hidden">
                      <Star className="w-4 h-4 text-amber-400 fill-current animate-spin" />
                      <span className="text-xs font-bold text-[#7E57C2]">Conquista o mundo todinho!</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Versão Mobile: Swiper Horizontal Nativo com Snap */
          <div className="px-6">
            <div className="text-center mb-6 flex flex-col items-center">
              <span className="text-[#9575CD] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <Star className="w-4 h-4 fill-current" /> Detalhes Que Brilham
              </span>
              <h2 className="text-[#7E57C2] font-serif text-3xl font-extrabold mt-1 text-center">
                O que lhe Torna Única.
              </h2>
              <p className="text-xs text-slate-500 mt-1 text-center">Deslize para o lado para ver todos os cartões.</p>
            </div>

            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 pt-2">
              {/* Card Mobile 1: Arte */}
              <div className="w-[85vw] shrink-0 snap-center bg-white p-6 rounded-3xl border border-purple-100 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-[#D1C4E9] rounded-2xl flex items-center justify-center text-[#7E57C2]">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-extrabold mt-4 text-[#7E57C2]">O Dom da Arte</h3>
                  <p className="text-xs leading-relaxed mt-2 text-[#2C1A4D]/80">
                    Seus desenhos e pinturas não são apenas imagens; são sentimentos traduzidos em formas e cores. A sua dedicação a cada detalhe e a forma sensível como enxerga o mundo transforma qualquer papel em branco em pura poesia.
                  </p>
                </div>
                <div className="mt-4 border-t border-[#F3E5F5] pt-4">
                  <div className="flex gap-2 justify-center py-2 bg-[#FDF9FE] rounded-xl">
                    <span className="text-[10px] font-bold text-[#7E57C2] uppercase tracking-wider">★ Talento Artístico Único ★</span>
                  </div>
                </div>
              </div>

              {/* Card Mobile 2: Culinária */}
              <div className="w-[85vw] shrink-0 snap-center bg-white p-6 rounded-3xl border border-purple-100 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-[#B39DDB] rounded-2xl flex items-center justify-center text-[#7E57C2]">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-extrabold mt-4 text-[#7E57C2]">Magia Culinária</h3>
                  <p className="text-xs leading-relaxed mt-2 text-[#2C1A4D]/80">
                    Tudo o que você cozinha carrega um sabor inigualável de aconchego. Cada receita é feita com um capricho que alimenta não só o corpo, mas a alma. Você transforma ingredientes simples em celebrações perfeitas.
                  </p>
                </div>
                <div className="mt-4 border-t border-[#F3E5F5] pt-4">
                  <div className="flex gap-2 justify-center py-2 bg-[#FDF9FE] rounded-xl">
                    <span className="text-[10px] font-bold text-[#7E57C2] uppercase tracking-wider">🧁 Muito Amor no Tempero 🧁</span>
                  </div>
                </div>
              </div>

              {/* Card Mobile 3: O Carinho Dela */}
              <div className="w-[85vw] shrink-0 snap-center bg-white p-6 rounded-3xl border border-purple-100 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-[#B39DDB] rounded-2xl flex items-center justify-center text-[#7E57C2]">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <h3 className="text-xl font-serif font-extrabold mt-4 text-[#7E57C2]">Pequenos Gestos</h3>
                  <p className="text-xs leading-relaxed mt-2 text-[#2C1A4D]/80">
                    Sua preocupação, o abraço apertado nos dias difíceis, os bilhetes espontâneos. Esses detalhes miúdos revelam a grandeza imensa do seu coração. Você sabe acolher e amar de um jeito que cura e ilumina a vida.
                  </p>
                </div>
                <div className="mt-4 border-t border-[#F3E5F5] pt-4">
                  <div className="flex gap-2 justify-center py-2 bg-[#FDF9FE] rounded-xl">
                    <span className="text-[10px] font-bold text-[#7E57C2] uppercase tracking-wider">💌 Carinho Todo Dia 💌</span>
                  </div>
                </div>
              </div>

              {/* Card Mobile 4: Brilho Especial */}
              <div className="w-[85vw] shrink-0 snap-center bg-white p-6 rounded-3xl border border-purple-100 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-[#D1C4E9] rounded-2xl flex items-center justify-center text-[#7E57C2]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-extrabold mt-4 text-[#7E57C2]">Brilho de Garota Mágica</h3>
                  <p className="text-xs leading-relaxed mt-2 text-[#2C1A4D]/80">
                    Seu sorriso contagia instantaneamente. O entusiasmo quando você fala do que gosta e a sua persistência frente aos obstáculos provam a sua verdadeira essência de Mahou Shoujo. Você espalha brilho mágico em cada canto.
                  </p>
                </div>
                <div className="mt-4 border-t border-[#F3E5F5] pt-4">
                  <div className="flex gap-2 justify-center py-2 bg-[#FDF9FE] rounded-xl">
                    <span className="text-[10px] font-bold text-[#7E57C2] uppercase tracking-wider">✨ Luz que Ilumina ✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <WaveDivider fill="#FDF9FE" className="bottom-0" />
      </section>

      {/* 6. Seção de Polaroids ("Mosaico de Memórias Mágicas") */}
      <section id="polaroids" className="pt-16 pb-36 bg-[#FDF9FE] relative z-10 px-4 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-10 flex flex-col items-center">
          <span className="text-[#9575CD] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" /> Registro das Suas Pegadas
          </span>
          <h2 className="text-[#7E57C2] font-serif text-4xl md:text-5xl font-extrabold mt-2 text-center">
            Mini Álbum  📸
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mt-4 text-center">
            Cada clique abaixo é uma Polaroid especial contendo conquistas, detalhes e coisas incríveis feitas por ela. Clique nas fotos para ampliar e ler a história.
          </p>
        </div>

        {/* Mosaico de Polaroids */}
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 mb-16">
          <AnimatePresence>
            {memories.map((mem, index) => {
              // Rotações alternadas orgânicas
              const rotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2'];
              const rotationClass = rotations[index % rotations.length];

              return (
                <motion.div
                  key={mem.id}
                  id={`polaroid-${mem.id}`}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`w-64 bg-white p-4 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${rotationClass} hover:rotate-0 hover:scale-105 z-10 hover:z-20 border border-slate-100 flex flex-col group relative`}
                  onClick={() => setSelectedMemory(mem)}
                >

                  {/* Botão de excluir memória extra criada localmente */}
                  {mem.id.startsWith('mem-') && mem.id !== 'mem-1' && mem.id !== 'mem-2' && mem.id !== 'mem-3' && mem.id !== 'mem-4' && (
                    <button
                      title="Excluir memória"
                      onClick={(e) => handleDeleteMemory(mem.id, e)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100 z-30 shadow-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Foto da Polaroid */}
                  <div className="w-full h-48 bg-slate-100 overflow-hidden relative rounded-sm border border-slate-200">
                    {mem.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mem.imageUrl}
                        alt={mem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      // Gradiente romântico de fundo de alta qualidade
                      <div className={`w-full h-full bg-gradient-to-tr ${mem.color} flex flex-col items-center justify-center p-4 text-[#2C1A4D]`}>
                        <div className="w-12 h-12 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-inner mb-2">
                          {mem.category === 'cooking' && <Coffee className="w-6 h-6 text-[#7E57C2]" />}
                          {mem.category === 'art' && <Palette className="w-6 h-6 text-[#7E57C2]" />}
                          {mem.category === 'sweet' && <Heart className="w-6 h-6 text-[#7E57C2] fill-current" />}
                          {mem.category === 'special' && <Sparkles className="w-6 h-6 text-[#7E57C2]" />}
                        </div>
                        <span className="text-[10px] font-bold tracking-widest uppercase opacity-75">Momentinho Fofo</span>
                      </div>
                    )}

                    {/* Tarja de Categoria */}
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-bold text-[#7E57C2] shadow-sm uppercase tracking-wider">
                      {mem.category === 'cooking' && 'Receita'}
                      {mem.category === 'art' && 'Arte'}
                      {mem.category === 'sweet' && 'Carinho'}
                      {mem.category === 'special' && 'Especial'}
                    </div>
                  </div>

                  {/* Legenda escrita à mão */}
                  <div className="pt-4 pb-2 px-1 text-center">
                    <span className="font-handwritten text-[#7E57C2] text-lg block truncate text-center">
                      {mem.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-1 tracking-wider text-center">
                      {mem.date}
                    </span>
                  </div>

                  {/* Moldura da Polaroid - Detalhe fofo de fita adesiva no topo */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#9575CD]/20 backdrop-blur-[1px] rotate-1 z-0 shadow-sm border border-white/40"></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <WaveDivider fill="#F3E5F5" className="bottom-0" />
      </section>

      {/* 8. Moodboard de Inspirações ("Universo de Coisas que Ela Ama") */}
      <section id="moodboard" className="pt-16 pb-36 bg-[#F3E5F5] relative z-10 px-4 md:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-12 flex flex-col items-center">
          <span className="text-[#9575CD] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9575CD]" /> Sua Estética
          </span>
          <h2 className="text-[#7E57C2] font-serif text-4xl md:text-5xl font-extrabold mt-2 text-center">
            Tudo que Lembra Você ✨
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mt-4 text-center">
            Um pequeno mosaico visual colecionando o universo de estéticas, gostos e coisinhas que compõem o brilho único dela.
          </p>
        </div>

        {/* Grid do Moodboard */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[220px] mb-16">

          {/* Card 1: Monster High / Franky Preferida */}
          <motion.div
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-md border border-purple-100 bg-[#FDF9FE] p-8 flex flex-col justify-between relative group"
          >
            <div className="absolute -right-6 -bottom-8 w-[180px] h-[130px] md:w-[360px] md:h-[260px] opacity-15 md:opacity-20 group-hover:opacity-30 md:group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 pointer-events-none z-0">
              <img
                src="/MH_nobackground.png"
                alt="Monster High"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="relative z-10">
              <span className="bg-[#7E57C2]/10 text-[#7E57C2] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Estética Bonecas & Arte</span>
              <h3 className="text-3xl font-serif font-extrabold text-[#7E57C2] mt-6">Monster High</h3>
              <p className="text-sm text-[#2C1A4D]/85 leading-relaxed mt-4 max-w-lg">
                Seja a paixão por Monster High ou o carinho pela sua Franky preferida, o senso de moda alternativa, as costuras icônicas e a criatividade expressa nas bonecas refletem o olhar artístico e divertido que ela tem sobre o mundo.
              </p>
            </div>
            <div className="relative z-10 flex gap-3 text-xs font-bold text-[#7E57C2] italic mt-8">
              <span> 🦇 "Freaky Just Got Fabulous!"</span>
            </div>
          </motion.div>

          {/* Card 3: Mahou Shoujo / Madoka Vibes */}
          <motion.div
            whileHover={{ scale: 1.03, rotate: -1.5 }}
            className="rounded-3xl overflow-hidden shadow-md border border-pink-100 bg-gradient-to-br from-[#FFE4EC] to-[#FDF9FE] p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute -right-2 -bottom-4 w-20 h-28 md:w-28 md:h-40 opacity-15 md:opacity-20 group-hover:opacity-30 md:group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 pointer-events-none z-0">
              <img
                src="/madoka.png"
                alt="Madoka Kaname"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="relative z-10">
              <span className="bg-[#FFB7D5]/40 text-[#C2185B] px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">Mahou Shoujo</span>
              <h4 className="text-xl font-serif font-extrabold text-[#C2185B] mt-3">Madoka Magica (Você)</h4>
              <p className="text-xs text-[#2C1A4D]/80 leading-relaxed mt-2">
                Você carrega no coração o poderes que uma verdadeira garota mágica deve possuir: a esperança e a empatia pelo próximo.
              </p>
            </div>
            <div className="text-[10px] font-bold text-[#C2185B] flex items-center gap-1.5 mt-2 relative z-10 mt-6">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Sua Soulgen brilha mais do que todas as outras.</span>
            </div>
          </motion.div>

          {/* Card 2: Paleta de Cores Favorita */}
          <motion.div
            whileHover={{ scale: 1.03, rotate: 1.5 }}
            className="rounded-3xl overflow-hidden shadow-md border border-purple-100 bg-white p-6 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Sua Paleta</span>
              <h4 className="text-lg font-serif font-bold text-[#7E57C2] mt-1">As cores da sua Alma</h4>
            </div>
            <div className="flex gap-2.5 my-4">
              <div className="flex-1 h-14 rounded-xl bg-[#7E57C2] flex items-center justify-center text-[10px] text-white font-bold shadow-sm" title="Deep Lilac"></div>
              <div className="flex-1 h-14 rounded-xl bg-[#709CD1] flex items-center justify-center text-[10px] text-white font-bold shadow-sm" title="Classic Lavender"></div>
              <div className="flex-1 h-14 rounded-xl bg-[#BEA2D7] border border-purple-100 flex items-center justify-center text-[10px] text-[#7E57C2] font-bold shadow-sm" title="Creme Suave"></div>
              <div className="flex-1 h-14 rounded-xl bg-[#FB8CAC] flex items-center justify-center text-[10px] text-white font-bold shadow-sm" title="Periwinkle"></div>
            </div>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Tons suaves, românticos e mágicos que expressam delicadeza, calma e imaginação infinita.
            </p>
          </motion.div>

          {/* Card 4: Citações & Poesia */}
          <motion.div
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="md:col-span-2 rounded-3xl overflow-hidden shadow-md border border-purple-100 bg-[#FDF9FE] p-6 flex flex-col justify-between relative group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#9575CD_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pensamento</span>
              <p className="text-[#7E57C2] font-serif italic text-lg md:text-xl font-semibold mt-4 leading-relaxed">
                "Há pessoas que têm em si o dom da arte de colorir a vida alheia com pequenos gestos cotidianos de puro amor."
              </p>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7E57C2] animate-ping mt-6"></div>
              <span className="text-[10px] font-bold text-[#7E57C2] uppercase tracking-widest mt-6">Definição dela</span>
            </div>
          </motion.div>

          {/* Card 5: Doces & Aconchego */}
          <motion.div
            whileHover={{ scale: 1.03, rotate: 2 }}
            className="rounded-3xl overflow-hidden shadow-md border border-purple-100 bg-white p-6 flex flex-col justify-between group"
          >
            <div className="flex justify-between items-start">
              <span className="bg-amber-100 text-amber-600 px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">Aconchego</span>
              <Coffee className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-[#7E57C2] mt-2">Momentos Confortáveis</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                O cheirinho de doce recém-assado, canecas quentinhas de café, tardes tranquilas desenhando na chácara com brisa fresca.
              </p>
            </div>
            <div className="border-t border-amber-50 pt-3 mt-3 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Docinhos & Cafés</span>
            </div>
          </motion.div>

        </div>
        <WaveDivider fill="#FDF9FE" className="bottom-0" />
      </section>

      {/* 7. Modal de Detalhes da Polaroid (Ao Clicar) */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            id="polaroid-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 50, rotate: 2 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white p-6 max-w-lg w-full rounded-2xl shadow-2xl border-4 border-[#9575CD]/30 cursor-default relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Brilhinhos no fundo do modal */}
              <div className="absolute top-0 right-0 p-4 text-[#9575CD]/20 select-none pointer-events-none">
                <Sparkles className="w-16 h-16" />
              </div>

              {/* Foto Ampliada */}
              <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden shadow-inner relative border border-slate-200">
                {selectedMemory.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selectedMemory.imageUrl}
                    alt={selectedMemory.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${selectedMemory.color} flex flex-col items-center justify-center p-6 text-[#2C1A4D]`}>
                    <div className="w-16 h-16 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md mb-3">
                      {selectedMemory.category === 'cooking' && <Coffee className="w-8 h-8 text-[#7E57C2]" />}
                      {selectedMemory.category === 'art' && <Palette className="w-8 h-8 text-[#7E57C2]" />}
                      {selectedMemory.category === 'sweet' && <Heart className="w-8 h-8 text-[#7E57C2] fill-current" />}
                      {selectedMemory.category === 'special' && <Sparkles className="w-8 h-8 text-[#7E57C2]" />}
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase opacity-70 text-center">Memória Especial</span>
                  </div>
                )}

                {/* Categoria flutuante */}
                <div className="absolute top-3 left-3 bg-[#7E57C2] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {selectedMemory.category === 'cooking' && '🧁 Receita deliciosa'}
                  {selectedMemory.category === 'art' && '🎨 Dom artístico'}
                  {selectedMemory.category === 'sweet' && '💌 Gesto de carinho'}
                  {selectedMemory.category === 'special' && '✨ Momento mágico'}
                </div>
              </div>

              {/* Textos da Polaroid */}
              <div className="mt-6 text-center">
                <h3 className="font-handwritten text-[#7E57C2] text-3xl leading-none text-center">
                  {selectedMemory.title}
                </h3>
                <div className="flex justify-center items-center gap-2 text-xs text-slate-400 font-bold mt-2 uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedMemory.date}</span>
                </div>

                <p className="mt-4 text-[#2C1A4D] leading-relaxed text-sm text-justify px-2 font-medium bg-[#FDF9FE] p-4 rounded-xl border border-purple-100/50 shadow-inner">
                  {selectedMemory.description}
                </p>
              </div>

              {/* Ações: Upload de foto + Remover foto */}
              <div className="mt-6 flex flex-col gap-3">

                {/* Upload de foto */}
                <label className="w-full py-3 rounded-xl font-bold text-sm text-[#7E57C2] bg-[#FDF9FE] border-2 border-dashed border-[#9575CD] hover:bg-[#D1C4E9]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95">
                  <Camera className="w-4 h-4" />
                  <span>{selectedMemory.imageUrl ? 'Trocar Foto' : 'Adicionar Foto'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (!selectedMemory) return;
                        const updated = memories.map(m =>
                          m.id === selectedMemory.id
                            ? { ...m, imageUrl: reader.result as string }
                            : m
                        );
                        setMemories(updated);
                        setSelectedMemory({ ...selectedMemory, imageUrl: reader.result as string });
                        localStorage.setItem('site_meu_amor_memories', JSON.stringify(updated));
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>

                {/* Categoria */}
                <select
                  value={selectedMemory.category}
                  onChange={(e) => {
                    if (!selectedMemory) return;
                    const cat = e.target.value as Memory['category'];
                    const updated = memories.map(m =>
                      m.id === selectedMemory.id ? { ...m, category: cat } : m
                    );
                    setMemories(updated);
                    setSelectedMemory({ ...selectedMemory, category: cat });
                    localStorage.setItem('site_meu_amor_memories', JSON.stringify(updated));
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-purple-100 bg-[#FDF9FE] focus:ring-2 focus:ring-[#9575CD] focus:outline-none text-sm text-[#2C1A4D] font-semibold cursor-pointer"
                >
                  <option value="special">✨ Momento Mágico</option>
                  <option value="cooking">🧁 Culinária / Receita</option>
                  <option value="art">🎨 Desenho / Arte</option>
                  <option value="sweet">💌 Gesto de Carinho</option>
                </select>

                {/* Remover foto (só aparece se tiver foto) */}
                {selectedMemory.imageUrl && (
                  <button
                    onClick={() => {
                      if (!selectedMemory) return;
                      const updated = memories.map(m =>
                        m.id === selectedMemory.id ? { ...m, imageUrl: undefined } : m
                      );
                      setMemories(updated);
                      setSelectedMemory({ ...selectedMemory, imageUrl: undefined });
                      localStorage.setItem('site_meu_amor_memories', JSON.stringify(updated));
                    }}
                    className="w-full py-3 rounded-xl font-bold text-sm text-red-400 bg-red-50 hover:bg-red-100 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remover Foto</span>
                  </button>
                )}

                {/* Fechar */}
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="w-full py-2.5 rounded-xl font-bold text-sm text-white bg-[#7E57C2] hover:bg-[#5E35B1] transition-colors duration-200 shadow-md active:scale-95 cursor-pointer"
                >
                  Fechar com amor ❤️
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. Encerramento Romântico */}
      <section className="py-24 bg-[#FDF9FE] text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto flex flex-col items-center"
        >
          <div className="inline-block p-4 rounded-full bg-[#D1C4E9]/30 text-[#7E57C2] mb-6 animate-heart-pulse">
            <Heart className="w-12 h-12 fill-current" />
          </div>

          <h2 className="text-[#7E57C2] font-serif text-4xl md:text-5xl font-extrabold leading-tight text-center">
            Para Todo o Sempre.
          </h2>

          <p className="text-base leading-relaxed mt-6 text-[#2C1A4D] font-medium text-center">
            Você é a garota que sempre sonhei.
            Suas menores conquistas são grandes motivos de orgulho para mim. Nunca se esqueça do quão única e especial você é.
          </p>

          <p className="text-lg font-handwritten text-[#7E57C2] mt-8 text-2xl text-center">
            Com todo o meu amor, Henrique.
          </p>
        </motion.div>
      </section>
    </main>
  );
}

// ==========================================
// DIVISOR DE ONDA MÁGICA (WAVE DIVIDER)
// ==========================================
function WaveDivider({ fill, className = "" }: { fill: string; className?: string }) {
  return (
    <div className={`absolute left-0 w-full overflow-hidden leading-none z-20 ${className}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px]">
        <path d="M0,0 C150,90 350,90 500,40 C650,-10 850,-10 1000,40 C1150,90 1200,90 1200,90 L1200,120 L0,120 Z" fill={fill}></path>
      </svg>
    </div>
  );
}

// ==========================================
// COMPONENTES VETORIAIS DE MADOKA MÁGICA (SVG)
// ==========================================

// 1. Gema da Alma Rosa (Madoka)
function PinkSoulGem() {
  return (
    <svg viewBox="0 0 100 130" className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,105,180,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base dourada */}
      <path d="M30 110 C 30 122, 70 122, 70 110 Z" fill="url(#goldGrad)" stroke="#A0781D" strokeWidth="1" />
      <rect x="38" y="102" width="24" height="8" rx="2" fill="url(#goldGrad)" stroke="#A0781D" strokeWidth="1" />
      {/* Estrutura Oval */}
      <path d="M50 15 C 20 40, 20 85, 35 102 C 45 107, 55 107, 65 102 C 80 85, 80 40, 50 15 Z" fill="url(#goldGrad)" stroke="#A0781D" strokeWidth="1" />
      {/* Gema Rosa Interna */}
      <path d="M50 25 C 28 45, 28 80, 39 95 C 45 99, 55 99, 61 95 C 72 80, 72 45, 50 25 Z" fill="url(#pinkGemGrad)" />
      {/* Detalhes dourados sobre a gema */}
      <circle cx="50" cy="92" r="5" fill="#FFE89C" stroke="#A0781D" strokeWidth="0.75" />
      <path d="M50 25 V 87" stroke="#A0781D" strokeWidth="0.75" strokeDasharray="2 2" />
      {/* Coroa/Ponta superior */}
      <path d="M45 15 L 50 3 L 55 15 Z" fill="url(#goldGrad)" stroke="#A0781D" strokeWidth="1" />
      <circle cx="50" cy="2" r="2.5" fill="#FFB7D5" stroke="#A0781D" strokeWidth="0.75" />
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2C3" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A640F" />
        </linearGradient>
        <radialGradient id="pinkGemGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFF0F5" />
          <stop offset="40%" stopColor="#FF69B4" />
          <stop offset="100%" stopColor="#A1005B" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// 2. Gema da Alma Roxa (Homura)
function PurpleSoulGem() {
  return (
    <svg viewBox="0 0 100 130" className="w-full h-auto drop-shadow-[0_0_15px_rgba(138,43,226,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 110 C 30 122, 70 122, 70 110 Z" fill="url(#purpleGoldGrad)" stroke="#6C4E0B" strokeWidth="1" />
      <rect x="38" y="102" width="24" height="8" rx="2" fill="url(#purpleGoldGrad)" stroke="#6C4E0B" strokeWidth="1" />
      <path d="M50 15 C 20 40, 20 85, 35 102 C 45 107, 55 107, 65 102 C 80 85, 80 40, 50 15 Z" fill="url(#purpleGoldGrad)" stroke="#6C4E0B" strokeWidth="1" />
      <path d="M50 25 C 28 45, 28 80, 39 95 C 45 99, 55 99, 61 95 C 72 80, 72 45, 50 25 Z" fill="url(#purpleGemGrad)" />
      <circle cx="50" cy="92" r="5" fill="#E6C687" stroke="#6C4E0B" strokeWidth="0.75" />
      <path d="M50 25 V 87" stroke="#6C4E0B" strokeWidth="0.75" strokeDasharray="2 2" />
      <path d="M45 15 L 50 3 L 55 15 Z" fill="url(#purpleGoldGrad)" stroke="#6C4E0B" strokeWidth="1" />
      <circle cx="50" cy="2" r="2.5" fill="#D8BFD8" stroke="#6C4E0B" strokeWidth="0.75" />
      <defs>
        <linearGradient id="purpleGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E3B5" />
          <stop offset="50%" stopColor="#C59E30" />
          <stop offset="100%" stopColor="#75560A" />
        </linearGradient>
        <radialGradient id="purpleGemGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#F8F8FF" />
          <stop offset="40%" stopColor="#9370DB" />
          <stop offset="100%" stopColor="#4B0082" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// 3. Gema da Alma Amarela (Mami)
function YellowSoulGem() {
  return (
    <svg viewBox="0 0 100 130" className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 110 C 30 122, 70 122, 70 110 Z" fill="url(#yellowGoldGrad)" stroke="#8A640F" strokeWidth="1" />
      <rect x="38" y="102" width="24" height="8" rx="2" fill="url(#yellowGoldGrad)" stroke="#8A640F" strokeWidth="1" />
      <path d="M50 15 C 20 40, 20 85, 35 102 C 45 107, 55 107, 65 102 C 80 85, 80 40, 50 15 Z" fill="url(#yellowGoldGrad)" stroke="#8A640F" strokeWidth="1" />
      <path d="M50 25 C 28 45, 28 80, 39 95 C 45 99, 55 99, 61 95 C 72 80, 72 45, 50 25 Z" fill="url(#yellowGemGrad)" />
      <circle cx="50" cy="92" r="5" fill="#FFE89C" stroke="#8A640F" strokeWidth="0.75" />
      <path d="M50 25 V 87" stroke="#8A640F" strokeWidth="0.75" strokeDasharray="2 2" />
      <path d="M45 15 L 50 3 L 55 15 Z" fill="url(#yellowGoldGrad)" stroke="#8A640F" strokeWidth="1" />
      <circle cx="50" cy="2" r="2.5" fill="#FFF8DC" stroke="#8A640F" strokeWidth="0.75" />
      <defs>
        <linearGradient id="yellowGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9E0" />
          <stop offset="50%" stopColor="#E5C142" />
          <stop offset="100%" stopColor="#9E780E" />
        </linearGradient>
        <radialGradient id="yellowGemGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFFFF0" />
          <stop offset="45%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// 4. Gema da Alma Azul (Sayaka)
function BlueSoulGem() {
  return (
    <svg viewBox="0 0 100 130" className="w-full h-auto drop-shadow-[0_0_15px_rgba(0,191,255,0.4)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 110 C 30 122, 70 122, 70 110 Z" fill="url(#blueGoldGrad)" stroke="#7A5C0E" strokeWidth="1" />
      <rect x="38" y="102" width="24" height="8" rx="2" fill="url(#blueGoldGrad)" stroke="#7A5C0E" strokeWidth="1" />
      <path d="M50 15 C 20 40, 20 85, 35 102 C 45 107, 55 107, 65 102 C 80 85, 80 40, 50 15 Z" fill="url(#blueGoldGrad)" stroke="#7A5C0E" strokeWidth="1" />
      <path d="M50 25 C 28 45, 28 80, 39 95 C 45 99, 55 99, 61 95 C 72 80, 72 45, 50 25 Z" fill="url(#blueGemGrad)" />
      <circle cx="50" cy="92" r="5" fill="#FFE89C" stroke="#7A5C0E" strokeWidth="0.75" />
      <path d="M50 25 V 87" stroke="#7A5C0E" strokeWidth="0.75" strokeDasharray="2 2" />
      <path d="M45 15 L 50 3 L 55 15 Z" fill="url(#blueGoldGrad)" stroke="#7A5C0E" strokeWidth="1" />
      <circle cx="50" cy="2" r="2.5" fill="#E0FFFF" stroke="#7A5C0E" strokeWidth="0.75" />
      <defs>
        <linearGradient id="blueGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4D0" />
          <stop offset="50%" stopColor="#D8B33C" />
          <stop offset="100%" stopColor="#876208" />
        </linearGradient>
        <radialGradient id="blueGemGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#F0FFFF" />
          <stop offset="40%" stopColor="#00BFFF" />
          <stop offset="100%" stopColor="#005B94" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// 5. Bastão Mágico da Madoka (Arco/Cetro de Varinha)
function MagicalWand() {
  return (
    <svg viewBox="0 0 80 180" className="w-full h-auto drop-shadow-[0_0_20px_rgba(255,105,180,0.5)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Haste/Cabo */}
      <rect x="36" y="70" width="8" height="100" rx="4" fill="url(#wandGoldGrad)" stroke="#9A7418" strokeWidth="1" />
      <rect x="33" y="165" width="14" height="10" rx="3" fill="#FFB7D5" stroke="#9A7418" strokeWidth="1" />
      {/* Joias do cabo */}
      <circle cx="40" cy="130" r="3" fill="#FF69B4" />
      <circle cx="40" cy="100" r="3" fill="#FF69B4" />

      {/* Base do topo */}
      <path d="M25 60 C 25 75, 55 75, 55 60 Z" fill="url(#wandGoldGrad)" stroke="#9A7418" strokeWidth="1" />

      {/* Asinhas Brancas */}
      {/* Asa Esquerda */}
      <path d="M26 48 C 10 40, 5 60, 20 62 C 10 55, 12 68, 26 64 Z" fill="#FFFFFF" stroke="#FFB7D5" strokeWidth="1" />
      {/* Asa Direita */}
      <path d="M54 48 C 70 40, 75 60, 60 62 C 70 55, 68 68, 54 64 Z" fill="#FFFFFF" stroke="#FFB7D5" strokeWidth="1" />

      {/* Coração Rosa Principal */}
      <path d="M40 22 C 40 22, 20 5, 20 25 C 20 45, 40 58, 40 58 C 40 58, 60 45, 60 25 C 60 5, 40 22, 40 22 Z" fill="url(#wandHeartGrad)" stroke="#9A7418" strokeWidth="1.25" />

      {/* Coroa Superior da Varinha */}
      <path d="M32 12 L 34 5 L 40 9 L 46 5 L 48 12 Z" fill="url(#wandGoldGrad)" stroke="#9A7418" strokeWidth="1" />
      <circle cx="40" cy="3" r="2" fill="#FFD700" stroke="#9A7418" strokeWidth="0.5" />

      <defs>
        <linearGradient id="wandGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF6D5" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#7E5D0C" />
        </linearGradient>
        <radialGradient id="wandHeartGrad" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#FFF5FA" />
          <stop offset="45%" stopColor="#FF69B4" />
          <stop offset="100%" stopColor="#A8005A" />
        </radialGradient>
      </defs>
    </svg>
  );
}
