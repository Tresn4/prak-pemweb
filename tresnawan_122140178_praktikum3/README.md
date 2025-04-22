Personal Book Management Application

Aplikasi React yang membantu pengguna melacak koleksi buku, progres membaca, dan wishlist.

Fitur : 
- Menambahkan buku baru dengan judul, penulis, dan status (owned/reading/wishlist)
- Mengedit informasi buku yang ada
- Menghapus buku dari koleksi
- Memfilter buku berdasarkan kategori status
- Mencari buku berdasarkan judul atau penulis
- Penyimpanan data menggunakan localStorage

Instalasi

Start the development server:
npm start

Open http://localhost:3000 in your browser

Screenshots
![image](https://github.com/user-attachments/assets/6e69d5c5-dfb3-4143-8b1b-a94ee905f17e)

![image](https://github.com/user-attachments/assets/65726e36-7cab-4519-a0f3-df6636878fbe)

![image](https://github.com/user-attachments/assets/bf513d5c-8cc8-46a6-897b-b1997f519de1)

React Features Used

Komponen :
- Komponen fungsional dengan Hooks
- Komponen UI yang dapat digunakan kembali (BookCard, BookFilter, SearchBar)
- Penanganan formulir dengan validasi

Manajemen State :
- Context API (BookContext) untuk state global
- useState untuk state komponen lokal
- useEffect untuk efek samping
