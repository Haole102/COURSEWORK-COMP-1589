# Ôn tập kiến thức để demo 1-1 với thầy

> Phạm vi: `css/style.css`, `js/navigation.js`, `js/projects.js`, `js/project-search.js`, `js/contact.js` + 5 trang HTML (`index`, `about`, `skills`, `projects`, `contact`).
> Thứ tự: **Head chung → Kiến thức dùng chung (G1–G12) → Header → Main (từng trang) → Footer → Mobile → JS → Hỏi–đáp → Câu hỏi còn mở**.
> Quy ước: `[G5]` = "xem mục G5 ở phần Kiến thức dùng chung". Dòng `📍 Dùng ở:` cho biết kiến thức đó xuất hiện ở đâu.
> Số dòng (`style.css:271`) là số dòng tại thời điểm viết tài liệu; sau khi dọn CSS các số dòng lệch vài dòng, hãy tìm theo tên class.

---

## 0. Cấu trúc file & thứ tự tải

```
cw/
├─ index.html  about.html  skills.html  projects.html  contact.html
├─ css/style.css            ← 1 file CSS cho cả 5 trang
├─ js/navigation.js         ← mọi trang (menu mobile)
├─ js/projects.js           ← chỉ projects.html (lọc dự án theo loại)
├─ js/project-search.js     ← chỉ projects.html (tìm kiếm dự án)
├─ js/contact.js            ← chỉ contact.html (kiểm tra form)
├─ assets/icons/*.svg       ← arrow-right, image, timeline-marker, timeline-goal
└─ images/portrait.jpg
```

Mỗi trang đều có cùng khung: `<head>` → `<header class="site-header">` → `<main>` → `<footer class="site-footer">`.

### Phần `<head>` (giống nhau ở cả 5 trang, chỉ khác `title` + `description`)

| Thẻ                                                                             | Làm gì                                                                                                                                                                     | Ghi chú dễ bị hỏi                                                                             |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `<!doctype html>`                                                               | Bật chế độ standards (tránh quirks mode)                                                                                                                                   |                                                                                               |
| `<html lang="en">`                                                              | Khai báo ngôn ngữ cho trình đọc màn hình, dịch tự động                                                                                                                     |                                                                                               |
| `<meta charset="utf-8">`                                                        | Mã hoá ký tự (hiển thị đúng `©`, `’`, `–`)                                                                                                                                 | Nên nằm sớm trong `<head>`                                                                    |
| `<meta name="viewport" content="width=device-width, initial-scale=1">`          | Bắt buộc để responsive trên điện thoại                                                                                                                                     | Thiếu → mobile vẽ như trang desktop thu nhỏ, `@media` không đúng                              |
| `<meta name="theme-color">`                                                     | Màu thanh trình duyệt mobile = `#0f172a` (cùng `--bg`)                                                                                                                     |                                                                                               |
| `<meta name="description">`                                                     | Mô tả cho SEO/kết quả tìm kiếm                                                                                                                                             |                                                                                               |
| `<title>`                                                                       | Tên tab, mẫu `Trang \| HaoLe`                                                                                                                                              |                                                                                               |
| `<link rel="preconnect" href="https://fonts.googleapis.com">`                   | Mở kết nối sớm tới server font                                                                                                                                             |                                                                                               |
| `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`          | Server chứa file font thật. **`crossorigin` bắt buộc** vì font được tải theo chế độ CORS; thiếu thì kết nối preconnect không được dùng lại                                 |                                                                                               |
| `<link rel="stylesheet" href="...Inter:wght@400;500;600;700&amp;display=swap">` | Tải font Inter 4 độ đậm. `&amp;` là cách viết `&` trong thuộc tính HTML. `display=swap` = hiện chữ font dự phòng trước, đổi sang Inter khi tải xong (không bị chữ vô hình) | Chỉ tải 400/500/600/700 → xem `font-synthesis` ở [G9]                                         |
| `<script src="js/navigation.js" defer>`                                         | `defer` = tải song song, **chạy sau khi HTML parse xong**, theo đúng thứ tự                                                                                                | Vì vậy `querySelector` trong JS tìm thấy phần tử mà không cần `DOMContentLoaded` — xem Phần F |

`projects.html` có thêm `<script src="js/projects.js" defer>` và `<script src="js/project-search.js" defer>`; `contact.html` có thêm `<script src="js/contact.js" defer>`.

---

# PHẦN A — KIẾN THỨC DÙNG CHUNG

## G1. CSS Custom Properties (biến CSS) — `style.css:1-33`

```css
:root { --bg: #0f172a; --space-16: 16px; ... }
.card { padding: var(--space-24); }
```

- `:root` = phần tử `<html>` nhưng có độ ưu tiên (specificity) cao hơn `html`. Biến khai báo ở đây dùng được toàn trang (kế thừa xuống mọi phần tử).
- `var(--ten)` đọc giá trị. Đổi 1 chỗ → đổi cả site (ví dụ đổi `--accent`).
- Nhóm biến trong file: **màu** (`--bg --card --text --muted --accent --accent-2 --on-accent --border-subtle --border-strong --focus-ring`), **khoảng cách** (`--space-*`), **bo góc** (`--radius-*`), **font** (`--font-body`, `--font-size-base`), **viền giả** (`--inside-border`), **lề hai bên** (`--gutter`).
- Biến có thể **chứa cả một giá trị phức** — `--inside-border: inset 0 0 0 1px var(--border-subtle)` chứa nguyên một `box-shadow` (xem [G5]).
- Biến có thể **bị ghi đè trong `@media`**: `--gutter: 24px` ở mobile (`style.css:487-489`) → mọi nơi dùng `var(--gutter)` tự đổi.
- `color-scheme: dark` (`:root`, dòng 2): báo trình duyệt đây là giao diện tối → thanh cuộn, ô input mặc định… cũng tối.

📍 Dùng ở: toàn bộ CSS. `--gutter` → `.container` [G8]; `--inside-border` → `.button/.avatar/.card/.project-media`; `--space-*` → gần như mọi `gap/padding`.

## G2. Reset & `box-sizing` — `style.css:35-95`

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

- `*` chọn mọi phần tử. `box-sizing: border-box` ⇒ `width/height` **bao gồm** padding + border. Ví dụ `.container { max-width: 1440px; padding-inline: 120px }` thì tổng vẫn 1440, nội dung còn 1200.
- Reset `margin/padding` về 0 → mọi khoảng cách do mình tự đặt bằng `gap`/`padding` (nhất quán, không phụ thuộc mặc định trình duyệt).
- `html { font-size: 18px; scrollbar-gutter: stable; }` — `scrollbar-gutter: stable` chừa sẵn chỗ thanh cuộn → chuyển giữa trang ngắn (không cuộn) và trang dài (có cuộn) **không bị giật ngang**.
- `body`: `min-height:100vh; display:flex; flex-direction:column` + `main {flex:1}` → **footer luôn dính đáy** (hình ở phần Footer).
- `a { color: inherit; text-decoration: none; transition: color .2s }` — link không xanh/gạch chân mặc định; **lấy màu của cha** (quan trọng, xem [G10]).
- `button { font: inherit; cursor: pointer }` — `<button>` mặc định **không** kế thừa font; `font: inherit` bắt nó dùng font Inter của trang.
- `img { display:block; max-width:100%; height:auto }` — xem [G11].
- `:focus-visible` — xem [G10].

> Vì `*` đã reset margin/padding nên các dòng `body {margin:0}`, `h1,h2,h3,p {margin:0}`, `margin:0; padding:0` ở `.timeline/.skill-list/.technology-tags` đã được **xoá** cho gọn. Nếu thầy hỏi "sao không reset riêng cho h1, p?" → vì `*` đã làm hết.

📍 Dùng ở: toàn trang.

## G3. Cascade: độ ưu tiên, thứ tự, nguồn gốc — **cực hay bị hỏi**

Khi nhiều rule cùng áp lên 1 thuộc tính, trình duyệt chọn theo thứ tự:

1. **Origin**: style tác giả (file của mình) **thắng** style mặc định của trình duyệt (UA), _bất kể specificity_.
2. **Specificity** (độ cụ thể): `(id, class/attr/pseudo-class, tag)`
   - `.card` = (0,1,0); `.nav-link.active` = (0,2,0); `.project-filters button` = (0,1,1); `.project-filter-button[aria-pressed="true"]` = (0,2,0); `a.button:hover` = (0,2,1).
   - `:has(X)` có specificity của X. `:where()` = 0.
3. **Thứ tự trong file**: bằng nhau thì **rule sau thắng**.

**Các ví dụ thật trong code của bạn:**

| Tình huống                                                                              | Giải thích                                                                                                                                                                                |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.button {display:inline-flex}` (dòng 210) rồi `.menu-toggle {display:none}` (dòng 314) | Cùng (0,1,0) → rule **sau** thắng → nút ẩn trên desktop. Trong `@media` mobile lại `.menu-toggle {display:inline-flex}` (dòng 515) nằm sau nữa → hiện                                     |
| `.button {padding: 12px 20px}` rồi `.menu-toggle {padding:0}`                           | Cùng lý do: sau thắng                                                                                                                                                                     |
| `.project-grid .card[hidden] {display:none}` (dòng 455)                                 | Thuộc tính `hidden` chỉ có `display:none` ở **style UA**; `.card {display:flex}` là style tác giả nên **thắng** → thẻ không ẩn được. Phải tự viết lại rule này. (Ví dụ cho mục 1: origin) |
| `.project-filters button {color: var(--text)}` vs `.button {color: var(--accent)}`      | (0,1,1) > (0,1,0) → màu chữ nút lọc là `--text`, không phải `--accent`                                                                                                                    |
| `.project-filter-button[aria-pressed="true"] {color: on-accent}` (0,2,0)                | Thắng `.project-filters button` (0,1,1) → nút đang chọn chữ tối trên nền sáng                                                                                                             |
| `.page-content:has(.highlight-grid) {gap:16px}` trong media                             | (0,2,0) > `.page-content {gap:24px}` (0,1,0)                                                                                                                                              |
| `.hero-actions .button {align-self: stretch}` (mobile)                                  | Phải ghi đè `.button {align-self:flex-start}`; xem [G6]                                                                                                                                   |

**Cách debug:** DevTools → tab Styles → dòng bị gạch ngang là rule bị thua.

📍 Dùng ở: khắp nơi; chỗ nhạy nhất là `.button` vs `.menu-toggle` vs `.project-filter-button`.

## G4. Kiểu viết "gom selector" của file này

Thay vì mỗi class tự khai báo mọi thứ, file **gom các class chung 1 thuộc tính** vào 1 rule:

```css
.page-content,
.intro-copy,
.card,
.education,
.timeline,
.skill-list,
.menu-icon {
  display: flex;
  flex-direction: column; /* "xếp dọc" */
}
.card-title,
.hero-subtitle,
.timeline-label {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
}
.nav-link,
.footer-inner,
.body-copy,
.card-copy,
.skill-list {
  color: var(--muted);
}
```

- Ưu điểm: không lặp code; muốn đổi "mọi thứ xếp dọc" chỉ sửa 1 nơi.
- Nhược điểm: muốn biết `.card` trông thế nào phải **tìm nó ở nhiều rule**. Khi demo, dùng Ctrl+F tên class hoặc DevTools → Styles để thấy hết.
- Dấu `,` = "hoặc" (nhiều selector, cùng rule). Dấu cách (`.project-grid .card`) = con cháu. Dính liền (`.nav-link.active`) = cùng 1 phần tử có cả 2 class.

📍 Dùng ở: `style.css:105-218` (các rule nhóm), thấy rõ nhất ở layout và typography.

## G5. ⭐ `box-shadow: inset` thay cho `border` — giải thích kỹ

**Cú pháp** `box-shadow: inset X Y BLUR SPREAD COLOR`

```
--inside-border: inset 0 0 0 1px var(--border-subtle)
                       │ │ │  └─ spread 1px: mở rộng bóng 1px
                       │ │ └──── blur 0: sắc nét (không mờ)
                       │ └────── offset-y 0
                       └──────── offset-x 0
```

`inset` = bóng vẽ **bên trong** hộp. Spread 1px + blur 0 + không lệch ⇒ một **dải 1px sát mép trong, cả 4 cạnh** = trông y như `border: 1px solid`.

Bản 1 cạnh (header/footer):

```
.site-header : inset 0 -1px  color   → dịch bóng LÊN 1px → hở ra dải 1px ở MÉP DƯỚI
.site-footer : inset 0  1px  color   → dịch bóng XUỐNG 1px → hở ra dải 1px ở MÉP TRÊN
```

```
 header                          footer
┌────────────────────┐          ┌────────────────────┐ ← vạch 1px (đỉnh footer)
│                    │          │                    │
└────────────────────┘          └────────────────────┘
 ▔▔▔▔▔▔▔ vạch 1px (đáy header)
```

**Vì sao không dùng `border`? (lý do kỹ thuật có thể kiểm chứng)**

|                        | `border: 1px solid`                                                                                | `box-shadow: inset 0 0 0 1px`                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Ảnh hưởng layout       | **Có**: border chiếm chỗ, vùng nội dung co lại 2px mỗi chiều (dù `border-box` giữ tổng kích thước) | **Không**: không chiếm chỗ, nội dung đứng yên                                                           |
| Bật/tắt viền           | Muốn bỏ phải `border:0` hoặc đổi sang `transparent`, nếu độ dày đổi thì nội dung **nhúc nhích**    | Chỉ cần `box-shadow: none` — vd `.button-primary {box-shadow:none}` (dòng 245) bỏ viền khi nút nền xanh |
| Hover đổi màu viền     | Làm được (đổi `border-color`)                                                                      | `.card:hover {box-shadow: inset … var(--border-strong)}` + `transition: box-shadow`                     |
| Bo góc                 | Theo `border-radius`                                                                               | Cũng theo `border-radius`                                                                               |
| Dùng 1 biến dùng chung | Phải lặp `border: 1px solid var(…)`                                                                | 1 biến `--inside-border` gói sẵn                                                                        |

Comment trong code (dòng 29): _"Inset box-shadow acts as a 1px border without changing the box size"_ — đây là lý do **tác giả ghi sẵn**.

**⚠️ Hạn chế thật của cách này (nên tự nói trước khi thầy hỏi):**

1. **Bóng inset vẽ DƯỚI nội dung** (thứ tự vẽ CSS: nền → bóng inset → nội dung con). ⇒ Nếu con phủ kín hộp thì **che mất viền**. `.avatar` có `overflow:hidden` và ảnh `.portrait` `width/height:100%` phủ kín → **viền của avatar khả năng bị ảnh che, không thấy**. `.project-media` thì ảnh nhỏ ở giữa nên viền vẫn thấy. _(Suy ra từ quy tắc vẽ của CSS — hãy bật DevTools kiểm tra trên avatar để chắc.)_
2. Chế độ **Windows High Contrast / forced-colors**: trình duyệt **bỏ box-shadow**, còn `border` thì giữ ⇒ viền biến mất với người dùng bật chế độ này. (Vì vậy **focus ring** ở dưới dùng `outline`, không dùng shadow.)
3. Không tạo được kiểu viền `dashed/dotted`.

📍 Dùng ở: `.button` (kể cả `.menu-toggle`, nút lọc), `.avatar`, `.card`, `.project-media` (dòng 203-208); hover: `.card:hover`, `.project-filter-button:hover`; một cạnh: `.site-header` (dòng 271), `.site-footer` (dòng 276).

## G6. Flexbox — các mẫu dùng trong bài

| Thuộc tính                       | Ý nghĩa                                                                                | Chỗ dùng                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `display:flex`                   | Con xếp thành hàng (mặc định `row`)                                                    | `.header-inner`, `.nav-list`, `.social-links`, `.hero-actions`, `.timeline-item`          |
| `flex-direction: column`         | Xếp dọc                                                                                | `.page-content`, `.card`, `.intro-copy`, `.timeline`, `.skill-list`, `.menu-icon`, `body` |
| `justify-content: space-between` | Dồn 2 đầu (trục chính)                                                                 | `.header-inner`, `.footer-inner` (logo trái / menu phải)                                  |
| `align-items: center`            | Căn giữa trục phụ                                                                      | header, footer, nav, social-links                                                         |
| `flex-wrap: wrap`                | Cho phép xuống dòng khi hết chỗ                                                        | header, footer, nav, social, hero-actions, filters, tags                                  |
| `gap: A B`                       | `row-gap column-gap`. VD `gap: var(--space-16) var(--space-32)` = dọc 16, ngang 32     | `.header-inner`, `.nav-list`                                                              |
| `flex: 1` (trên `main`)          | Chiếm hết phần dư                                                                      | sticky footer                                                                             |
| `flex-shrink: 0`                 | Không bị bóp nhỏ                                                                       | `.button`, `.timeline-marker` (icon không méo)                                            |
| `align-self: flex-start`         | Con này **không bị kéo giãn** khi cha là `column`                                      | `.button`, `.text-link` trong card (nếu không, link giãn hết chiều ngang card)            |
| `min-width: 0`                   | Cho phép item co nhỏ hơn nội dung (mặc định `min-width:auto` = không co dưới nội dung) | `.avatar`, `.card`, `.intro-copy`, `.timeline-label` — tránh chữ/URL dài làm vỡ layout    |
| `flex-basis: 100%`               | Chiếm trọn 1 dòng ⇒ ép xuống dòng mới                                                  | `.nav-list` mobile                                                                        |
| `inline-flex`                    | Như flex nhưng phần tử vẫn **nằm trong dòng**                                          | `.button`, `.text-link` (căn icon với chữ)                                                |

Phần tử con của flex container được "blockify" — vì vậy ba `<span>` (vốn inline) trong `.menu-icon` đặt được `height:2px`.

## G7. CSS Grid — các mẫu dùng trong bài

```css
grid-template-columns: repeat(3, minmax(0, 1fr)); /* .card-grid */
```

- `repeat(3, X)` = 3 cột giống nhau. `fr` = phần chia của chỗ trống.
- **Tại sao `minmax(0, 1fr)` chứ không `1fr`?** `1fr` thực chất là `minmax(auto, 1fr)`: cột không được nhỏ hơn nội dung nhỏ nhất của nó ⇒ từ/URL dài **đẩy cột phình ra**. `minmax(0, 1fr)` cho phép co về 0 → luôn chia đều.
- `minmax(0, 560px)` = cột **tối đa** 560px, co được. Cột 2 `minmax(0, 360px)`. Hết tổng cũng chỉ 560+64+360 = 984 < 1200 ⇒ `justify-content: start` đẩy cả cụm sang **trái**.
- `align-items: start` (`.card-grid`): các thẻ **không** bị kéo cao bằng nhau; mỗi thẻ cao theo nội dung. (Nếu muốn thẻ cùng chiều cao, bỏ dòng này.)
- `place-items: center` = `align-items` + `justify-items` cùng lúc (`.project-media`: icon ở giữa).
- `gap` dùng như flex.
- `.contact-grid` cùng class với `.card-grid` nên đứng **sau** để ghi đè cột: `repeat(2, minmax(0, 384px))`.

```
.intro (trang chủ)                    .about-intro
┌────────560────────┐ 64 ┌───360───┐   ┌──360──┐ 64 ┌────────── 1fr ──────────┐
│ chữ (hero-copy)   │    │ avatar  │   │avatar │    │ chữ (intro-copy)        │
└───────────────────┘    └─────────┘   └───────┘    └─────────────────────────┘
 align-items:center                      align-items:start
```

📍 `.intro` (index, about), `.card-grid` (index highlights, skills, projects, contact), `.project-media`, mobile `.project-filters`.

## G8. `.container` và `--gutter` với `clamp()` — `style.css:32, 97-103`

```css
--gutter: clamp(48px, 8.3334vw, 120px);
.container {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: var(--gutter);
}
```

- `clamp(MIN, ƯU TIÊN, MAX)` = giá trị giữa; ở đây lề trái/phải **tăng/giảm theo độ rộng viewport** nhưng không dưới 48px, không quá 120px.
- `8.3334vw`: `1vw` = 1% bề rộng viewport. Màn 1440 → ≈120px (đúng MAX).
- `max-width:1440px` + `margin-inline:auto` → trên màn rộng hơn, khối **nằm giữa** hai bên trống.
- `padding-inline` = padding trái+phải (thuộc tính logic). Cũng có `padding-block` (trên+dưới), `margin-inline`.
- Mobile ≤768px: `--gutter: 24px` ghi đè.

```
viewport ≥ 1440:  |   ← trống →   |120|=== nội dung 1200 ===|120|   ← trống →   |
                                  └──── .container max 1440 ────┘
viewport 1000:    |83|======= nội dung =======|83|        (8.3334vw × 1000 ≈ 83px, nằm giữa 48 và 120)
viewport ≤ 768:   |24|==== nội dung ====|24|
```

📍 **Mọi trang** (header, main, footer đều có `.container`): `header-inner`, `footer-inner`, `.page-content`, `.hero`.

## G9. Typography & văn bản

- **Font**: `--font-body: Inter, sans-serif` — Inter tải từ Google Fonts; `sans-serif` là dự phòng.
- **Cỡ chữ/dòng**: dùng `px` toàn bộ. Dù `html {font-size:18px}`, **không dùng `rem`**; chữ không tự co theo cỡ chữ người dùng chỉnh trong trình duyệt (xem Câu hỏi mở).
- **`line-height: 29px`** trên body (đơn vị `px`, cố định) và các cỡ chữ có `line-height` riêng: title 40/48, section 32/40, card-title 20/28, card-copy 15/24, nav 14/20, tag 12/18.
- **Độ đậm**: 700 (title), 600 (card-title, button, tag), 500 (nav-link) — đúng 4 độ đậm đã tải (400/500/600/700).
- **`font-synthesis: none`** (body): cấm trình duyệt **tự chế** chữ đậm/nghiêng giả khi thiếu bản thật → tránh chữ xấu, đổi bề rộng.
- **`overflow-wrap: anywhere`** (body, kế thừa): từ/URL dài **được bẻ ở bất kỳ chỗ nào** thay vì tràn khỏi màn hình. (Khác `break-word` ở chỗ `anywhere` còn tính vào kích thước tối thiểu → giúp flex/grid item co nhỏ được.) Cần vì dòng `linkedin.com/in/hào-lê-787840432/` ở trang Contact dài.
- **Màu chữ**: `--text` (chính), `--muted` (phụ: nav, footer, đoạn mô tả, card-copy, skill-list), `--accent` (link, button, active), `--accent-2` (tag công nghệ).

📍 Toàn trang. Nhóm 20/600: `.card-title .hero-subtitle .timeline-label`; nhóm 14/20: `.nav-link .footer-inner`.

## G10. Link, nút, hover, focus

**Nút `.button`** (dòng 203-235): `inline-flex` + `justify-content:center` (chữ giữa), `padding 12 20`, `border:0` (bỏ viền mặc định của `<button>`; viền thật = shadow [G5]), `border-radius:8`, nền `--card`, `transition: background .2s, color .2s, box-shadow .2s` (viết nhiều giá trị, mỗi dòng 1 thuộc tính).

**Biến thể:**

- `.button-primary` (nền xanh, chữ tối, `box-shadow:none`).
- `.button-repository` (padding nhỏ hơn).
- `.project-filter-button` (+ `[aria-pressed="true"]` thì thành kiểu primary).
- `.menu-toggle` (nút hamburger, vuông 40×40).

**Hiệu ứng hover:**

```css
.social-links a:hover,
.text-link:hover,
.contact-grid a:hover,
a.button:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

- `a.button:hover` (thẻ **a** **và** class button) ⇒ chỉ gạch chân với nút là **link** (Home, Contact, GitHub). Nút `<button>` (lọc, hamburger) không bị gạch chân.
- `text-underline-offset` đẩy đường gạch xa chữ 4px.
- `a { color: inherit }` + `.social-links {color:var(--accent)}` ⇒ link con tự lấy màu xanh của cha. Đổi màu 1 chỗ.

**Focus bàn phím**

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

- `:focus-visible` = chỉ hiện vòng focus khi người dùng **điều hướng bằng phím** (Tab); click chuột không hiện.
- Dùng `outline` (không dùng shadow): không ảnh hưởng layout, **giữ được trong forced-colors**, `outline-offset` tách vòng khỏi nút.

📍 Dùng ở: header (`.brand`, `.nav-link`, `.menu-toggle`), hero buttons, `.text-link`, filters, GitHub buttons, contact links, footer links.

## G11. Hình ảnh

- Thuộc tính `width`/`height` trong HTML (`800×1200`, `16×16`, `48×48`, `24×68`) **chỉ để trình duyệt giữ chỗ trước khi ảnh tải** (tránh trang nhảy – CLS). Kích thước hiển thị thật do CSS quyết định.
- `img { display:block; max-width:100%; height:auto }`: bỏ khe trắng dưới ảnh (ảnh mặc định là inline), không tràn cha, giữ tỉ lệ.
- `object-fit: cover` (`.portrait`) = lấp đầy khung, **cắt phần thừa** (ảnh gốc dọc 2:3, khung vuông). `object-position: center 30%` = căn ngang giữa, **dọc lấy ở 30% từ trên** → giữ khuôn mặt.
- `object-fit: contain` (`.project-media img`) = hiện **trọn ảnh**, thu nhỏ vừa khung, có thể còn trống.
- `aspect-ratio: 1` (`.avatar`) = khung luôn **vuông** theo bề rộng.
- Alt: ảnh có nghĩa → alt mô tả (`Portrait of…`); ảnh **trang trí** (icon mũi tên, marker, icon dự án) → `alt=""` để trình đọc màn hình bỏ qua.
- SVG load bằng `<img>` **không đọc được biến CSS** ⇒ màu trong SVG ghi cứng (`#38BDF8`, `#94A3B8`…).

```
Ảnh gốc 800×1200      Khung .avatar (vuông)       object-position: center 30%
┌────────┐            ┌────────┐
│  đầu   │ ──cover──► │ đầu    │   → cắt bớt phần dưới nhiều hơn phần trên
│  thân  │            │ thân   │
│  chân  │            └────────┘
└────────┘
```

## G12. Truy cập (accessibility) — thuộc tính HTML hay gặp

| Thuộc tính                                  | Ý nghĩa                                                                                                                       | Chỗ dùng                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `aria-label`                                | Tên cho phần tử không có chữ nhìn thấy                                                                                        | nút hamburger; 2 thẻ `<nav>` ("Primary navigation", "Social media") để phân biệt landmark; nhóm filter |
| `aria-expanded="true/false"`                | Nút đang mở/đóng                                                                                                              | `.menu-toggle` (JS đổi)                                                                                |
| `aria-controls="id"`                        | Nút này điều khiển phần tử nào                                                                                                | `.menu-toggle → #primary-navigation`; các nút lọc → `#project-list`                                    |
| `aria-current="page"`                       | Đánh dấu trang hiện tại                                                                                                       | link nav của trang đang mở (cùng class `.active` để tô màu)                                            |
| `aria-hidden="true"`                        | Ẩn khỏi trình đọc màn hình                                                                                                    | `.menu-icon` (trang trí)                                                                               |
| `aria-pressed="true/false"`                 | Nút bật/tắt                                                                                                                   | nút lọc dự án                                                                                          |
| `role="group"` + `aria-label`               | Gom nhiều nút thành 1 nhóm có tên                                                                                             | `.project-filters`                                                                                     |
| `target="_blank" rel="noopener noreferrer"` | Mở tab mới an toàn: `noopener` = tab mới không điều khiển được tab cũ (`window.opener`), `noreferrer` = không gửi trang nguồn | link GitHub/LinkedIn                                                                                   |
| `title`                                     | Tooltip + mô tả thêm                                                                                                          | nút GitHub từng dự án                                                                                  |
| `hidden`                                    | Ẩn phần tử (JS gán `.hidden = true/false`)                                                                                    | thẻ dự án                                                                                              |
| `data-*`                                    | Dữ liệu tuỳ ý gắn vào HTML, JS đọc bằng `getAttribute`                                                                        | `data-project-filter`, `data-project-category`                                                         |
| Thứ bậc heading                             | `h1` → `h2` → `h3`, mỗi trang đúng **1 `h1`**                                                                                 | index: h1, h2 "Highlights", h3 từng card                                                               |

---

# PHẦN B — HEADER (`<header class="site-header">`)

```
DESKTOP
┌─ .site-header (sticky; vạch 1px dưới = inset shadow) ───────────────────────┐
│  .container.header-inner (flex, space-between, align-center, min-height 72)  │
│  ┌──────┐                         ┌─ nav.nav-list ─────────────────────────┐ │
│  │HaoLe │ (.brand)                │ Home  About  Skills  Projects  Contact │ │
│  └──────┘                         └────────────────────────────────────────┘ │
│  (.menu-toggle: display:none trên desktop)                                   │
└──────────────────────────────────────────────────────────────────────────────┘

MOBILE (≤768)                                         MENU MỞ (.is-open)
┌──────────────────────────┐                          ┌──────────────────────────┐
│ HaoLe              [ ☰ ] │                          │ HaoLe              [ ✕ ] │
└──────────────────────────┘                          │   ← nav chiếm hàng riêng │
  nav bị display:none                                 │   Home (active: nền card)│
                                                      │   About ...              │
                                                      └──────────────────────────┘
```

### B1. Khung header — `style.css:266-282`

- `position: sticky; top: 0` ⇒ header **dính mép trên** khi cuộn (khác `fixed`: sticky vẫn chiếm chỗ trong luồng, không che nội dung). Phải có `background: var(--bg)` để nội dung cuộn qua không lộ xuyên.
- `z-index: 50` ⇒ chắc chắn header nằm trên nội dung khi cuộn.
- Vạch dưới: `box-shadow: inset 0 -1px var(--border-subtle)` → [G5].
- `.header-inner`: `.container` (lề [G8]) + flex space-between, center [G6]; `gap: 16px 32px`, `min-height: 72px` (header cao tối thiểu 72, không phải cố định → chữ lớn/wrap vẫn giãn được).

### B2. Logo `.brand` — là thẻ `<a href="index.html">`

`24px/700/32`. Màu = `--text` nhờ `a {color:inherit}` [G2].

### B3. Điều hướng `nav.nav-list#primary-navigation`

- `display:flex; flex-wrap:wrap; gap: 12px 32px; align-items:center` [G6].
- `.nav-link`: `14px/20px`, `500`, màu `--muted`.
- `.nav-link.active, .nav-link:hover { color: var(--accent) }` — 2 class dính liền = cùng phần tử có cả `nav-link` **và** `active` [G3,G4].
- Trang hiện tại có `class="active"` **và** `aria-current="page"` (CSS dùng class để tô, `aria-current` để trình đọc màn hình biết).
- `id="primary-navigation"` là mục tiêu của `aria-controls` và `querySelector("#primary-navigation")` trong JS.

### B4. Nút hamburger `.button.menu-toggle` — `style.css:313-342`

```html
<button
  class="button menu-toggle"
  aria-label="Open navigation menu"
  aria-expanded="false"
  aria-controls="primary-navigation"
>
  <span class="menu-icon" aria-hidden="true"
    ><span></span><span></span><span></span
  ></span>
</button>
```

- Mặc định `display:none` (desktop); trong media mobile mới `inline-flex` [G3 về thứ tự].
- `.button` đã cho nền card + viền shadow [G5] + canh giữa; `.menu-toggle` ghi đè kích thước `40×40`, `padding:0` và `color: var(--text)`.
- **3 gạch** = 3 `<span>` trong `.menu-icon` (`flex column`, `gap:4px`, `width:20px`); mỗi gạch `height:2px`, `background: currentColor` (= màu chữ của nút, nên đổi màu nút là đổi màu gạch), `border-radius:1px`.
- **Biến thành chữ X khi mở** (`aria-expanded="true"`):

```
Đóng:                 Mở:
 ▬▬▬  ← span1          ╲   span1: translateY(6px) rotate(45deg)
 ▬▬▬  ← span2           ✕  span2: opacity 0 (biến mất)
 ▬▬▬  ← span3          ╱   span3: translateY(-6px) rotate(-45deg)
```

- Tại sao **6px**? Tâm 2 gạch cạnh nhau cách `2px (cao) + 4px (gap) = 6px`. Gạch trên dịch xuống 6, gạch dưới dịch lên 6 ⇒ cả 2 dồn vào tâm gạch giữa rồi xoay ±45° thành chữ X.
- `transform` xoay quanh **tâm phần tử** (mặc định `transform-origin: 50% 50%`).
- Selector `.menu-toggle[aria-expanded="true"] .menu-icon span:nth-child(1)`: CSS đọc **trạng thái từ thuộc tính ARIA** do JS đặt → JS không cần đụng class. `:nth-child(n)` = con thứ n.
- Các span **không có `transition`** → biến đổi diễn ra tức thì (không mượt).

### B5. Hành vi menu mobile (CSS, `style.css:509-541`)

```css
.header-inner {
  gap: 0;
  min-height: 0;
  padding: 16px;
} /* ghi đè lề gutter bằng padding 16 */
.nav-list {
  display: none;
  flex-basis: 100%;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  padding-top: 32px;
}
.nav-list.is-open {
  display: flex;
} /* JS thêm/xoá class is-open */
.nav-link {
  padding: 12px 0;
  border-radius: 8px;
}
.nav-link:hover,
.nav-link.active {
  background: var(--card);
  padding-inline: 16px;
}
```

- `.header-inner` là flex-wrap: logo + nút ở hàng đầu; `.nav-list` có `flex-basis:100%` nên **tự xuống hàng 2** khi hiện.
- `.nav-list.is-open` (0,2,0) thắng `.nav-list` (0,1,0) → [G3].
- `display:none` loại hẳn nav khỏi cây truy cập → link không tab được khi menu đóng (đúng ý).
- Hover/active trên mobile có nền card + padding ngang 16 → **chữ dịch sang phải 16px khi hover** (xem Câu hỏi mở).
- JS điều khiển: xem **Phần F, mục F1 (navigation.js)**.

---

# PHẦN C — MAIN (`<main>`)

`main { flex: 1 }` + `body {display:flex; flex-direction:column; min-height:100vh}` ⇒ footer luôn ở đáy:

```
 Trang ngắn:                         Trang dài:
┌─ header ──────────┐               ┌─ header ──────────┐
├─ main (flex:1) ───┤               ├─ main ────────────┤
│  (giãn ra lấp đầy)│               │  nội dung dài…    │
├─ footer ──────────┤ ← sát đáy     ├─ footer ──────────┤
└───────────────────┘               └───────────────────┘
```

## C0. Bộ khung nội dung chung của main

- `.page-content`: `padding-block: 80px` (mobile 32), **flex column, gap 32** (mobile 24). Là "khung" mỗi trang. Kết hợp `.container` [G8].
- `.page-title` (h1): `40/700/48`. `.section-title` (h2): `32/700/40`.
- `.body-copy`: đoạn văn, màu `--muted`.
- `.card` (dùng ở 4 trang): xem **C2 — Card**.

## C1. `index.html` — Trang chủ

```
┌────────────────────────── section.container.intro.hero ─────────────────────┐
│ ┌── .intro-copy.hero-copy (flex column, gap 24) ──┐  64  ┌── .avatar ───┐  │
│ │ h1.page-title   "Le Ngoc Hao"                    │      │  ảnh vuông   │  │
│ │ p.hero-subtitle "Backend Developer (in training)"│      │ bo góc 24    │  │
│ │ p.body-copy                                     │      └──────────────┘  │
│ │ .hero-actions: [View projects] [Contact]        │                        │
│ └──────────────────────────────────────────────────┘                        │
└──────────────────────────────────────────────────────────────────────────────┘
┌────────────────── section.container.page-content ───────────────────────────┐
│ h2 Highlights                                                                │
│ .card-grid.highlight-grid: [Skills][Projects][About]   (3 cột)               │
└──────────────────────────────────────────────────────────────────────────────┘
```

- **Hero**: `<section class="container intro hero">` — **3 class trên 1 phần tử**: `container` (lề), `intro` (grid 2 cột), `hero` (padding-block 80). Grid xem [G7].
- `.hero-copy {align-items:flex-start}`: các con không bị giãn hết bề ngang cột (đặc biệt `.hero-actions`).
- `.hero-actions`: flex-wrap, gap 12. Nút 1 `.button-primary` (nền xanh), nút 2 `.button` thường [G10].
- `.avatar`: vuông (`aspect-ratio:1`), `max-width:360`, `overflow:hidden` + `border-radius:24` ⇒ **ảnh bị cắt theo góc bo** (không bo thì ảnh vẫn góc vuông; `overflow:hidden` là thứ cắt). Ảnh trong: `object-fit: cover; object-position: center 30%` [G11]. Viền ⚠ xem [G5].
- **Highlights**: 3 `article.card`, mỗi cái `h3.card-title` + `p.card-copy` + `a.text-link` có icon mũi tên (`img` 16×16, `alt=""`).
- `.text-link`: `inline-flex; align-items:center; gap:4px; align-self:flex-start` → link co theo nội dung, icon cách chữ 4px.

## C2. Card — dùng chung (index, skills, projects, contact) — `style.css:403-412`

```css
.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 16px;
  background: var(--card);
  box-shadow: var(--inside-border);
  transition: box-shadow 0.2s;
}
.card:hover {
  box-shadow: inset 0 0 0 1px var(--border-strong);
}
```

- Viền = inset shadow, **hover đổi sang màu đậm hơn mượt nhờ `transition: box-shadow`** [G5].
- `background` và `min-width:0` nằm ở rule nhóm `.avatar, .card` (dòng 367-371).
- Dùng `article` vì mỗi card là một mục độc lập có tiêu đề.

📍 `index` (3 card), `skills` (6), `projects` (4), `contact` (4).

## C3. `about.html`

```
div.container.page-content.about-content (flex column, gap 64)
├─ section.intro.about-intro  (grid: avatar 360 | chữ 1fr, align-items:start)
│    ├─ .avatar > img.portrait
│    └─ .intro-copy: h1 "About me" + 2 × p.body-copy
└─ section.education (flex column, gap 32)
     ├─ h2 Education
     └─ ol.timeline (flex column, gap 24)
          ├─ li.timeline-item  [marker 24×68] 2025: Greenwich University
          ├─ li.timeline-item  [marker 24×68] 2025: Aptech
          └─ li.timeline-item  [goal 24×12  ] Goal: Backend / Database
```

- Ở đây `<div class="container page-content about-content">` bọc **cả** intro và education (index thì mỗi section có container riêng).
- **Timeline** (`style.css:418-440`): `ol` (danh sách **có thứ tự**, đúng ngữ nghĩa dòng thời gian) + `list-style:none` để bỏ số.
  - `.timeline-item`: `flex`, `align-items:flex-start`, `gap:16`, `min-height:68px` (khớp chiều cao icon marker).
  - `.timeline-marker`: `flex-shrink:0` — icon không bị bóp.
  - `.timeline-item:last-child {min-height:0}` — mục cuối (goal) chỉ là chấm 12px, không cần cao 68. `:last-child` = phần tử con cuối cùng.
  - `.timeline-label {min-width:0}` — cho phép chữ xuống dòng trong flex.
- SVG `timeline-marker.svg` (24×68): 1 chấm tròn r=6 trên cùng + 1 đường thẳng đứng 2px dài 56 (`#334155`, cùng màu `--border-subtle`). `timeline-goal.svg` (24×12): chỉ có chấm tròn.
- Về chỗ gạch: mỗi item cao tối thiểu 68 và giữa các item có `gap:24` ⇒ đường dọc giữa 2 chấm có **đứt 24px** — đây là chủ ý theo thiết kế (từng đoạn nối từng mốc).

## C4. `skills.html`

- `h1.page-title` + `section.card-grid` với 6 `article.card` (Languages, Frameworks, Databases, Tools, Frontend, Currently Learning) → lưới 3 cột × 2 hàng [G7].
- Mỗi card: `h2.card-title` + `ul.skill-list`.
- `.skill-list`: `flex column`, `gap:12`, `list-style:none`, `15/24`, màu muted. (nằm trong rule nhóm — dòng 110-118, 154-160, 189-201.)
- Chú ý: ở trang này `h2` (card-title) nằm dưới `h1`, còn ở index `h3` nằm dưới `h2` → thứ bậc heading vẫn hợp lệ.

## C5. `projects.html` (trang có JS)

```
h1 Projects
.project-filters (role=group)   [All*][Frontend][Backend][Fullstack]     * = aria-pressed="true" (nền xanh)
section.card-grid.project-grid#project-list
   article.card[data-project-category="backend"]
      ├─ .project-media (grid, place-items:center, cao 200, bo 12, viền shadow) > img 48×48
      ├─ h2.card-title
      ├─ p.card-copy
      ├─ ul.technology-tags > li.technology-tag  "#Node" "#SQL"
      └─ a.button.button-repository  "GitHub"
```

- **Nút lọc**: `class="button project-filter-button"`, 3 thuộc tính quan trọng: `data-project-filter="all|frontend|backend|fullstack"`, `aria-pressed`, `aria-controls="project-list"`.
- **Trạng thái đang chọn do CSS vẽ từ `aria-pressed`**:

  ```css
  .button-primary,
  .project-filter-button[aria-pressed="true"] {
    background: accent;
    box-shadow: none;
    color: on-accent;
  }
  ```

  `[attr="value"]` = **attribute selector**. JS chỉ đổi thuộc tính, CSS lo hình thức.

- `.project-filter-button:hover { box-shadow: inset 0 0 0 1px var(--accent) }` (viền xanh khi hover — [G5]).
- `.project-grid .card[hidden] {display:none}` — **bắt buộc** (giải thích ở [G3]).
- `.project-media`: `display:grid; place-items:center; height:200; radius 12` + `img {max-height:100%; object-fit:contain}` [G7, G11]. Là **placeholder** (icon image.svg).
- `.technology-tags`: `flex wrap; gap 8; list-style none; align-items:flex-start`. `.technology-tag`: `padding 4 8`, màu `--accent-2`, `12/18`, 600. (Không có nền/viền nên cũng không đặt `border-radius`.)
- `.button-repository`: nút GitHub của từng dự án; `title="Sample Backend API on GitHub"` cho tooltip.

## C6. `contact.html`

- `p.body-copy` giới thiệu + `section.card-grid.contact-grid` (4 card: Email, GitHub, LinkedIn, Response time).
- `.contact-grid`: **2 cột** `repeat(2, minmax(0, 384px))` ghi đè 3 cột của `.card-grid` (đứng sau, cùng specificity) [G3, G7].
- Link `mailto:` mở ứng dụng mail. URL LinkedIn trong `href` được **mã hoá phần trăm** (`h%C3%A0o-l%C3%AA`) vì có ký tự có dấu; chữ hiển thị thì để nguyên có dấu.
- `.contact-grid a:hover` gạch chân [G10]. Link trong card thừa hưởng màu muted nhờ `a {color:inherit}`.
- Chữ dài → `overflow-wrap:anywhere` ở body lo [G9].

---

# PHẦN D — FOOTER (`<footer class="site-footer">`)

```
┌──────────────────────────────────────────────────────────────────────┐ ← vạch 1px (inset 0 1px)
│  .container.footer-inner (flex, space-between, wrap, gap 16, pad-y 24)│
│  © 2026 Hao Le                          [GitHub]  [LinkedIn]          │
│  (p, muted 14/20)                        nav.social-links (xanh)      │
└──────────────────────────────────────────────────────────────────────┘
```

- `.site-footer`: nền `--bg` + `box-shadow: inset 0 1px var(--border-subtle)` → vạch **trên** 1px [G5].
- `.footer-inner`: flex [G6] + `padding-block:24`; `font-size:14px; line-height:20px; color:--muted` (nằm trong nhóm typography).
- `.social-links`: `gap:24`, `color: var(--accent)`; link con thừa hưởng nhờ `a {color:inherit}`; hover gạch chân [G10].
- Link ngoài: `target="_blank" rel="noopener noreferrer"` [G12]; `nav aria-label="Social media"`.
- Footer **giống hệt** ở cả 5 trang (không dùng include vì là HTML thuần → phải copy).
- Mobile: lề trái/phải footer lấy từ `--gutter: 24px` của `.container` (không cần rule riêng).

---

# PHẦN E — MOBILE LAYOUT: `@media (max-width: 768px)` — `style.css:485-623`

Cách làm: **desktop là mặc định; mobile ghi đè** (kiểu _desktop-first_, dùng `max-width`). Rule trong `@media` nằm **cuối file** nên thắng rule gốc cùng specificity [G3].

| Thay đổi                 | Cách làm                                                                                                                | Mục đích                                                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lề                       | `--gutter: 24px`                                                                                                        | [G8]                                                                                                                                                 |
| Padding dọc trang        | `.page-content, .hero {padding-block: 32px}`, gap 24                                                                    | gọn                                                                                                                                                  |
| Gap theo trang           | `.page-content:has(.highlight-grid)`/`:has(.project-filters)`                                                           | Khớp thiết kế (Figma) từng trang                                                                                                                     |
| Header                   | `.header-inner {padding:16px; min-height:0; gap:0}`, hiện `.menu-toggle`, ẩn `.nav-list`                                | menu hamburger [B4,B5]                                                                                                                               |
| Lưới card                | `.card-grid, .contact-grid { grid-template-columns: minmax(0,1fr) }`                                                    | 1 cột                                                                                                                                                |
| Intro                    | `.intro, .about-intro {grid-template-columns: minmax(0,1fr); gap:24}`                                                   | 1 cột                                                                                                                                                |
| Avatar                   | `max-width: 220px`                                                                                                      | nhỏ hơn                                                                                                                                              |
| Ảnh lên trên chữ (hero)  | `.hero .avatar {order:-1}`                                                                                              | `order` đổi thứ tự hiển thị mà không sửa HTML; mặc định `order:0`, số nhỏ hơn đứng trước                                                             |
| About: title → ảnh → chữ | `.about-intro .intro-copy {display:contents}` + `.about-intro .page-title {order:-1}`                                   | `display: contents` **bỏ hộp bọc** `.intro-copy`, các con (h1, 2 p) trở thành item trực tiếp của grid ⇒ xếp lại được: h1 (order -1) → avatar → p → p |
| Nút hero                 | `.hero-actions {flex-direction:column; align-items:stretch; width:100%}` + `.hero-actions .button {align-self:stretch}` | nút full-width. Phải ghi đè `align-self:flex-start` của `.button` vì `align-self` của **con** thắng `align-items` của cha                            |
| Bộ lọc                   | `.project-filters {display:grid; grid-template-columns: repeat(2, max-content)}`                                        | 2 cột, mỗi cột rộng bằng nút to nhất (`max-content`)                                                                                                 |
| Card highlight           | `gap 12`, `padding 20`                                                                                                  | gọn                                                                                                                                                  |

**`:has()`** (dòng 501, 505): _"phần tử cha có chứa con X"_ — selector cha theo con (CSS hiện đại; trình duyệt cũ không hỗ trợ). `.page-content:has(.highlight-grid)` chọn đúng section chứa lưới highlight ở trang chủ.

---

# PHẦN F — JAVASCRIPT

## F1. `navigation.js` (mọi trang)

```js
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-navigation");
```

- `querySelector(selector)` trả về phần tử **đầu tiên** khớp (hoặc `null`). `.` = class, `#` = id.

```js
function setMenu(open) {
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu",
  );
  nav.classList.toggle("is-open", open);
}
```

- Một hàm duy nhất đặt **toàn bộ trạng thái** (aria-expanded, nhãn, class) → các nơi gọi luôn đồng bộ. `open` là `true` (mở) hoặc `false` (đóng).
- `cond ? a : b` = toán tử 3 ngôi (nếu `cond` đúng lấy `a`, sai lấy `b`).
- `setAttribute` tự chuyển `true/false` thành chuỗi `"true"/"false"`.
- `classList.toggle("is-open", open)` — tham số thứ 2 = **ép** thêm class (`true`) hoặc bỏ class (`false`), không đảo ngược mù quáng.

```js
toggle.addEventListener("click", () =>
  setMenu(!nav.classList.contains("is-open")),
);
```

- Bấm nút: kiểm tra nav **đang có class `is-open` không**, rồi đảo ngược (`!` = phủ định). Đang mở → đóng; đang đóng → mở. Class `is-open` là nguồn trạng thái duy nhất.

```js
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
```

- **Event delegation**: gắn **1 listener lên nav**, thay vì 5 listener cho 5 link. `e.target` = nơi thực sự bị click; `.closest("a")` đi ngược cây tìm thẻ `<a>` gần nhất (xử lý cả khi click vào phần tử con của link). Mục đích: bấm link → đóng menu.

```js
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
  }
});
```

- Esc (khi menu đang mở) đóng menu **và trả focus về nút** (người dùng bàn phím không bị "mất con trỏ").

```js
window
  .matchMedia("(max-width: 768px)")
  .addEventListener("change", () => setMenu(false));
```

- `window.matchMedia("(max-width: 768px)")` = "hỏi" JS xem media query đúng/sai. Sự kiện `change` bắn mỗi khi cửa sổ **vượt qua mốc 768**; lúc đó đặt menu về trạng thái đóng. **Con số 768 phải khớp CSS.**
- Bản cũ còn đưa focus về nút nếu focus đang nằm trong nav lúc chuyển sang mobile; bản gọn đã bỏ phần này.

## F2. `projects.js` (chỉ projects.html)

```js
const filterButtons = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");
```

- `querySelectorAll` trả `NodeList` (có `.forEach`). `[data-x]` = selector theo thuộc tính (có thuộc tính đó).

```js
function filterProjects(category) {
  // Ẩn/hiện từng thẻ dự án
  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-project-category");

    if (category === "all" || cardCategory === category) {
      card.hidden = false; // hiện
    } else {
      card.hidden = true; // ẩn
    }
  });

  // Đánh dấu nút đang chọn
  filterButtons.forEach((button) => {
    const buttonCategory = button.getAttribute("data-project-filter");

    if (buttonCategory === category) {
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-project-filter");
    filterProjects(category);
  });
});

filterProjects("all");
```

- Luồng: click nút → đọc `data-project-filter` → `filterProjects(category)` → với mỗi thẻ đặt `hidden` (CSS `[hidden]` ẩn thẻ — [G3]) → cập nhật `aria-pressed` (CSS tô nút xanh).
- `getAttribute("tên")` = đọc giá trị của một thuộc tính HTML. Ví dụ thẻ `<article data-project-category="backend">` thì `getAttribute("data-project-category")` trả về `"backend"`. `data-...` là thuộc tính tự đặt tên, trình duyệt không gán ý nghĩa gì sẵn.
- `card.hidden = true/false` = bật/tắt thuộc tính `hidden` của thẻ (có `hidden` thì thẻ bị ẩn).
- `setAttribute("tên", "giá trị")` = đặt giá trị cho một thuộc tính (ở đây là `aria-pressed`).
- `category === "all" || cardCategory === category`: `===` so sánh nghiêm ngặt (cùng giá trị, cùng kiểu); `||` nghĩa là "hoặc". Cả câu: "đang chọn All, **hoặc** thẻ thuộc đúng loại đang chọn" thì hiện thẻ.
- `forEach` = chạy cùng một đoạn code cho từng phần tử trong danh sách.
- `filterProjects("all")` cuối file: đặt **trạng thái ban đầu** (chạy được ngay vì `defer` — DOM đã sẵn).

```
click "Backend" ──► filterProjects("backend")
                       ├─ thẻ data-project-category="backend" → hidden=false (hiện)
                       ├─ các thẻ khác                         → hidden=true  (ẩn: CSS display:none)
                       └─ nút Backend aria-pressed="true", nút còn lại "false"  → CSS đổi màu
```

## F3. `project-search.js` (chỉ projects.html)

```js
const searchInput = document.querySelector("#project-search-input");
const searchCards = document.querySelectorAll("[data-project-category]");
const emptyMessage = document.querySelector("#project-empty");

const searchProjects = () => {
  const query = searchInput.value.trim().toLowerCase();

  searchCards.forEach((card) => {
    const matches = card.textContent.toLowerCase().includes(query);
    card.toggleAttribute("data-search-hidden", !matches);
  });

  const visibleCount = [...searchCards].filter(
    (card) => !card.hidden && !card.hasAttribute("data-search-hidden"),
  ).length;
  emptyMessage.hidden = visibleCount > 0;
};

if (searchInput) {
  searchInput.addEventListener("input", searchProjects);
  document.querySelectorAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", searchProjects);
  });
}
```

- Luồng: gõ chữ (sự kiện `input`) → lấy chuỗi tìm kiếm → thẻ nào có chứa chuỗi đó thì giữ, không thì ẩn → đếm số thẻ còn hiện → nếu 0 thì hiện thông báo "No projects match your search."
- `.value` = chữ trong ô nhập. `.trim()` bỏ khoảng trắng đầu/cuối. `.toLowerCase()` đổi thành chữ thường để tìm **không phân biệt hoa/thường** (cả chuỗi tìm lẫn chữ trong thẻ đều đổi).
- `card.textContent` = toàn bộ chữ bên trong thẻ (tiêu đề, mô tả, tag công nghệ). `.includes(query)` = "có chứa chuỗi này không" (true/false). Ô trống `""` thì mọi thẻ đều khớp.
- **Vì sao dùng `data-search-hidden` mà không dùng `hidden`?** Bộ lọc loại ([F2]) đã dùng `hidden`. Nếu tìm kiếm cũng dùng `hidden`, hai chức năng sẽ ghi đè nhau (ví dụ xoá chữ tìm kiếm sẽ hiện lại cả thẻ mà bộ lọc đang ẩn). Dùng 2 thuộc tính riêng thì thẻ chỉ hiện khi **cả hai** đều không ẩn nó. CSS: `.project-grid .card[data-search-hidden] {display:none}` (`style.css` gần dòng 443).
- `toggleAttribute("tên", bool)` = thêm thuộc tính (nếu `true`) hoặc bỏ thuộc tính (nếu `false`). Ở đây thẻ **không khớp** (`!matches`) thì được gắn `data-search-hidden`.
- `[...searchCards]` = chuyển `NodeList` thành mảng thật để dùng `.filter()`. `.filter(...)` giữ lại các thẻ thoả điều kiện; `.length` = đếm. `!` = phủ định. Thẻ "đang hiện" = không bị `hidden` (bộ lọc) **và** không có `data-search-hidden` (tìm kiếm).
- Click nút lọc cũng gọi `searchProjects` để **cập nhật lại thông báo rỗng** (ví dụ gõ "react" rồi chọn Backend thì có thể không còn thẻ nào).
- `if (searchInput)`: kiểm tra ô tìm kiếm có tồn tại không, tránh lỗi nếu file được nạp ở trang khác.
- `role="status"` trên `<p id="project-empty">`: trình đọc màn hình tự đọc thông báo khi nó hiện ra. `aria-controls="project-list"` trên ô nhập: báo ô này điều khiển danh sách dự án.

## F4. `contact.js` (chỉ contact.html)

```js
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    // ... email, message tương tự ...

    let isValid = true;

    if (name.length < 2) {
      nameError.textContent = "Please enter your name.";
      nameError.hidden = false;
      isValid = false;
    } else {
      nameError.hidden = true;
    }
    // ... kiểm tra email, message tương tự ...

    if (isValid) {
      alert(`Thank you, ${name}!`);
      contactForm.reset();
    }
  });
}
```

- Luồng: bấm Send (sự kiện `submit`) → chặn trang tải lại → lấy dữ liệu 3 ô → kiểm tra từng ô → ô sai thì hiện lỗi, ô đúng thì ẩn lỗi → nếu cả 3 đúng thì báo cảm ơn và xoá form.
- `e.preventDefault()` = **chặn hành vi mặc định** của form (gửi dữ liệu và tải lại trang) để JS tự xử lý. Bài này không có server nên chỉ hiện `alert`.
- `novalidate` trên `<form>` (HTML) tắt khung báo lỗi mặc định của trình duyệt để dùng thông báo lỗi tự viết.
- `isValid` là **cờ (flag)**: bắt đầu `true`, ô nào sai thì đổi thành `false`. Cuối cùng chỉ cần nhìn cờ này. Ba `if` chạy độc lập (không `else if`) nên **lỗi của cả 3 ô hiện cùng lúc**.
- Điều kiện kiểm tra: tên ≥ 2 ký tự; message ≥ 10 ký tự; email dùng **regex** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` = "một đoạn không có khoảng trắng/@, rồi `@`, rồi đoạn nữa, rồi dấu chấm, rồi đoạn nữa" (`.test(email)` trả true/false). Chỉ kiểm tra hình dạng cơ bản, không đảm bảo email có thật.
- `.trim()` để người dùng gõ toàn dấu cách vẫn bị tính là rỗng.
- `<p class="form-error" id="name-error" hidden>`: thông báo lỗi có sẵn trong HTML nhưng bị ẩn; JS gán chữ bằng `textContent` rồi bỏ `hidden`. Ô nhập có `aria-describedby="name-error"` để trình đọc màn hình đọc lỗi cùng với ô đó.
- Template string: `` `Thank you, ${name}!` `` — dấu huyền (backtick) cho phép chèn biến bằng `${...}`.
- `contactForm.reset()` đưa các ô về trống.

---

# PHẦN G — HỎI–ĐÁP NHANH (dự đoán thầy hỏi)

1. **Tại sao viền dùng `box-shadow` mà không `border`?** → [G5]: không chiếm layout, bật/tắt bằng `box-shadow:none`, dùng 1 biến chung, theo `border-radius`; hạn chế: bị nội dung che, mất ở forced-colors.
2. **`box-sizing: border-box` là gì?** → width/height gồm cả padding + border [G2].
3. **`1fr` khác `minmax(0,1fr)` thế nào?** → `1fr` không co dưới nội dung nhỏ nhất; `minmax(0,1fr)` cho co về 0 [G7].
4. **`clamp()` làm gì?** → [G8].
5. **Footer dính đáy bằng cách nào?** → `body` flex column + `min-height:100vh` + `main {flex:1}`.
6. **`sticky` vs `fixed`?** → sticky ở trong luồng, chỉ "dính" khi cuộn tới ngưỡng `top:0`; fixed rời luồng, nội dung phía dưới bị che.
7. **Menu mobile hoạt động ra sao?** → JS đổi `aria-expanded` + class `is-open`; CSS ẩn nav bằng `display:none` và hiện lại bằng `.nav-list.is-open` [B5, F1].
8. **Hamburger thành X bằng cách nào?** → 3 span, `translateY(±6px) rotate(±45deg)`, span giữa `opacity:0` [B4].
9. **Tại sao có `.project-grid .card[hidden]`?** → vì style tác giả `display:flex` thắng style UA của `hidden` [G3].
10. **`display: contents`?** → hộp bọc biến mất, con thành item trực tiếp của grid cha [E].
11. **`order: -1`?** → đẩy phần tử lên đầu trong flex/grid mà không đổi HTML [E].
12. **`:has()`?** → chọn cha theo con [E].
13. **Event delegation?** → 1 listener ở cha xử lý click của nhiều con nhờ `event.target.closest()` [F1].
14. **`defer` làm gì?** → tải song song, chạy sau khi parse HTML xong, giữ đúng thứ tự [Head].
15. **`:focus-visible` khác `:focus`?** → chỉ hiện khi điều hướng bằng bàn phím [G10].
16. **`alt=""` để làm gì?** → ảnh trang trí; trình đọc màn hình bỏ qua [G11].
17. **`rel="noopener noreferrer"`?** → [G12].
18. **Tại sao `aria-expanded`/`aria-pressed`?** → báo trạng thái cho công nghệ hỗ trợ; đồng thời CSS dùng chúng để tô style [G12].
19. **`rem` vs `px`?** → bài này dùng `px` toàn bộ; `rem` tỉ lệ theo cỡ chữ gốc, tốt hơn cho người chỉnh cỡ chữ. (Câu hỏi mở bên dưới.)
20. **Desktop-first hay mobile-first?** → desktop-first: `max-width: 768px`.
21. **Tại sao `e.preventDefault()` trong form liên hệ?** → chặn form gửi đi và tải lại trang để JS tự kiểm tra và hiện lỗi [F4].
22. **Lọc loại và tìm kiếm chạy cùng nhau thế nào?** → lọc dùng thuộc tính `hidden`, tìm kiếm dùng `data-search-hidden`; thẻ chỉ hiện khi không bị cái nào ẩn [F3].
23. **Tìm kiếm có phân biệt hoa/thường không?** → không, vì cả chuỗi tìm và nội dung thẻ đều qua `.toLowerCase()` [F3].
24. **`novalidate` là gì?** → tắt kiểm tra mặc định của trình duyệt để dùng lỗi tự viết [F4].

---

# PHẦN H — CÂU HỎI CÒN MỞ (mình **không đoán**; bạn xác nhận hoặc kiểm tra trước buổi demo)

Phần nào mình chỉ đọc code mà không biết ý đồ của bạn thì ghi ở đây.

**Đã chốt:** lý do dùng `inset box-shadow` chỉ là "không đổi kích thước hộp" (comment dòng 29), không có lý do nào khác. `line-height: 29px` lấy từ Figma. Timeline đứt đoạn là chủ ý. Đã sửa màu SVG thành `#334155`, đã bỏ `border-radius` của `.technology-tag`, đã dọn các dòng CSS thừa.

Còn mở:

2. **Viền avatar có thấy không?** Theo thứ tự vẽ CSS, ảnh phủ 100% có thể che viền inset của `.avatar`. Hãy mở DevTools → chọn `.avatar` để xem. Nếu viền thật sự biến mất, bạn muốn giữ vậy hay sửa?
3. **`8.3334vw`**: `120 ÷ 1440 = 8.3333…%`. Có phải bạn lấy từ thiết kế Figma 1440px (lề 120) rồi làm tròn lên để tại 1440 đạt đúng 120px?
9. **Dùng `px` thay vì `rem`**: có chủ ý theo Figma không? (Ảnh hưởng người dùng đổi cỡ chữ trình duyệt.)
10. **Hover menu mobile làm chữ dịch 16px** (`padding-inline: 16px` chỉ có khi hover/active): có chủ ý không?
11. **Hamburger → X không có `transition`**: chuyển tức thì; muốn mượt thì thêm `transition: transform .2s, opacity .2s` vào `.menu-icon span`.
12. **Yêu cầu của đề/thầy** (rubric, có cấm dùng thư viện, bắt buộc media query/Grid/Flex…) mình không có. Nếu có, gửi mình để đối chiếu và nhấn mạnh đúng phần.
