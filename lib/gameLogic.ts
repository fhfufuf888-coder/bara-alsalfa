export const TOPICS: Record<string, string[]> = {
  'أكلات': ['كبسة', 'شاورما', 'بيتزا', 'برجر', 'سوشي', 'مندي', 'جريش', 'مرقوق', 'فلافل', 'مطبق', 'شاورما دجاج', 'فطائر'],
  'أفلام': ['تايتانيك', 'الجوكر', 'باتمان', 'آيرون مان', 'سبايدرمان', 'الأسد الملك', 'إنسبشن', 'هاري بوتر', 'أفاتار', 'انترستيلار'],
  'مشاهير': ['ميسي', 'كريستيانو رونالدو', 'محمد صلاح', 'ياسر القحطاني', 'ماجد المهندس', 'عادل إمام', 'توم كروز', 'ياسر الدوسري'],
  'رياضة': ['كرة قدم', 'تنس', 'كرة سلة', 'طائرة', 'سباحة', 'ملاكمة', 'رماية', 'جولف', 'فورمولا 1', 'مصارعة'],
  'أماكن': ['الرياض', 'دبي', 'باريس', 'لندن', 'مكة', 'نيويورك', 'طوكيو', 'اسطنبول', 'القاهرة', 'جدة', 'الدمام', 'الكويت'],
};

export function getRandomTopic(category: string = 'عشوائي') {
  let selectedCat = category;
  const cats = Object.keys(TOPICS);
  if (category === 'عشوائي') {
    selectedCat = cats[Math.floor(Math.random() * cats.length)];
  }
  const catTopics = TOPICS[selectedCat];
  return catTopics[Math.floor(Math.random() * catTopics.length)];
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
