'use client';

import {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Star } from 'lucide-react';


export default function Home() {
  return (
   
    <main className='min-h-screen bg-[#F7F2EB] flex flex-col items-center justify-center'>


      <span className='text-[#F294AD] font-extrabold'> ★── ⋆˖˚🌸  My Mahou Shoujo 🌸˚˖⋆ ──★ </span>
      <h1  className='text-[#D9487D] font-serif text-8xl text-center mx-auto mt-8'>Para a minha <br /></h1>
      <h1  className='text-[#D9487D] font-serif text-8xl text-center mx-auto mb-8'>Garota Mágica.</h1>

      <p className='text-base md:text-lg italic font-medium mb-8 text-[#D9487D]'>O Amor da Minha vida, e por quem eu faria tanto.</p>

      <p className="text-sm md:text-base text-[#D9487D] max-w-xl mx-auto leading-relaxed mb-10 text-center w-full px-4">
      Hoje é o seu dia especial, e eu quis criar algo tão único e maravilhoso 
      quanto você é para mim, para que você sempre se lembre da importância desde dia, para você e para mim.
      </p>

            {/* 6. Contêiner dos Botões */}
      <div className="z-10 flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
        
        {/* Botão Principal Estilo "Explore Your Birthday Gift" */}
        <button className="
          /* Estrutura e Alinhamento */
          flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm text-white
          
          /* Cores e Sombra Padrão (Rosa Cereja idêntico à foto) */
          bg-[#D9487D] shadow-lg shadow-rose-200/50
          
          /* TRANSIÇÕES E EFEITOS ANIMADOS (A Mágica acontece aqui) */
          transition-all duration-300 ease-out
          hover:scale-105 hover:bg-[#C11843] hover:shadow-xl hover:shadow-rose-300/60
          active:scale-95
          group
        ">
          <span>Dá uma olhadinha</span>
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>

      </div>


    </main>
    

  )
}
