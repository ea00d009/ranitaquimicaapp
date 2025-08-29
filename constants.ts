import { Question } from './types';

export const INITIAL_LIVES = 3;

export const QUESTIONS: Question[] = [
  {
    question: "¿Qué es la unidad de masa atómica (uma)?",
    options: [
      "La masa de un átomo de hidrógeno.",
      "La doceava parte de la masa de un átomo de carbono-12.",
      "El peso total de un mol de sustancia."
    ],
    correctAnswerIndex: 1
  },
  {
    question: "El número de Avogadro representa:",
    options: [
      "El número de átomos en 1 gramo de una sustancia.",
      "El número de partículas (átomos, moléculas) en un mol.",
      "La velocidad de los electrones en un átomo."
    ],
    correctAnswerIndex: 1
  },
  {
    question: "¿Qué es la masa molar de un compuesto?",
    options: [
      "La masa de una sola molécula en gramos.",
      "La suma de las masas atómicas de los átomos en la fórmula.",
      "El volumen que ocupa un mol del compuesto."
    ],
    correctAnswerIndex: 1
  },
  {
    question: "Si la masa atómica del O es ~16 uma, ¿cuál es la masa molar de O₂?",
    options: [
      "16 g/mol",
      "8 g/mol",
      "32 g/mol"
    ],
    correctAnswerIndex: 2
  },
  {
    question: "¿Qué es un mol?",
    options: [
      "Una unidad de volumen para gases.",
      "Una cantidad de sustancia que contiene 6.022 x 10²³ entidades.",
      "Una unidad de masa equivalente a un kilogramo."
    ],
    correctAnswerIndex: 1
  },
  {
    question: "Para calcular los moles, se divide la masa de la muestra por...",
    options: [
      "El número de Avogadro.",
      "Su masa molar.",
      "Su número atómico."
    ],
    correctAnswerIndex: 1
  },
  {
    question: "¿Cuál de las siguientes es una magnitud adimensional (sin unidades)?",
    options: [
      "Masa atómica relativa",
      "Masa molar",
      "Volumen molar"
    ],
    correctAnswerIndex: 0
  },
  {
    question: "La fórmula empírica representa...",
    options: [
      "La proporción más simple de átomos en un compuesto.",
      "El número exacto de átomos de cada elemento.",
      "La estructura 3D de una molécula."
    ],
    correctAnswerIndex: 0
  },
  {
    question: "Calcula la masa molar del agua (H₂O), si H≈1 y O≈16.",
    options: [
      "17 g/mol",
      "18 g/mol",
      "34 g/mol"
    ],
    correctAnswerIndex: 1
  },
  {
    question: "¿Cuántos átomos hay en 2 moles de helio (He)?",
    options: [
      "6.022 x 10²³ átomos",
      "3.011 x 10²³ átomos",
      "12.044 x 10²³ átomos"
    ],
    correctAnswerIndex: 2
  }
];