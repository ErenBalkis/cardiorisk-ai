/**
 * CardioRisk AI — Application Constants
 * 
 * Contains feature definitions, default values (median/mode from training data),
 * and UI configuration for the heart attack risk prediction wizard.
 */

// ─── Default Values (Median for numerical, Mode for categorical) ────────────
// These values are derived from the UCI Heart Disease dataset (303 records).
// Used when the user does not fill in the optional "Advanced Clinical Data" fields.
export const DEFAULTS = {
  fbs: 0,        // Fasting blood sugar > 120 mg/dl — Mode: 0 (85% are 0)
  restecg: 1,    // Resting ECG results — Mode: 1 (Normal)
  exng: 0,       // Exercise-induced angina — Mode: 0 (67% are 0)
  oldpeak: 0.8,  // ST depression — Median: 0.8
  slp: 2,        // Slope of peak exercise ST segment — Mode: 2 (Flat)
  caa: 0,        // Number of major vessels colored by fluoroscopy — Mode: 0 (57%)
  thall: 2,      // Thalassemia — Mode: 2 (Normal, 55%)
};

// ─── Wizard Step Definitions ─────────────────────────────────────────────────
export const STEPS = [
  { id: 'age', label: 'Age', icon: '🎂' },
  { id: 'sex', label: 'Gender', icon: '👤' },
  { id: 'cp', label: 'Chest Pain', icon: '💓' },
  { id: 'trtbps', label: 'Blood Pressure', icon: '🩺' },
  { id: 'chol', label: 'Cholesterol', icon: '🧪' },
  { id: 'thalachh', label: 'Heart Rate', icon: '❤️‍🔥' },
];

// ─── Chest Pain Type Descriptions ────────────────────────────────────────────
export const CHEST_PAIN_TYPES = [
  {
    value: 0,
    title: 'Typical Angina',
    description: 'Predictable chest pain triggered by exertion or stress, relieved by rest.',
    icon: '😣',
    color: 'from-red-500/20 to-red-600/10',
    borderColor: 'border-red-500/50',
  },
  {
    value: 1,
    title: 'Atypical Angina',
    description: 'Chest discomfort that doesn\'t follow typical angina patterns.',
    icon: '😕',
    color: 'from-orange-500/20 to-orange-600/10',
    borderColor: 'border-orange-500/50',
  },
  {
    value: 2,
    title: 'Non-Anginal Pain',
    description: 'Chest pain that is unlikely to be related to heart disease.',
    icon: '🤔',
    color: 'from-yellow-500/20 to-yellow-600/10',
    borderColor: 'border-yellow-500/50',
  },
  {
    value: 3,
    title: 'Asymptomatic',
    description: 'No chest pain or discomfort experienced at all.',
    icon: '😊',
    color: 'from-green-500/20 to-green-600/10',
    borderColor: 'border-green-500/50',
  },
];

// ─── Advanced Field Definitions ──────────────────────────────────────────────
export const ADVANCED_FIELDS = [
  {
    id: 'fbs',
    label: 'Fasting Blood Sugar',
    description: 'Is fasting blood sugar > 120 mg/dl?',
    type: 'toggle',
    options: [
      { value: 0, label: 'No (≤ 120)' },
      { value: 1, label: 'Yes (> 120)' },
    ],
  },
  {
    id: 'restecg',
    label: 'Resting ECG',
    description: 'Resting electrocardiographic results',
    type: 'select',
    options: [
      { value: 0, label: 'Normal' },
      { value: 1, label: 'ST-T Abnormality' },
      { value: 2, label: 'LV Hypertrophy' },
    ],
  },
  {
    id: 'exng',
    label: 'Exercise-Induced Angina',
    description: 'Chest pain during exercise?',
    type: 'toggle',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
  {
    id: 'oldpeak',
    label: 'ST Depression (Oldpeak)',
    description: 'ST depression induced by exercise relative to rest',
    type: 'number',
    min: 0,
    max: 7,
    step: 0.1,
  },
  {
    id: 'slp',
    label: 'ST Slope',
    description: 'The slope of the peak exercise ST segment',
    type: 'select',
    options: [
      { value: 0, label: 'Downsloping' },
      { value: 1, label: 'Flat' },
      { value: 2, label: 'Upsloping' },
    ],
  },
  {
    id: 'caa',
    label: 'Major Vessels (Fluoroscopy)',
    description: 'Number of major vessels colored by fluoroscopy (0-4)',
    type: 'select',
    options: [
      { value: 0, label: '0' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
    ],
  },
  {
    id: 'thall',
    label: 'Thalassemia',
    description: 'Blood disorder type classification',
    type: 'select',
    options: [
      { value: 0, label: 'Null' },
      { value: 1, label: 'Fixed Defect' },
      { value: 2, label: 'Normal' },
      { value: 3, label: 'Reversible Defect' },
    ],
  },
];

// ─── API Configuration ───────────────────────────────────────────────────────
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ─── Risk Level Thresholds ───────────────────────────────────────────────────
export const RISK_LEVELS = {
  LOW: { max: 0.3, label: 'Low Risk', color: '#2EC4B6', bgClass: 'from-emerald-500/20 to-teal-500/10' },
  MODERATE: { max: 0.6, label: 'Moderate Risk', color: '#F4A261', bgClass: 'from-amber-500/20 to-orange-500/10' },
  HIGH: { max: 1.0, label: 'High Risk', color: '#E63946', bgClass: 'from-red-500/20 to-rose-600/10' },
};

/**
 * Returns the risk level configuration based on probability value.
 * @param {number} probability - Risk probability between 0 and 1
 * @returns {object} Risk level configuration
 */
export function getRiskLevel(probability) {
  if (probability <= RISK_LEVELS.LOW.max) return RISK_LEVELS.LOW;
  if (probability <= RISK_LEVELS.MODERATE.max) return RISK_LEVELS.MODERATE;
  return RISK_LEVELS.HIGH;
}
