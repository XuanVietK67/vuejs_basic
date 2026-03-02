# 🚀 Simple application with Vue 3 (Register Form)

Demo project xây dựng **Register Form** với kiến trúc **feature-based**, áp dụng **type-safe validation** và **reusable UI components** theo style production-ready.

👉 Mục tiêu: clean code • scalable • dễ maintain

---

## 🧰 Tech Stack

⚡ Vue 3 (Composition API + `<script setup>`)  
⚡ Vite  
⚡ TypeScript  
⚡ TailwindCSS  
⚡ vee-validate  
⚡ Zod + @vee-validate/zod  
⚡ Vue Router  

---

## ✨ Features

### 📝 Register Form
✅ Full name / Email / Password  
✅ Confirm password  
✅ Accept Terms checkbox  
✅ Disable submit khi invalid  
✅ Type-safe form data  

---

### 🔐 Validation (Zod)

**Bắt buộc tick Terms**
```ts
acceptTerms: z.literal(true, {
  message: 'You must accept the Terms',
})
```

**Confirm password**
```ts
.refine(d => d.password === d.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
})
```

---

### 🧠 Form Control Pattern

Sử dụng:

- `useForm()`
- `defineField()`

👉 Lợi ích:

- tách logic khỏi UI
- type-safe
- dễ test
- dễ tái sử dụng

---

### 🎨 Reusable UI Components

Custom Tailwind components:

- `<Input />`
- `<Button />`
- `<Checkbox />`

👉 Giúp:

- đồng bộ style
- tái sử dụng
- code sạch hơn

---

## 📁 Project Structure (Feature-based)

```bash
src
├─ components/
│  └─ ui/            # reusable UI
│
├─ features/
│  └─ auth/
│     ├─ pages/
│     ├─ components/
│     ├─ schemas/
│     ├─ services/
│     ├─ stores/
│     └─ routes.ts
│
├─ layouts/
├─ router/
├─ App.vue
└─ main.ts
```

---

## 🌳 Render Flow

```text
main
 └─ App
     └─ RouterView
         └─ Layout
             └─ Page
                 └─ Feature
                     └─ UI
```

---

## 🚀 Run Project

```bash
git clone https://github.com/XuanVietK67/vuejs_basic.git
cd vuejs_basic
npm install
npm run dev
```

---

## 🎯 What I Learned

✅ Zod schema + type inference  
✅ vee-validate nâng cao  
✅ reusable Tailwind components  
✅ feature-based architecture  
✅ scalable folder structure  

---

## 📸 Demo

![demo](public/image.png)