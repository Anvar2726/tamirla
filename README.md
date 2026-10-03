<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->


# Tamirla — Avtoservis boshqaruv tizimi

Kichik avtoservislar uchun real ish jarayonini (qabul → diagnostika → tasdiq → ta'mir → topshirish) boshqaradigan frontend ilova.

🔗 **Jonli demo:** [havola shu yerga qo'yiladi]

## Muammo

Kichik avtoservislar odatda daftar yoki Telegram bilan ishlaydi. Natijada: mijoz mashinasining holatini bilmaydi, narx kelishuvlari esda qolmaydi, qaysi buyurtma kechikayotgani ko'rinmaydi.

## Yechim

Har bir mashinaning hozir qayerda, kim bilan, qaysi bosqichda ekanini bitta ekranda ko'rsatadigan tizim.

## Asosiy imkoniyatlar

- Order yaratish: mavjud yoki yangi mijoz, mavjud yoki yangi mashina
- Status boshqaruvi: ruxsat etilgan o'tishlar jadvali (state machine) orqali — noto'g'ri o'tishlar imkonsiz
- Ustaga biriktirish, diagnostika yozish, ish/qism qo'shish va narx hisoblash
- Dashboard: statuslar bo'yicha sonlar, kechikkan orderlar
- Dark/light theme
- Status o'zgartirish va narx hisoblash mantig'i avtomatik testlar bilan qoplangan

## Texnologiyalar

React 19 · Vite · Zustand · React Router · SCSS · Vitest

## Arxitektura

Feature-Sliced Design'dan ilhomlangan, soddalashtirilgan qatlamlar: `app → pages → features → entities → shared`. Batafsil: [docs/architecture.md] *(ixtiyoriy, pastda)*.

## Loyihani ishga tushirish

\`\`\`bash
yarn install
yarn dev
\`\`\`

Testlarni ishga tushirish:

\`\`\`bash
yarn test
\`\`\`

## Muhim eslatma

Bu — **frontend-only demo**. Ma'lumotlar haqiqiy backendga emas, brauzer xotirasidagi mock ma'lumotlarga saqlanadi — sahifa yangilanganda (F5) boshlang'ich holatga qaytadi. Bu ataylab shunday: loyihaning maqsadi — real backend ulanganda deyarli o'zgarishsiz ishlaydigan arxitekturani ko'rsatish (API qatlami, store'lar va UI alohida ajratilgan).

## Keyingi qadamlar

To'liq ro'yxat: [docs/backlog.md](./docs/backlog.md)