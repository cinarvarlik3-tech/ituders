"use client";
import { FAQSection } from "@/components/ui/faqsection";

export const FAQ = () => {
  const faqsLeft = [
    {
      question: "Dersler nasıl işleniyor?",
      answer:
        "Özel ders ve koçluk görüşmelerimiz Zoom üzerinden birebir yapılmaktadır. Kamp programlarımız ise dijital sınıf ortamında canlı olarak işlenmektedir. Özel ders ve koçluk görüşmeleri derece öğrencileri tarafından yapılırken, kamp programlarımız uzman öğretmenlerimiz tarafından yürütülmektedir. Tüm dersler kaydedilir ve sonradan tekrar izlenebilir.",
    },
    {
      question: "Kamp programları ne kadar sürüyor?",
      answer:
        "Kamp programlarımız bir okul yılı boyunca devam etmektedir. Ara tatil programımız ise 13 günlük yoğunlaştırılmış bir tekrar programıdır.",
    },
    {
      question: "Öğretmenler nasıl seçiliyor?",
      answer:
        "Tüm öğretmenlerimiz YKS'de derece yapmış İTÜ, Boğaziçi, ODTÜ gibi okul öğrencileri arasından veya 10+ yıllık deneyimi olan uzman öğretmenler arasından seçilmektedir.",
    },
    {
      question: "WhatsApp desteği gerçekten 7/24 mü?",
      answer:
        "Evet, WhatsApp desteğimiz 7/24 aktif. Öğrencilerimiz ve velilerimiz herhangi bir soru veya sorun durumunda asistanımızla 7/24 iletişime geçebilir, mesai saatleri içerisinde ise direkt olarak öğretmen ve şirket yetkililerine ulaşabilirler.",
    },
    {
      question: "Ders materyalleri ücretsiz mi?",
      answer:
        "Evet, öğretmenlerimizin derste kullandığı ve öğrencilerine önerdiği tüm materyaller ile ödevler PDF olarak öğrencilerimize gönderilir. Öğrencilerimiz dilerse bu materyalleri fiziki olarak da satın alabilirler.",
    },
  ];

  const faqsRight = [
    {
      question: "İlk ders gerçekten ücretsiz mi?",
      answer:
        "Evet, ilk deneme dersimiz hiçbir taahhüt zorunluluğu taşımaz ve tamamen ücretsizdir. Bu derste öğrencimiz öğretmenini tanır, seviye tespitini görür ve kendisine özel bir eğitim planı hazırlanır. Herhangi bir yükümlülük olmadan deneme dersi alabilirsiniz.",
    },
    {
      question: "Ödeme seçenekleri nelerdir?",
      answer:
        "Özel derslerde ders başı ödeyebilir, veya 6 aylık ödemede %5, 12 aylık ödemede %10 indirim alabilirsiniz. Derece koçluğu paketlerimizde de aynı indirim geçerlidir. Ödemeler IBAN yoluyla alınır.",
    },
    {
      question: "Derece koçluğu nedir?",
      answer:
        "Derece koçluğu, sınavlarda üst sıralarda yer almak isteyen öğrenciler için özel olarak tasarlanmış bir programdır. Hedef belirleme, strateji geliştirme, motivasyon desteği ve düzenli takip görüşmeleri içerir.",
    },
    {
      question: "Online dersler verimli mi?",
      answer:
        "Online derslerimiz özel olarak tasarlanmış sessiz sınıf ortamında yapılmaktadır. Dikkat dağıtıcı unsurlar minimuma indirilmiştir. Ayrıca tüm dersler kaydedilir ve istediğiniz zaman tekrar izleyebilirsiniz. Öğrencilerimizin başarı oranları online derslerde de çok yüksektir.",
    },
    {
      question: "Hangi sınıf seviyelerine ders veriyorsunuz?",
      answer:
        "1. sınıftan 12. sınıfa kadar tüm seviyelerde ders vermekteyiz. LGS hazırlık (8. sınıf), YKS hazırlık (11-12. sınıf) ve ara sınıf öğrencileri için özel programlarımız bulunmaktadır.",
    },
  ];

  return (
    <section className="bg-[#fafafa] pt-20 pb-0">
      <FAQSection
        title="Sıkça Sorulan Sorular"
        subtitle="SSS"
        description="Siz sormadan biz söyleyelim..."
        faqsLeft={faqsLeft}
        faqsRight={faqsRight}
      />
    </section>
  );
};

