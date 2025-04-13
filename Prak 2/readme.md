Aplikasi Activity Dashboard adalah platform manajemen jadwal kuliah dan tugas harian untuk mahasiswa. Aplikasi ini memungkinkan pengguna untuk:

- Mencatat jadwal kuliah harian/mingguan
- Mengelola daftar tugas dengan prioritas
- Menandai tugas yang sudah selesai
- Menyimpan semua data secara lokal di browser

Fitur Utama
- Manajemen Jadwal Kuliah
- Tambah, edit, hapus jadwal kuliah
- Tampilan terorganisir berdasarkan hari
- Manajemen Tugas
- Sistem prioritas (tinggi, sedang, rendah)
- Penanda tugas selesai
- Sorting otomatis berdasarkan prioritas dan deadline
- Fitur Tambahan
- Penyimpanan lokal menggunakan localStorage
- Notifikasi interaktif
- Tampilan dark mode
- Responsive design

![image](https://github.com/user-attachments/assets/6012e4b2-b4e6-4eb2-89e2-965785e8ba9b)

Tampilan Utama Aplikasi

Teknologi & Fitur ES6+ yang Digunakan
- Classes:
class StudentDashboard {
  constructor() {
    // inisialisasi
  }
}

- Arrow Functions:
const showNotification = () => {
  // implementasi
};

- Template Literals:
card.innerHTML = `<h3>${task.name}</h3>`;

- Modules:
import { ScheduleManager } from './modules/data.js';

- Destructuring Assignment:
const { scheduleForm, taskForm } = this.elements;

- Spread Operator:
const sortedTasks = [...this.scheduleManager.tasks].sort();

- Async/Await (untuk clock):
async updateDateTime() {
  // implementasi
}

- LocalStorage API:
localStorage.setItem('studentSchedules', JSON.stringify(data));
