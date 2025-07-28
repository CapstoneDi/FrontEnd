/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './BMICalculator.css';
import ResultCard from './ResultCard';
import { calculateBMI, getBMICategory } from '../../utils/bmi';
import { generateAIRecommendations } from '../../utils/aiRecommendationRules';
import { getGroqRecommendation } from '../../utils/groqApi';

const BMICalculator = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [groqRecommendation, setGroqRecommendation] = useState('');
  const [loadingGroq, setLoadingGroq] = useState(false);
  const [groqError, setGroqError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGroqRecommendation('');
    setGroqError('');
    try {
      const heightValue = parseFloat(height);
      const weightValue = parseFloat(weight);
      const ageValue = parseInt(age);
      if (isNaN(heightValue) || isNaN(weightValue) || isNaN(ageValue) || heightValue <= 0 || weightValue <= 0 || ageValue <= 0) {
        alert('Mohon masukkan data yang valid.');
        setIsSubmitting(false);
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const bmi = calculateBMI(weightValue, heightValue);
      const category = getBMICategory(bmi);
      const aiRecs = generateAIRecommendations(bmi, ageValue, gender, heightValue, weightValue);
      setBmiResult({
        bmi: bmi,
        ...category,
        gender: gender,
        age: ageValue,
        height: heightValue,
        weight: weightValue
      });
      setAiRecommendations(aiRecs);
      setLoadingGroq(true);
      try {
        const groqResult = await getGroqRecommendation({ bmi, age: ageValue, gender, height: heightValue, weight: weightValue });
        setGroqRecommendation(groqResult);
      } catch (err) {
        setGroqError('Gagal mendapatkan saran AI personal.');
      } finally {
        setLoadingGroq(false);
      }
    } catch (error) {
      console.error('Error calculating BMI:', error);
      alert('Error calculating BMI. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCalculation = () => {
    setBmiResult(null);
    setAiRecommendations(null);
    setGroqRecommendation('');
    setGroqError('');
  };

  const incrementValue = (field, min = 1, max = 500, step = 1) => {
    const currentValue = field === 'age' ? age : field === 'height' ? height : weight;
    const numValue = parseFloat(currentValue) || 0;
    const newValue = Math.min(numValue + step, max);
    if (field === 'age') setAge(newValue.toString());
    else if (field === 'height') setHeight(newValue.toString());
    else if (field === 'weight') setWeight(newValue.toString());
  };

  const decrementValue = (field, min = 1, max = 500, step = 1) => {
    const currentValue = field === 'age' ? age : field === 'height' ? height : weight;
    const numValue = parseFloat(currentValue) || 0;
    const newValue = Math.max(numValue - step, min);
    if (field === 'age') setAge(newValue.toString());
    else if (field === 'height') setHeight(newValue.toString());
    else if (field === 'weight') setWeight(newValue.toString());
  };

  const isFormValid = gender && age && height && weight;

  return (
    <div className="bmi-calculator">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>INPUT GENDER</label>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              required
            >
              <option value="" disabled>SELECT</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>INPUT AGE</label>
            <div className="input-with-arrows">
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                placeholder="Enter your age"
                min="1"
                max="120"
                required 
              />
              <div className="number-arrows">
                <div className="arrow-btn up" onClick={() => incrementValue('age', 1, 120, 1)}>▲</div>
                <div className="arrow-btn down" onClick={() => decrementValue('age', 1, 120, 1)}>▼</div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>INPUT HEIGHT</label>
            <div className="input-with-arrows">
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(e.target.value)} 
                placeholder="Enter your height"
                min="50"
                max="300"
                step="0.1"
                required 
              />
              <div className="number-arrows">
                <div className="arrow-btn up" onClick={() => incrementValue('height', 50, 300, 0.5)}>▲</div>
                <div className="arrow-btn down" onClick={() => decrementValue('height', 50, 300, 0.5)}>▼</div>
              </div>
              <span className="unit-label">CM</span>
            </div>
          </div>
          <div className="form-group">
            <label>INPUT WEIGHT</label>
            <div className="input-with-arrows">
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                placeholder="Enter your weight"
                min="1"
                max="500"
                step="0.1"
                required 
              />
              <div className="number-arrows">
                <div className="arrow-btn up" onClick={() => incrementValue('weight', 1, 500, 0.5)}>▲</div>
                <div className="arrow-btn down" onClick={() => decrementValue('weight', 1, 500, 0.5)}>▼</div>
              </div>
              <span className="unit-label">KG</span>
            </div>
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'ANALYZING...' : 'ANALYZE WITH AI'}
          </button>
        </form>
      </div>
      <div className="info-container">
        <div className="info-text">
          <h1>Temukan Angka Ideal untuk Tubuh Sehatmu!</h1>
          <p>
          Gunakan kalkulator kami untuk memeriksa Indeks Massa Tubuh (IMT) Anda dan cari tahu apakah berat badan Anda berada dalam kisaran yang sehat. Cukup masukkan data Anda untuk memulai.
          </p>
        </div>
        
        {bmiResult && (
          <ResultCard bmiResult={bmiResult} onClose={resetCalculation} />
        )}

        {/* {aiRecommendations && (
          <AIRecommendations aiRecommendations={aiRecommendations} />
        )} */} 
        {loadingGroq && (
          <div className="groq-loading">
            <span className="groq-spinner" />
            <span>Meminta saran AI personal...</span>
          </div>
        )}
        {groqError && <p style={{color: 'red'}}>{groqError}</p>}
        {groqRecommendation && (
          <div className="groq-recommendation">
            <h4><span className="emoji">🤖</span> Saran AI Personal (Groq)</h4>
            <p>{groqRecommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator; 