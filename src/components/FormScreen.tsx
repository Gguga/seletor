import { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserData, Gender, TrainingFrequency, GoalStatus } from "../types";
import { ArrowLeft } from "lucide-react";

interface FormScreenProps {
  key?: string;
  onSubmit: (data: UserData) => void;
}

export function FormScreen({ onSubmit }: FormScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserData>({
    gender: "",
    age: "",
    height: "170", // Default value for slider
    weight: "",
    trainingFrequency: "",
    goalStatus: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const handleGenderSelect = (g: Gender) => {
    setFormData((prev) => ({ ...prev, gender: g }));
    setTimeout(handleNext, 300);
  };

  const handleFrequencySelect = (freq: TrainingFrequency) => {
    setFormData((prev) => ({ ...prev, trainingFrequency: freq }));
    setTimeout(handleNext, 300);
  };

  const handleGoalSelect = (goal: GoalStatus) => {
    const newData = { ...formData, goalStatus: goal };
    setFormData(newData);
    setTimeout(() => onSubmit(newData), 300);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Qual o seu sexo?
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(["M", "F"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGenderSelect(g)}
                  className={`py-4 px-6 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between ${
                    formData.gender === g
                      ? "border-[var(--color-brand-green)] bg-[var(--color-brand-green)]/5 text-[var(--color-brand-green)]"
                      : "border-gray-100 text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">
                    {g === "M" ? "HOMEM" : "MULHER"}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.gender === g
                        ? "border-[var(--color-brand-green)]"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.gender === g && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-green)]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Qual a sua idade?
              </h3>
            </div>
            <div className="space-y-6">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Ex: 30"
                autoFocus
                className="w-full text-center text-4xl font-bold px-4 py-6 rounded-2xl border-2 border-gray-100 focus:border-[var(--color-brand-green)] focus:ring-0 outline-none transition-all text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:bg-white"
              />
              <button
                type="button"
                disabled={!formData.age}
                onClick={handleNext}
                className="w-full py-4 bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-green)] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-xl transition-all"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Qual a sua altura?
              </h3>
              <p className="text-sm text-gray-500">
                Deslize para ajustar (em cm).
              </p>
            </div>
            <div className="space-y-8 py-4">
              <div className="text-center">
                <span className="text-5xl font-black text-[var(--color-brand-green)] tracking-tighter">
                  {formData.height}
                </span>
                <span className="text-xl font-bold text-gray-400 ml-1">cm</span>
              </div>
              <input
                type="range"
                name="height"
                min="140"
                max="220"
                value={formData.height}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-green)]"
              />
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-4 bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-green)] text-white font-semibold rounded-xl transition-all"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Qual o seu peso atual?
              </h3>
              <p className="text-sm text-gray-500">Em quilogramas (kg).</p>
            </div>
            <div className="space-y-6">
              <input
                type="number"
                name="weight"
                step="0.1"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Ex: 75.5"
                autoFocus
                className="w-full text-center text-4xl font-bold px-4 py-6 rounded-2xl border-2 border-gray-100 focus:border-[var(--color-brand-green)] focus:ring-0 outline-none transition-all text-gray-900 placeholder-gray-300 bg-gray-50/50 focus:bg-white"
              />
              <button
                type="button"
                disabled={!formData.weight}
                onClick={handleNext}
                className="w-full py-4 bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-green)] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-xl transition-all"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Frequência de treino
              </h3>
              <p className="text-sm text-gray-500">
                Quantas vezes por semana você se exercita?
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(["0-1x", "2-3x", "4+"] as TrainingFrequency[]).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => handleFrequencySelect(freq)}
                  className={`py-4 px-6 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between ${
                    formData.trainingFrequency === freq
                      ? "border-[var(--color-brand-green)] bg-[var(--color-brand-green)]/5 text-[var(--color-brand-green)]"
                      : "border-gray-100 text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{freq} por semana</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.trainingFrequency === freq
                        ? "border-[var(--color-brand-green)]"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.trainingFrequency === freq && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-green)]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">
                Já atingiu seu objetivo?
              </h3>
              <p className="text-sm text-gray-500">
                Isso define a estratégia calórica.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={() => handleGoalSelect("emagrecer")}
                className={`py-5 px-6 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between ${
                  formData.goalStatus === "emagrecer"
                    ? "border-[var(--color-brand-green)] bg-[var(--color-brand-green)]/5 text-[var(--color-brand-green)]"
                    : "border-gray-100 text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">Ainda quero emagrecer</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.goalStatus === "emagrecer"
                      ? "border-[var(--color-brand-green)]"
                      : "border-gray-300"
                  }`}
                >
                  {formData.goalStatus === "emagrecer" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-green)]" />
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleGoalSelect("manter")}
                className={`py-5 px-6 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between ${
                  formData.goalStatus === "manter"
                    ? "border-[var(--color-brand-green)] bg-[var(--color-brand-green)]/5 text-[var(--color-brand-green)]"
                    : "border-gray-100 text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-lg">Já cheguei e quero manter</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.goalStatus === "manter"
                      ? "border-[var(--color-brand-green)]"
                      : "border-gray-300"
                  }`}
                >
                  {formData.goalStatus === "manter" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-green)]" />
                  )}
                </div>
              </button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen p-6 flex flex-col items-center pt-8 md:pt-16 pb-8"
    >
      <div className="w-full max-w-md flex-1 flex flex-col">
        {/* Header with Back Button and Progress */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`p-2 -ml-2 rounded-full transition-colors ${
              step === 1
                ? "opacity-0 pointer-events-none"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-sm font-semibold text-gray-400 tracking-widest">
            ETAPA {step} DE 6
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-10 overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-brand-green)]"
            initial={{ width: `${((step - 1) / 6) * 100}%` }}
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[400px] flex flex-col justify-center mb-8">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
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
