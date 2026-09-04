# yargitay-rag-frontend

Yargıtay kararları üzerinde soru-cevap yapabilen RAG uygulamasının arayüzü.

Proje repo'su: (link eklenecek)
Backend repo'su: (link eklenecek)

## Teknolojiler
- React + TypeScript
- Vite

## Kurulum

1. Depoyu klonla ve içine gir:
   git clone <repo-url>
   cd yargitay-rag-frontend

2. Bağımlılıkları kur:
   npm install

3. `.env.example` dosyasını `.env` olarak kopyala, backend adresini gir:
   cp .env.example .env

4. Geliştirme sunucusunu başlat:
   npm run dev

## Arayüz

Tek sayfalık bir soru-cevap arayüzü:
- Kullanıcı bir soru yazıp "Sor" butonuna basar
- Backend'deki /sor endpoint'ine istek atılır
- Dönen cevap ve kaynak kararlar listesi ekranda gösterilir
