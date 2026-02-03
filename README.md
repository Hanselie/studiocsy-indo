# studiocsy-indo

Ringkasan: repo ini menyimpan situs statis Studio CSY Indo. File video besar ditempatkan menggunakan Git LFS.

## Penting — Git LFS
Beberapa file video besar (MP4) disimpan dengan Git LFS. Untuk mendapatkan file video penuh setelah clone, jalankan:

```bash
git clone https://github.com/Hanselie/studiocsy-indo.git
cd studiocsy-indo
git lfs install
git lfs pull
```

Tanpa `git lfs pull` Anda akan mendapatkan pointer LFS, bukan isi video.

## Deploy / Hosting
- Jika Anda menggunakan GitHub Pages: Git LFS tidak selalu disajikan langsung oleh Pages. Untuk keandalan, unggah video ke CDN atau platform video (YouTube/Vimeo/S3/Cloudflare) dan gunakan URL publik atau embed di file `sections/portofolio.html`.
- Jika Anda deploy ke server yang Anda kontrol: pastikan pipeline deployment menjalankan `git lfs pull` sehingga file MP4 tersedia di direktori `assets/portofolio/`.

Contoh tag `<video>` untuk file video publik:

```html
<video controls>
  <source src="https://cdn.example.com/videos/vid-01.mp4" type="video/mp4">
</video>
```

Contoh embed YouTube:

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

## Catatan lain
- Lokasi file di repo: `assets/portofolio/vid-01.mp4` ... `vid-04.mp4` (path tetap sama).
- Untuk kontributor: sertakan instruksi `git lfs install` dan `git lfs pull` sebelum menjalankan atau membangun situs.

Jika Anda mau, saya bisa:
- Mengubah `sections/portofolio.html` agar menggunakan embed/CDN URL, bila Anda berikan link, atau
- Menambahkan instruksi deploy di CI (contoh GitHub Actions) yang menjalankan `git lfs pull`.
