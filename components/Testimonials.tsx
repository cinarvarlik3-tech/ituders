"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "iTÜDers sayesinde YKS'de istediğim dereceyi yaptım. Öğretmenlerim çok ilgili ve dersler çok verimli geçiyor. Kesinlikle tavsiye ederim!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    name: "Ayşe Yılmaz",
    role: "Öğrencimiz",
  },
  {
    text: "Kamp programı sayesinde çocuğum eksiklerini hızlıca tamamladı. Online sınıf ortamı çok sessiz ve dikkat dağıtıcı değil. Çok memnunuz!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    name: "Mehmet Demir",
    role: "Veli",
  },
  {
    text: "Derece koçluğu programı ile hedeflerime ulaştım. Mentor desteği ve haftalık takipler sayesinde motivasyonum hiç düşmedi.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    name: "Zeynep Kaya",
    role: "Öğrencimiz",
  },
  {
    text: "240 ders saati ile çocuğum tüm konuları detaylıca işledi. Ödevlendirme ve takip sistemi sayesinde hiçbir konu eksik kalmadı.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    name: "Can Öztürk",
    role: "Veli",
  },
  {
    text: "Haftalık deneme sınavları ve detaylı analizler sayesinde çocuğumun eksiklerini görebildik. Ücretsiz soru çözümü de çok faydalı oldu.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    name: "Elif Şahin",
    role: "Veli",
  },
  {
    text: "Sınav taktikleri paylaşımları ve özel dersler sayesinde çocuğumun sınav kaygısını yendi. Çok teşekkür ederiz!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    name: "Burak Yıldız",
    role: "Veli",
  },
  {
    text: "Online dersler ev konforunda olmasına rağmen çok verimli. Öğretmenlerimiz derece yapmış öğrencilerden olduğu için çok deneyimliler.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces",
    name: "Deniz Arslan",
    role: "Öğrencimiz",
  },
  {
    text: "İlk ders ücretsiz olması sayesinde öğretmenimi tanıma fırsatı buldum. Şimdi düzenli olarak ders alıyorum ve çok memnunum.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=faces",
    name: "Selin Aydın",
    role: "Öğrencimiz",
  },
  {
    text: "WhatsApp desteği 7/24 olması çok büyük avantaj. Sorularımı anında çözebiliyorum. Kamp programı da çok yoğun ve verimli.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces",
    name: "Arda Çelik",
    role: "Öğrencimiz",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="bg-[#fafafa] my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter">
            Öğrencilerimiz Ne Diyor?
          </h2>
          <p className="text-center mt-5 opacity-75">
            Öğrencilerimizin deneyimlerini ve başarı hikayelerini keşfedin.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
        
        <p className="text-center text-gray-500 text-xs mt-8">
          Öğrenci ve velilerimizin gizliliğini korumak amacıyla temsili fotoğraflar kullanılmıştır.
        </p>
      </div>
    </section>
  );
};

