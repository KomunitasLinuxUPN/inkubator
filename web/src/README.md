# Demo Keamanan Web

Jika ingin pakai, silahkan buat database "inkubator" di MySQL lalu import file inkubator.sql.

Jangan lupa isi file .env (Bagian MySQL saja) dan sesuaikan dengan konfigurasi MySQL di laptop anda.

---

## Screenshot

<img src="https://i.ibb.co/2vMvx8g/Screenshot-2020-12-21-211032.png" alt="Screenshot aplikasi" border="0">

---

## Untuk Para Kontributor dan _Maintainer_

#### Tentang Ekstensi

- Dimohon untuk memasang Prettier di _text editor_ masing - masing. Untuk pengguna VSCode silakan memasang ekstensi Prettier yang tersedia di _marketplace_, lalu aktifkan opsi _"format on save"_ pada _setting_ VSCode anda.

- Dimohon untuk memasang ekstensi ESLint untuk pengguna VSCode, karena proyek ini menggunakan ESLint untuk menjaga kualitas dan konsistensi kode.

#### Tentang _commit_

- Dimohon untuk tidak melakukan _commit_ langsung ke _branch main_. Dimohon untuk membuat _branch_ baru untuk setiap pekerjaan anda, lalu _push_ branch tersebut ke _repository_ ini dan lakukan _pull request_ ke _branch main_.

---

## Panduan _Setup_ Lokal

```bash
# Install Dependencies
$ npm install

# Jalankan server di mode development dengan menggunakan nodemon
$ npm run dev

# Jalankan server di mode production dengan menggunakan perintah node
$ npm start
```

---

> Sebagian isi README mengutip dari README [web-pendaftaran-seed](https://github.com/pps-ti/web-pendaftaran-seed) milik Lab PPS-TI UPN "Veteran" Jawa Timur