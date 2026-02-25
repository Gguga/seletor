import { useEffect } from "react";
import { motion } from "motion/react";
import { UserData } from "../types";

interface ResultScreenProps {
  key?: string;
  data: UserData;
  onReset: () => void;
}

export function ResultScreen({ data, onReset }: ResultScreenProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const calculateRecommendation = () => {
    const height = parseInt(data.height, 10);
    const isMaintenance = data.goalStatus === "manter";
    let baseKcal = 0;

    if (data.gender === "F") {
      if (height < 160) baseKcal = 1250;
      else if (height >= 160 && height <= 170) baseKcal = 1500;
      else baseKcal = 1750;
    } else {
      if (height < 170) baseKcal = 1500;
      else if (height >= 170 && height <= 185) baseKcal = 1750;
      else baseKcal = 2000;
    }

    return { baseKcal, isMaintenance };
  };

  const { baseKcal, isMaintenance } = calculateRecommendation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen p-6 flex flex-col justify-center items-center pt-12 md:pt-16 pb-8"
    >
      <div className="w-full max-w-lg flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden mb-8">
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-brand-green)] to-[var(--color-brand-dark)] opacity-80" />

          <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-8">
            Sua Estrutura Recomendada
          </h2>

          <div className="mb-10">
            {isMaintenance ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                  Manutenção
                  <br />
                  estruturada
                </h3>
                <div className="inline-block px-4 py-1.5 bg-[var(--color-brand-green)]/10 text-[var(--color-brand-green)] rounded-full text-sm font-semibold mb-6">
                  Fase de Consolidação
                </div>
                <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
                  Você está na fase de consolidação metabólica. Sua recomendação
                  é iniciar em manutenção estratégica.
                </p>
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100 text-left">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Plano base recomendado: {baseKcal} kcal
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Instrução para adicionar:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-green)] mr-2" />
                      +1 porção de carboidrato
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-green)] mr-2" />
                      +2 porções de fruta
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="text-5xl md:text-6xl font-black text-[var(--color-brand-green)] tracking-tighter mb-2">
                  {baseKcal}
                </h3>
                <p className="text-xl font-bold text-gray-900 mb-6">
                  kcal estratégicas
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Essa faixa foi definida com base nos seus dados e na sua fase
                  atual do tratamento. O objetivo é preservar massa muscular,
                  reduzir vulnerabilidade metabólica e estruturar a manutenção.
                </p>
              </motion.div>
            )}
          </div>

          <div className="space-y-4 mt-12">
            <button className="w-full py-4 bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-green)] text-white font-semibold rounded-xl shadow-sm transition-all duration-300 ease-out transform hover:-translate-y-0.5">
              Acessar meu plano
            </button>
            <button className="w-full py-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-300 ease-out">
              Quero acompanhamento personalizado
            </button>
          </div>

          <button
            onClick={onReset}
            className="mt-8 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-4 transition-colors"
          >
            Refazer avaliação
          </button>
        </div>
      </div>

      <div className="mt-auto pt-4 text-center">
        <p className="text-xs text-gray-400">
          Protocolo Anti Rebote - Todos os direitos reservados
        </p>
      </div>
    </motion.div>
  );
}
