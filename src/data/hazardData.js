export const hazardData = [
  {
    id: 1,
    scenario: "Önlüğünüze döküldüğünde hızla delikler açan ve kumaş ile cildi yakmaya başlayan bir sıvıyla çalışıyorsunuz.",
    question: "Bu ne tür bir kimyasal tehlikedir?",
    options: ["Yanıcı", "Aşındırıcı (Korozif)", "Oksitleyici", "Toksik"],
    correct: "Aşındırıcı (Korozif)",
    explanation: "Aşındırıcı maddeler, temas halinde canlı dokulara ve kumaş gibi malzemelere anında zarar verir."
  },
  {
    id: 2,
    scenario: "Bir ısı kaynağının yakınında belirli bir çözücü kullanırken, parlama noktasının çok düşük olduğunu ve neredeyse anında alev aldığını fark ediyorsunuz.",
    question: "Bu çözücü hangi tehlike kategorisine girer?",
    options: ["Patlayıcı", "Toksik", "Yanıcı", "Radyoaktif"],
    correct: "Yanıcı",
    explanation: "Yanıcı kimyasallar düşük parlama noktalarına sahiptir ve ısıya veya kıvılcıma maruz kaldığında kolayca tutuşur."
  },
  {
    id: 3,
    scenario: "Bir kimyasal kabının üzerinde, az miktarda kazara solunması veya yutulması durumunda ciddi iç hasara yol açabileceği uyarısı bulunmaktadır.",
    question: "Bu kimyasal nasıl sınıflandırılmalıdır?",
    options: ["Tahriş Edici", "Toksik (Zehirli)", "Aşındırıcı", "Çevresel"],
    correct: "Toksik (Zehirli)",
    explanation: "Toksik maddeler zehirlidir ve vücuda girdiklerinde ciddi sağlık sorunlarına veya ölüme neden olabilirler."
  },
  {
    id: 4,
    scenario: "Bir deney sırasında elinize yanlışlıkla az miktarda derişik asit döküldü.",
    question: "Almanız gereken en acil güvenlik önlemi nedir?",
    options: ["Kağıt havluyla silmek", "Öğretmenin gelmesini beklemek", "Bol akan suyla durulamak", "Baz ile nötralize etmek"],
    correct: "Bol akan suyla durulamak",
    explanation: "Su ile anında ve uzun süreli durulama, ciltteki kimyasal yanıkları en aza indirmek için kritik ilk adımdır."
  },
  {
    id: 5,
    scenario: "Kullandığınız bir madde kendi başına yanmaz, ancak yakındaki malzemelerin ateşini önemli ölçüde şiddetlendirir.",
    question: "bu madde hangi özelliğe sahiptir?",
    options: ["Oksitleyici (Yükseltgen)", "Yanıcı", "Patlayıcı", "Aşındırıcı"],
    correct: "Oksitleyici (Yükseltgen)",
    explanation: "Oksitleyiciler, kendileri yanıcı olmasa bile, diğer malzemelerin daha şiddetli yanmasını sağlayan oksijen sağlar."
  },
  {
    id: 6,
    scenario: "Bir ekip arkadaşınızın, güvenlik bilgi formunu kontrol etmeden bir kimyasal atığı doğrudan lavaboya dökmek üzere olduğunu fark ediyorsunuz.",
    question: "Bu neden bir 'Çevresel Tehlike' olabilir?",
    options: ["Boruları tıkayabilir", "Sucul yaşama ve ekosistemlere zarar verebilir", "Laboratuvarda kötü kokuya neden olur", "Metal lavabo ile reaksiyona girer"],
    correct: "Sucul yaşama ve ekosistemlere zarar verebilir",
    explanation: "Çevresel tehlikeler, doğaya, özellikle de su bazlı ekosistemlere uzun süreli zarar veren maddelerdir."
  },
  {
    id: 7,
    scenario: "Laboratuvarda çalışırken aniden bir kimyasalın gözünüze sıçradığını hissediyorsunuz.",
    question: "Bu durumda yapmanız gereken ilk şey nedir?",
    options: ["Gözlerinizi ovalamak", "Göz duşuna gidip en az 15 dakika yıkamak", "Gözlüklerinizi temizlemek", "Göz damlası aramak"],
    correct: "Göz duşuna gidip en az 15 dakika yıkamak",
    explanation: "Gözle temas durumunda vakit kaybetmeden göz duşu istasyonunda uzun süreli yıkama hayati önem taşır."
  },
  {
    id: 8,
    scenario: "Deney sırasında bir cam beher yere düşüyor ve parçalara ayrılıyor.",
    question: "Kırık cam parçalarını nasıl temizlemelisiniz?",
    options: ["Elinizle toplayıp çöpe atın", "Fırça ve faraş kullanarak toplayıp özel cam atık kutusuna atın", "Olduğu yerde bırakın", "Kağıt havluyla süpürün"],
    correct: "Fırça ve faraş kullanarak toplayıp özel cam atık kutusuna atın",
    explanation: "Kırık camlar asla el ile toplanmamalı ve normal çöp yerine özel cam atık kutularına atılmalıdır."
  },
  {
    id: 9,
    scenario: "Laboratuvar ortamında çalışırken bir arkadaşınızın saçlarının veya kıyafetinin alev aldığını görüyorsunuz.",
    question: "Hangi güvenlik ekipmanını kullanmak en uygun olur?",
    options: ["Gözlük", "Yangın Battaniyesi", "Lavabo Suyu", "Kağıt Havlu"],
    correct: "Yangın Battaniyesi",
    explanation: "Yangın battaniyesi, alev alan kişiyi sararak oksijenle temasını kesmek ve yangını söndürmek için en güvenli yoldur."
  },
  {
    id: 10,
    scenario: "Bir şişedeki kimyasalın kokusunu merak ediyorsunuz.",
    question: "Güvenli bir şekilde koklamak için hangi yöntemi kullanmalısınız?",
    options: ["Doğrudan şişeyi burnunuza yaklaştırıp derin nefes alın", "Elinizle havayı burnunuza doğru hafifçe yelpazeleyin", "Şişeyi çalkalayıp koklayın", "Asla koklamayın"],
    correct: "Elinizle havayı burnunuza doğru hafifçe yelpazeleyin",
    explanation: "Laboratuvarda kimyasalları koklamak için 'yelpaze' (wafting) yöntemi kullanılır; doğrudan koklamak akciğerlere zarar verebilir."
  },
  {
    id: 11,
    scenario: "Derişik bir asidi suyla seyreltmeniz gerekiyor.",
    question: "Hangi kurala uymalısınız?",
    options: ["Asidin üzerine hızla su ekleyin", "Suyun üzerine yavaşça asit ekleyin", "İkisini aynı anda dökün", "Önce kabı ısıtın"],
    correct: "Suyun üzerine yavaşça asit ekleyin",
    explanation: "Asidin üzerine su eklemek ani ısınmaya ve sıçramaya neden olur. Her zaman asit suya eklenmelidir."
  },
  {
    id: 12,
    scenario: "Laboratuvardan çıkmadan önce yapmanız gereken en son işlem nedir?",
    options: ["Ceketini giymek", "Ellerini sabunla iyice yıkamak", "Işıkları kapatmak", "Kitapları toplamak"],
    correct: "Ellerini sabunla iyice yıkamak",
    explanation: "Görünmeyen kimyasal kalıntılarını temizlemek için laboratuvar çıkışında eller mutlaka yıkanmalıdır."
  },
  {
    id: 13,
    scenario: "Bir deneyi bitirdiniz ve elinizde bir miktar fazla kimyasal kaldı.",
    question: "Kalan kimyasalı ne yapmalısınız?",
    options: ["Orijinal şişesine geri boşaltın", "Çöpe atın", "Uygun bir atık kabına boşaltın", "Bir sonraki öğrenciye bırakın"],
    correct: "Uygun bir atık kabına boşaltın",
    explanation: "Fazla kimyasallar asla orijinal şişeye geri konulmaz (kirlenme riski) ve lavaboya dökülmez."
  },
  {
    id: 14,
    scenario: "Laboratuvarda çalışırken yemek yemenin tehlikeli olmasının temel nedeni nedir?",
    options: ["Laboratuvarın kirlenmesi", "Yemeğin tadının bozulması", "Zehirli kimyasalların kazara yutulma riski", "Dikkat dağınıklığı"],
    correct: "Zehirli kimyasalların kazara yutulma riski",
    explanation: "Kimyasal tozlar ve buharlar yiyeceklere bulaşarak ciddi zehirlenmelere yol açabilir."
  },
  {
    id: 15,
    scenario: "Keskin bir aletle (neşter gibi) çalışırken aleti nasıl tutmalı ve kesmelisiniz?",
    options: ["Kendinize doğru kesin", "Vücudunuzdan dışarıya doğru kesin", "Elinizde tutarak kesin", "Masaya bastırarak kesin"],
    correct: "Vücudunuzdan dışarıya doğru kesin",
    explanation: "Kesici aletler her zaman vücuttan dışarıya doğru yönlendirilerek kullanılmalıdır."
  }
];
