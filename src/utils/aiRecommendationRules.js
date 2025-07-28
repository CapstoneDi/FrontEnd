export function generateAIRecommendations(bmi, age, gender) {
  const recommendations = {
    diet: [],
    exercise: [],
    lifestyle: [],
    goals: []
  };

  if (bmi < 18.5) {
    recommendations.diet = [
      "Tingkatkan asupan kalori dengan makanan sehat seperti kacang-kacangan, alpukat, dan minyak zaitun",
      "Konsumsi protein tinggi: ayam, ikan, telur, dan produk susu",
      "Makan 5-6 kali sehari dengan porsi kecil tapi sering",
      "Tambah smoothie protein dan shake penambah berat badan"
    ];
    recommendations.exercise = [
      "Fokus pada strength training untuk membangun massa otot",
      "Latihan beban 3-4 kali seminggu",
      "Kombinasikan dengan cardio ringan untuk nafsu makan",
      "Istirahat cukup untuk pemulihan otot"
    ];
    recommendations.goals = [
      "Target: Menambah 0.5-1 kg per minggu",
      "Fokus pada pembentukan otot, bukan hanya lemak",
      "Monitor progress dengan timbangan dan foto"
    ];
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    recommendations.diet = [
      "Pertahankan pola makan seimbang dengan protein, karbohidrat, dan lemak sehat",
      "Konsumsi sayuran dan buah minimal 5 porsi sehari",
      "Minum air putih 8-10 gelas per hari",
      "Batasi makanan olahan dan gula berlebih"
    ];
    recommendations.exercise = [
      "Kombinasikan cardio dan strength training",
      "Olahraga 150 menit per minggu (30 menit, 5x seminggu)",
      "Coba berbagai jenis olahraga: berenang, bersepeda, yoga",
      "Latihan fleksibilitas dan keseimbangan"
    ];
    recommendations.goals = [
      "Pertahankan berat badan ideal",
      "Tingkatkan kebugaran dan stamina",
      "Fokus pada kesehatan jangka panjang"
    ];
  } else if (bmi >= 25 && bmi <= 29.9) {
    recommendations.diet = [
      "Kurangi asupan kalori dengan defisit 500 kalori per hari",
      "Tingkatkan protein untuk kenyang lebih lama",
      "Konsumsi serat tinggi dari sayuran dan buah",
      "Hindari makanan cepat saji dan minuman manis"
    ];
    recommendations.exercise = [
      "Mulai dengan cardio low-impact: jalan cepat, berenang",
      "Latihan beban untuk membakar lemak dan membangun otot",
      "Olahraga 200-300 menit per minggu",
      "Tingkatkan intensitas secara bertahap"
    ];
    recommendations.goals = [
      "Target: Menurunkan 0.5-1 kg per minggu",
      "Fokus pada penurunan lemak, bukan otot",
      "Monitor lingkar pinggang dan persentase lemak"
    ];
  } else {
    recommendations.diet = [
      "Konsultasi dengan ahli gizi untuk program diet khusus",
      "Kurangi asupan kalori secara signifikan",
      "Fokus pada makanan rendah kalori tapi tinggi nutrisi",
      "Pertimbangkan intermittent fasting dengan bimbingan dokter"
    ];
    recommendations.exercise = [
      "Mulai dengan olahraga ringan: jalan kaki 30 menit sehari",
      "Latihan air untuk mengurangi tekanan pada sendi",
      "Konsultasi dengan trainer untuk program yang aman",
      "Tingkatkan aktivitas fisik secara bertahap"
    ];
    recommendations.goals = [
      "Target: Menurunkan 1-2 kg per minggu",
      "Fokus pada perubahan gaya hidup jangka panjang",
      "Monitor kesehatan secara rutin dengan dokter"
    ];
  }

  if (age < 30) {
    recommendations.lifestyle.push("Manfaatkan metabolisme cepat dengan olahraga intensif");
    recommendations.lifestyle.push("Fokus pada pembentukan kebiasaan sehat jangka panjang");
  } else if (age >= 30 && age < 50) {
    recommendations.lifestyle.push("Perhatikan penurunan metabolisme dengan penyesuaian diet");
    recommendations.lifestyle.push("Tingkatkan latihan kekuatan untuk mencegah sarcopenia");
  } else {
    recommendations.lifestyle.push("Fokus pada olahraga low-impact dan fleksibilitas");
    recommendations.lifestyle.push("Konsultasi dokter sebelum memulai program olahraga baru");
  }

  if (gender === 'male') {
    recommendations.lifestyle.push("Fokus pada latihan kekuatan untuk meningkatkan testosteron");
    recommendations.lifestyle.push("Target protein 1.6-2.2g per kg berat badan");
  } else {
    recommendations.lifestyle.push("Latihan kekuatan penting untuk kesehatan tulang");
    recommendations.lifestyle.push("Perhatikan asupan kalsium dan vitamin D");
  }

  recommendations.lifestyle.push("Tidur 7-9 jam per malam untuk pemulihan optimal");
  recommendations.lifestyle.push("Kelola stress dengan meditasi atau yoga");
  recommendations.lifestyle.push("Monitor progress dengan jurnal makanan dan olahraga");

  return recommendations;
} 