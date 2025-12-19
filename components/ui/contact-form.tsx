"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [userType, setUserType] = useState<'veli' | 'ogrenci'>('veli');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    parentName: '',
    phone: '',
    grade: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // Replace this with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_SCRIPT_URL_HERE';
  
  // Check if URL is configured
  const isUrlConfigured = GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL_HERE';

  const subjectsLeft = [
    'Koçluk',
    'Fizik',
    'Biyoloji',
    'Edebiyat',
    'Fen',
    'İngilizce'
  ];

  const subjectsRight = [
    'Matematik',
    'Kimya',
    'Türkçe',
    'Tarih',
    'Sosyal',
    'Din Kültürü'
  ];

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSubjects.length === 0) {
      alert('Lütfen en az bir ders seçiniz.');
      return;
    }

    // Check if Google Script URL is configured
    if (!isUrlConfigured) {
      alert('Google Apps Script URL henüz yapılandırılmamış. Lütfen .env.local dosyasına Web App URL\'nizi ekleyin.');
      console.error('Google Script URL not configured:', GOOGLE_SCRIPT_URL);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        parentName: formData.parentName,
        userType: userType,
        phone: formData.phone,
        grade: formData.grade,
        subjects: selectedSubjects.join(', '),
        message: formData.message,
        timestamp: new Date().toISOString()
      };

      console.log('Submitting form data:', submissionData);
      console.log('Sending to URL:', GOOGLE_SCRIPT_URL);

      // Send data to Google Apps Script
      const formDataToSend = new FormData();
      Object.entries(submissionData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value));
      });

      // Try with CORS first
      let response;
      try {
        response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: formDataToSend
        });
        
        if (response.ok) {
          let result;
          try {
            result = await response.json();
          } catch (jsonError) {
            const textResponse = await response.text();
            console.error('Failed to parse JSON response:', textResponse);
            throw new Error('Sunucudan geçersiz yanıt alındı. Lütfen Apps Script yapılandırmanızı kontrol edin.');
          }
          
          if (result.success) {
            setSubmitStatus('success');
            alert('Form başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');
          } else {
            const errorMsg = result.error || 'Form gönderimi başarısız oldu';
            console.error('Server returned error:', errorMsg);
            throw new Error(errorMsg);
          }
        } else {
          // Try to get error message from response
          let errorText;
          try {
            const errorJson = await response.json();
            errorText = errorJson.error || errorJson.message || `HTTP ${response.status}`;
          } catch {
            errorText = await response.text();
            if (!errorText) {
              errorText = `HTTP ${response.status} ${response.statusText}`;
            }
          }
          console.error('Server error response:', errorText);
          throw new Error(errorText);
        }
      } catch (fetchError: any) {
        // Log the full error for debugging
        console.error('Form submission error:', fetchError);
        console.error('Error details:', {
          message: fetchError.message,
          stack: fetchError.stack,
          name: fetchError.name
        });
        
        // If it's a network/CORS error, try no-cors mode but warn the user
        if (fetchError.message?.includes('CORS') || fetchError.message?.includes('Failed to fetch') || fetchError.name === 'TypeError') {
          console.warn('CORS error detected, trying no-cors mode...');
          try {
            await fetch(GOOGLE_SCRIPT_URL, {
              method: 'POST',
              mode: 'no-cors',
              body: formDataToSend
            });
            // With no-cors, we can't verify success
            // Show a warning that we can't confirm it worked
            setSubmitStatus('success');
            alert('Form gönderildi, ancak onay alınamadı. Lütfen Google Sheet\'inizi kontrol edin. Eğer veri görünmüyorsa, Apps Script\'teki Sheet ID\'yi kontrol edin.');
          } catch (noCorsError) {
            throw new Error('Form gönderilemedi. Lütfen internet bağlantınızı ve Apps Script yapılandırmanızı kontrol edin.');
          }
        } else {
          // Re-throw other errors
          throw fetchError;
        }
      }
      
      // Reset form only on success
      setFormData({
        firstName: '',
        lastName: '',
        parentName: '',
        phone: '',
        grade: '',
        message: ''
      });
      setSelectedSubjects([]);
      setUserType('veli');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Show the actual error message to the user
      const errorMessage = error?.message || error?.toString() || 'Bilinmeyen bir hata oluştu';
      alert(`Form gönderilirken bir hata oluştu:\n\n${errorMessage}\n\nLütfen konsolu kontrol edin veya tekrar deneyin.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="py-14 bg-[#fafafa] min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-[#3D3072] font-semibold">
            İletişim
          </h3>
          <p className="text-gray-800 text-3xl font-bold sm:text-4xl">
            Ücretsiz Deneme Dersi Al
          </p>
          <p>
            Size en uygun planı belirlemek için lütfen formu doldurun. Sizinle iletişime geçeceğiz.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium text-gray-800">
                  Ad
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-[#3D3072] shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-gray-800">
                  Soyad
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-[#3D3072] shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium text-gray-800">
                Veli Adı ve Soyadı
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-[#3D3072] shadow-sm rounded-lg"
              />
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setUserType('veli')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    userType === 'veli'
                      ? 'bg-[#3D3072] text-white'
                      : 'bg-white text-black border border-gray-300'
                  }`}
                >
                  Veli
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('ogrenci')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    userType === 'ogrenci'
                      ? 'bg-[#3D3072] text-white'
                      : 'bg-white text-black border border-gray-300'
                  }`}
                >
                  Öğrenci
                </button>
              </div>
            </div>
            <div>
              <label className="font-medium text-gray-800">
                Telefon Numarası
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                  <select className="text-sm bg-transparent outline-none rounded-lg h-full text-gray-500">
                    <option>TR</option>
                    <option>US</option>
                    <option>UK</option>
                  </select>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0 555 123 45 67"
                  required
                  className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-white outline-none border focus:border-[#3D3072] shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium text-gray-800">
                Öğrencimiz hangi sınıfa gidiyor?
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-white outline-none border focus:border-[#3D3072] shadow-sm rounded-lg"
              >
                <option value="">Seçiniz</option>
                <option value="1">1. Sınıf</option>
                <option value="2">2. Sınıf</option>
                <option value="3">3. Sınıf</option>
                <option value="4">4. Sınıf</option>
                <option value="5">5. Sınıf</option>
                <option value="6">6. Sınıf</option>
                <option value="7">7. Sınıf</option>
                <option value="8">8. Sınıf</option>
                <option value="9">9. Sınıf</option>
                <option value="10">10. Sınıf</option>
                <option value="11">11. Sınıf</option>
                <option value="12">12. Sınıf</option>
                <option value="mezun">Mezun</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-gray-800 mb-3 block">
                Hangi dersten özel ders almak istiyorsunuz? <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
                <div className="space-y-2">
                  {subjectsLeft.map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                        className="w-4 h-4 text-[#3D3072] border-gray-300 rounded focus:ring-[#3D3072] focus:ring-2"
                      />
                      <span className="text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
                <div className="space-y-2">
                  {subjectsRight.map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                        className="w-4 h-4 text-[#3D3072] border-gray-300 rounded focus:ring-[#3D3072] focus:ring-2"
                      />
                      <span className="text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="font-medium text-gray-800">
                Mesaj
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Size nasıl yardımcı olabiliriz?"
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-white outline-none border focus:border-[#3D3072] shadow-sm rounded-lg"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 text-white font-medium bg-[#3D3072] hover:bg-[#3D3072]/90 active:bg-[#3D3072] rounded-lg duration-150 transition-all ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

