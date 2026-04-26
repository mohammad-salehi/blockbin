# Blockchain Graph Analysis Service

این پروژه یک سرویس حرفه‌ای برای **رسم، تحلیل و مدیریت شبکه‌های بلاکچینی** است.  
کاربران می‌توانند ارتباط بین آدرس‌ها، تراکنش‌ها و مسیرهای جریان دارایی را در شبکه‌های مختلف مشاهده کرده و تحلیل دقیق‌تری از رفتارها، مالکیت‌ آدرس‌ها و ریسک‌ها داشته باشند.

**این پروژه توسط محمد صالحی ساخته شده است.**

---

## ✨ قابلیت‌ها

### 1. تحلیل اطلاعات شبکه‌های بلاکچینی
- نمایش گراف تعاملی بین آدرس‌ها، تراکنش‌ها و توکن‌ها  
- پشتیبانی از شبکه‌های مختلف  
- نمایش نوع آدرس‌ها (Deposit، Hot Wallet و …)  
- نمایش مالک آدرس‌ها  
- نمایش ریسک‌اسکور آدرس  

### 2. رسم گراف تراکنش‌ها
- رنگ‌گذاری مسیرها و تفکیک مسیرهای مختلف  
- مشاهده مالک آدرس‌های افزوده‌شده به گراف  
- نمایش قیمت دلاری تراکنش‌ها  
- نمایش حجم و زمان هر تراکنش  
- استخراج گزارش اکسل از مسیرهای انتخاب‌شده  

### 3. تحلیل موجودیت‌های بلاکچینی
- مشاهده نام و اطلاعات موجودیت‌های مختلف 
- مشاهده آدرس های هر موجودیت به تفکیک شبکه
- مشاهده ریسک‌اسکور موجودیت‌ها

### 4. پرونده‌ها
- امکان ساخت و ویرایش پرونده‌های بلاکچینی
- دسته‌بندی مجموعه‌ای از آدرس، تراکنش و گراف ها در یک پرونده مشخص

---

## 🧩 کامپوننت SavedGraph

کامپوننت `SavedGraph` مسئول نمایش و مدیریت لیست گراف‌های ذخیره‌شده است.  
ویژگی‌ها:

- نمایش نام گراف (فقط در حالت hover آبی می‌شود)  
- نمایش توضیحات  
- نمایش تعداد آیتم‌ها  
- نمایش شبکه با آیکن  
- دکمه حذف مینیمال و حرفه‌ای  

### نمونه ستون‌های استفاده‌شده در جدول:
```jsx
const columns = [
  {
header: 'نام گراف',
cell: (row) => (
<a
href={`/panel/tracker/${row.networkName}/${row.hash}/${row.token}/${row.contract}/${row.id}`}
className="font-medium text-textColor hover:text-primary transition-colors"
>
{row.name}
</a>
),
  },
  {
header: 'توضیحات',
cell: (row) => (
<span className="text-sm text-textColor/80">
{row.description || '—'}
</span>
),
  },
  {
header: 'آیتم‌ها',
cell: (row) => (
<span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
{row.items || 0}
</span>
),
  },
  {
header: 'شبکه',
cell: (row) => (
<div className="flex items-center gap-2 bg-bgPrimary px-2 py-1 rounded-md w-fit">
<img
src={`/images/${row.networkName}.png`}
className="h-4 w-4"
alt={row.networkName}
/>
<span className="text-sm">{row.networkName}</span>
</div>
),
  },
  {
header: 'عملیات',
cell: (row) => (
<button
type="button"
onClick={() => openDeleteModal(row.id)}
className="flex items-center justify-center w-9 h-9 rounded-lg text-textColor/60 hover:text-red-500 hover:bg-red-50 transition-colors"
>
<svg
xmlns="http://www.w3.org/2000/svg"
className="h-4 w-4"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="1.8"
strokeLinecap="round"
strokeLinejoin="round"
>
<polyline points="3 6 5 6 21 6" />
<path d="M19 6l-1 14H6L5 6" />
<path d="M10 11v6" />
<path d="M14 11v6" />
<path d="M9 6V4h6v2" />
</svg>
</button>
),
  },
];
