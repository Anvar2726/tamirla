# Backlog — keyingi bosqich

Bu loyiha MVP sifatida ataylab cheklangan doirada qurildi. Quyidagilar **bilib turib** qoldirilgan, keyingi bosqichlar uchun:

## Backend va ma'lumot
- Haqiqiy backend va ma'lumotlar bazasi (hozir frontend mock ma'lumot bilan ishlaydi)
- Haqiqiy autentifikatsiya (login, parol) — hozir faqat UI ko'rsatish uchun rol tanlagich bor

## Feature'lar
- Order qatorini o'chirish yoki tahrirlash
- To'lov holati (to'landi/to'lanmadi)
- Status tarixi (kim, qachon, nima uchun o'zgartirgan)
- Filtr, qidiruv, saralash (orderlar va mijozlar ro'yxatida)
- Sahifalash (pagination) — katta ma'lumotlar hajmi uchun
- Ehtiyot qismlar ombori (inventory)
- SMS/bildirishnoma xizmati
- Mijoz portali (mijoz o'z buyurtmasini kuzatishi uchun)
- Hisobotlar va grafiklar

## Texnik yaxshilanishlar
- Komponent va E2E testlar (hozir faqat biznes mantiq test qilingan)
- To'liq focus trap ConfirmDialog'da
- Avtomatik accessibility auditi (axe-core)
- Xato monitoring xizmati (Sentry)