export async function getGroqRecommendation({ bmi, age, gender, height, weight }) {
  let prompt = "";

  if (bmi < 18.5) {
    prompt = `tolong menggunakan bahasa indonesia
Saya berusia ${age} tahun, ${gender === 'male' ? 'laki-laki' : 'perempuan'}, tinggi ${height} cm, berat ${weight} kg, BMI saya ${bmi}.
Saya kekurangan berat badan. Berikan saran bulking, olahraga, dan gaya hidup untuk menaikkan berat badan secara sehat. Tambahkan emoji yang relevan pada setiap saran.
    `;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    prompt = `tolong menggunakan bahasa indonesia
Saya berusia ${age} tahun, ${gender === 'male' ? 'laki-laki' : 'perempuan'}, tinggi ${height} cm, berat ${weight} kg, BMI saya ${bmi}.
Berikan tips menjaga berat badan ideal, pola makan sehat, olahraga, dan gaya hidup seimbang. Tambahkan emoji yang relevan pada setiap saran.
    `;
  } else {
    prompt = `tolong menggunakan bahasa indonesia
Saya berusia ${age} tahun, ${gender === 'male' ? 'laki-laki' : 'perempuan'}, tinggi ${height} cm, berat ${weight} kg, BMI saya ${bmi}.
Saya kelebihan berat badan/obesitas. Berikan saran diet, olahraga, dan gaya hidup untuk menurunkan berat badan secara sehat. Tambahkan emoji yang relevan pada setiap saran.
    `;
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!response.ok) throw new Error('Gagal mendapatkan saran dari Groq');
  const data = await response.json();
  return data.choices[0].message.content;
}