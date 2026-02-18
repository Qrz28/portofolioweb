# 🎨 Portfolio Website - Modern & Responsive

Portfolio website yang modern, elegan, dan fully responsive untuk siswa SMK dan anggota OSIS.

## ✨ Fitur Utama

### 🎯 Design Features

- ✅ Modern minimalist design dengan vintage color palette
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Smooth animations dan transitions
- ✅ Glassmorphism navbar dengan backdrop blur
- ✅ Dark mode ready structure

### 🚀 Animasi & Interaksi

- ✅ Scroll reveal animations
- ✅ Hero section entrance animations
- ✅ Card hover effects dengan 3D tilt (desktop only)
- ✅ Counter animation untuk stats
- ✅ Floating particles effect
- ✅ Cursor trail effect (desktop only)
- ✅ Button ripple effects

### 📱 Responsiveness

- ✅ Desktop optimized (1200px+)
- ✅ Tablet responsive (992px - 1199px)
- ✅ Mobile responsive (768px - 991px)
- ✅ Small phone optimized (< 480px)
- ✅ Performance optimized (animations disabled on mobile)

### ⚡ Performance

- ✅ Optimized animations untuk smooth 60fps
- ✅ Lazy loading ready
- ✅ Minimal external dependencies
- ✅ Debounced scroll events
- ✅ Mobile-friendly (no heavy effects on small devices)

## 📂 File Structure

```
portofolioweb/
├── index.html          # HTML structure
├── style.css           # Styling & responsive design
├── script.js           # Animations & interactions
├── README.md           # Panduan ini
└── TODO.md             # Daftar perbaikan yang sudah dilakukan
```

## 🎨 Sections

### 1. **Navbar**

- Fixed navigation dengan glassmorphism effect
- Mobile hamburger menu
- Active link indicator
- Smooth scroll anchor links

### 2. **Hero Section**

- Large heading dengan gradient text
- Call-to-action buttons
- Animated profile placeholder
- Scroll indicator
- Parallax effect (desktop only)

### 3. **About Section**

- Deskripsi singkat
- Stats counter dengan animasi
- Gradient styling

### 4. **OSIS Activities Section**

- Grid layout 6 cards
- Icon integration
- Smooth hover effects
- Responsive grid

### 5. **Projects & Achievements Section**

- Project showcase dengan image placeholder
- Tag categorization
- Responsive image sizing
- Staggered animations

### 6. **Contact Section**

- Contact information display
- Contact form dengan validation
- Form submission feedback
- Responsive two-column layout

### 7. **Footer**

- Social media links
- Logo & tagline
- Copyright notice
- Gradient top border

## 🎯 Cara Menggunakan

### Instalasi

1. **Ekstrak atau clone repository**

   ```bash
   cd portofolioweb
   ```

2. **Buka di browser (local - via Laragon atau HTTP server)**
   - Gunakan Laragon: Buka http://localhost/portofolioweb
   - Atau gunakan Python: `python -m http.server`

### Customization

#### 🔤 Teks dan Konten

1. **Update nama dan tagline**

   - Buka `index.html`
   - Cari dan ganti `[Nama Anda]` dengan nama Anda
   - Cari dan ganti `[Nama Sekolah]` dengan nama sekolah Anda
   - Cari dan ganti `[Jurusan]` dengan jurusan Anda

2. **Update stats**

   ```html
   <span class="stat-number">2+</span>
   <span class="stat-label">Tahun di OSIS</span>
   ```

   Sesuaikan angka dan label sesuai data Anda

3. **Tambah/edit aktivitas OSIS**

   ```html
   <div class="osis-card">
     <div class="osis-icon">
       <i class="fas fa-[icon-name]"></i>
     </div>
     <h3>Nama Aktivitas</h3>
     <p>Deskripsi aktivitas...</p>
   </div>
   ```

4. **Tambah/edit projek dan prestasi**
   ```html
   <div class="project-card">
     <div class="project-image">
       <i class="fas fa-[icon-name]"></i>
     </div>
     <div class="project-content">
       <span class="project-tag">Tag</span>
       <h3>Judul Projek</h3>
       <p>Deskripsi projek...</p>
     </div>
   </div>
   ```

#### 🌈 Warna & Styling

Warna dapat diubah di bagian `:root` dalam `style.css`:

```css
:root {
  --primary-color: #6b8e7b; /* Warna utama (sage green) */
  --secondary-color: #3d4852; /* Warna sekunder */
  --accent-color: #c4a77d; /* Warna aksen */
  --bg-primary: #f5f2eb; /* Background utama */
}
```

Ganti dengan warna favorit Anda (hex colors).

#### 👤 Foto Profil

1. Ganti emoji di profile placeholder dengan foto Anda
2. Ubah `.profile-placeholder` menjadi `<img>` tag:

   ```html
   <div class="profile-container">
     <img src="path/to/your/photo.jpg" alt="Profile" class="profile-image" />
   </div>
   ```

3. Tambahkan CSS untuk styling:
   ```css
   .profile-image {
     width: 380px;
     height: 380px;
     border-radius: 50%;
     object-fit: cover;
     box-shadow: var(--shadow-lg);
   }
   ```

#### 📧 Kontak

Update informasi kontak di section contact:

```html
<div class="contact-item">
  <div class="contact-icon">
    <i class="fas fa-envelope"></i>
  </div>
  <div class="contact-details">
    <h3>Email</h3>
    <p>your.email@example.com</p>
  </div>
</div>
```

#### 🔗 Social Media Links

Update footer social links:

```html
<div class="footer-social">
  <a href="https://instagram.com/yourusername"
    ><i class="fab fa-instagram"></i
  ></a>
  <a href="https://wa.me/62xxxxx"><i class="fab fa-whatsapp"></i></a>
  <a href="https://tiktok.com/@yourusername"><i class="fab fa-tiktok"></i></a>
  <a href="https://youtube.com/@yourchannel"><i class="fab fa-youtube"></i></a>
</div>
```

## 🎨 Color Palette

Tema yang digunakan: **Vintage Muted Colors**

| Warna          | Hex       | Penggunaan              |
| -------------- | --------- | ----------------------- |
| Sage Green     | `#6B8E7B` | Primary - Main color    |
| Dark Blue-Gray | `#3D4852` | Secondary - Text/Footer |
| Muted Gold     | `#C4A77D` | Accent - Highlights     |
| Warm Cream     | `#F5F2EB` | Background Primary      |
| Off-White      | `#FDFCFA` | Background Secondary    |

## 🚀 Performance Tips

1. **Optimize Images**: Gunakan format WebP untuk images
2. **Lazy Loading**: Tambahkan lazy loading untuk images
3. **Minify CSS/JS**: Minify untuk production
4. **CDN**: Host Font Awesome dari CDN (sudah dilakukan)
5. **Caching**: Enable browser caching

## 🌐 Deployment

### Upload ke Hosting

1. **Persiapan**

   - Pastikan semua file sudah lengkap (HTML, CSS, JS)
   - Test di browser sebelum upload

2. **Upload ke FTP/Host**

   - Upload semua file ke public_html folder
   - Pastikan struktur folder tetap sama
   - Test di live URL

3. **Domain**
   - Pointing domain ke hosting
   - Enable SSL certificate

## 🔧 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Device Testing

Tested & optimized untuk:

- Desktop (1920px, 1440px, 1366px, 1024px)
- Tablet (768px, 1024px iPad)
- Mobile (480px, 600px, 768px)

## 🎓 Educational Notes

Website ini dibuat untuk:

- Menampilkan portfolio pribadi
- Demonstrasi skill OSIS
- Dokumentasi prestasi & projek
- Contact hub untuk teman & guru

## ⚠️ Tips Penting

1. **Backup**: Selalu backup file sebelum edit
2. **Testing**: Test di berbagai devices sebelum publish
3. **Links**: Pastikan semua links bekerja dengan benar
4. **Speed**: Optimize images untuk faster loading
5. **SEO**: Customize meta tags untuk SEO lebih baik

## 🐛 Troubleshooting

### Navbar tidak responsive

- Clear browser cache
- Reload page dengan Ctrl+Shift+R

### Animasi lambat

- Disable heavy effects di browser settings
- Update browser ke versi terbaru

### Form tidak submit

- Check console untuk error messages
- Validasi HTML form elements

## 📄 License

Free to use for personal & educational purposes.

## 👤 Support

Untuk bantuan atau pertanyaan:

- Hubungi melalui form kontak di website
- Email: your.email@example.com

---

**Dibuat dengan ❤️ untuk siswa SMK & anggota OSIS**

_Last Updated: February 2024_
