# 🚀 OE Product Development Workflow – Quick Guide

Tóm tắt **quy trình phát triển sản phẩm** theo chuẩn **Agile / Scrum / Kanban**  
👉 Mục tiêu: đơn giản • dễ hiểu • dễ áp dụng thực tế

---

# 🔁 Software Development Process (5 Stages)

```text
Requirement → Design → Development → Testing/Review → Deploy
```

| Stage | 🎯 Mục đích |
|--------|-----------|
| 📋 Requirement | Thu thập yêu cầu từ customer/marketing |
| 🎨 Design | Thiết kế UI/UX + kiến trúc hệ thống |
| 💻 Development | Code tính năng |
| 🧪 Testing/Review | Test + review chất lượng |
| 🚀 Deploy | Release sản phẩm |

---

# 🏗️ Waterfall vs ⚡ Agile

| | 🚿 Waterfall | ⚡ Agile |
|---|-------------|-----------|
| Cách làm | Tuần tự từng bước | Chia nhiều vòng nhỏ (sprint) |
| Thay đổi | Khó | Dễ |
| Feedback | Muộn | Sớm & liên tục |
| Release | 1 lần cuối | Mỗi sprint |
| Phù hợp | Yêu cầu cố định | Web/App/Startup |
| Rủi ro | Sửa = làm lại từ đầu | Thấp |

👉 **Rule nhớ nhanh:**  
Waterfall = 1 lần lớn  
Agile = nhiều lần nhỏ

---

# 🧩 Scrum (Agile Framework)

## 📦 Sprint

| Thuộc tính | Giá trị |
|------------|-----------|
| ⏳ Thời gian | ~ 2 tuần |
| 🎯 Có | goal + tasks |
| 🚀 Output | release mỗi sprint |

## 🔄 Events

- 📅 Sprint planning
- ☀️ Daily scrum
- 🔍 Sprint review
- 📊 Weekly scrum

👉 Mục tiêu: **ship nhỏ nhưng liên tục**

---

# 📋 Kanban Board (Task Tracking)

## 🔁 Workflow

```text
To-do → In-progress → Code Review → QA Review → Passed → Done
```

## 📌 Status Meaning

| Status | Ý nghĩa |
|-----------|----------------|
📝 To-do | chưa làm |
🚧 In-progress | đang làm |
👨‍💻 Code Review | dev review |
🧪 QA Review | tester review |
✅ Passed | đạt yêu cầu |
🎉 Done | hoàn thành/deploy |
🔁 Re-open | làm lại |
⏸️ On-hold | chờ/block |

👉 Task luôn di chuyển **trái → phải**

---

# 🎯 TL;DR

- 🔁 5 bước: Req → Design → Dev → Test → Deploy  
- ⚡ Agile > Waterfall cho project thay đổi nhiều  
- 🧩 Scrum = quản lý sprint  
- 📋 Kanban = quản lý task  

---

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


