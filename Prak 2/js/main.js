import { updateDateTime } from './modules/utils.js';

class StudentDashboard {
    constructor() {
        this.scheduleManager = new ScheduleManager();
        this.initElements();
        this.setupEventListeners();
        this.loadData();
        this.startClock();
    }

    initElements() {
        this.elements = {
            scheduleForm: document.getElementById('schedule-form'),
            scheduleList: document.getElementById('schedule-list'),
            taskForm: document.getElementById('task-form'),
            taskList: document.getElementById('task-list'),
            datetime: document.getElementById('datetime')
        };
    }

    loadData() {
        this.scheduleManager.loadSchedules();
        this.scheduleManager.loadTasks();
        this.renderSchedules();
        this.renderTasks();
    }

    startClock() {
        updateDateTime(this.elements.datetime);
        setInterval(() => updateDateTime(this.elements.datetime), 1000);
    }

    setupEventListeners() {
        this.elements.scheduleForm.addEventListener('submit', (e) => this.handleScheduleSubmit(e));
        this.elements.taskForm.addEventListener('submit', (e) => this.handleTaskSubmit(e));
    }

    handleScheduleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.elements.scheduleForm);
        
        const schedule = {
            name: formData.get('course-name'),
            day: formData.get('course-day'),
            time: formData.get('course-time'),
            room: formData.get('course-room'),
            id: Date.now().toString()
        };

        this.scheduleManager.addSchedule(schedule);
        this.renderSchedules();
        this.elements.scheduleForm.reset();
        this.showNotification('Jadwal berhasil ditambahkan!');
    }

    handleTaskSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.elements.taskForm);
        
        const task = {
            name: formData.get('task-name'),
            course: formData.get('task-course'),
            deadline: formData.get('task-deadline'),
            priority: formData.get('task-priority'),
            id: Date.now().toString(),
            completed: false
        };

        this.scheduleManager.addTask(task);
        this.renderTasks();
        this.elements.taskForm.reset();
        this.showNotification('Tugas berhasil ditambahkan!');
    }

    renderSchedules() {
        this.elements.scheduleList.innerHTML = '';
        
        if (this.scheduleManager.schedules.length === 0) {
            this.elements.scheduleList.innerHTML = '<p class="empty-message">Belum ada jadwal kuliah</p>';
            return;
        }
        
        this.scheduleManager.schedules.forEach(schedule => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.id = schedule.id;
            card.innerHTML = `
                <h3>${schedule.name}</h3>
                <p>Hari: ${schedule.day}</p>
                <p>Jam: ${schedule.time}</p>
                <p>Ruangan: ${schedule.room}</p>
                <div class="actions">
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">🗑️</button>
                </div>
            `;
            
            card.querySelector('.delete-btn').addEventListener('click', () => {
                this.scheduleManager.deleteSchedule(schedule.id);
                this.renderSchedules();
            });
            
            card.querySelector('.edit-btn').addEventListener('click', () => {
                this.editSchedule(schedule);
            });
            
            this.elements.scheduleList.appendChild(card);
        });
    }

    renderTasks() {
        this.elements.taskList.innerHTML = '';
        
        if (this.scheduleManager.tasks.length === 0) {
            this.elements.taskList.innerHTML = '<p class="empty-message">Belum ada tugas</p>';
            return;
        }

        const sortedTasks = [...this.scheduleManager.tasks].sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            return new Date(a.deadline) - new Date(b.deadline);
        });

        sortedTasks.forEach(task => {
            const card = document.createElement('div');
            card.className = `card ${task.completed ? 'completed' : ''}`;
            card.dataset.id = task.id;
            
            const deadlineDate = new Date(task.deadline);
            const formattedDeadline = deadlineDate.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            card.innerHTML = `
                <h3>${task.name}</h3>
                <p>Mata Kuliah: ${task.course}</p>
                <p>Deadline: ${formattedDeadline}</p>
                <span class="priority ${task.priority}">${this.getPriorityLabel(task.priority)}</span>
                <div class="actions">
                    <button class="complete-btn">${task.completed ? '✅' : '⬜'}</button>
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">🗑️</button>
                </div>
            `;
            
            card.querySelector('.delete-btn').addEventListener('click', () => {
                this.scheduleManager.deleteTask(task.id);
                this.renderTasks();
            });
            
            card.querySelector('.edit-btn').addEventListener('click', () => {
                this.editTask(task);
            });
            
            card.querySelector('.complete-btn').addEventListener('click', () => {
                task.completed = !task.completed;
                this.scheduleManager.updateTask(task);
                this.renderTasks();
            });
            
            this.elements.taskList.appendChild(card);
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    getPriorityLabel(priority) {
        const labels = {
            high: 'Prioritas Tinggi',
            medium: 'Prioritas Sedang',
            low: 'Prioritas Rendah'
        };
        return labels[priority] || priority;
    }

    editSchedule(schedule) {
        document.getElementById('course-name').value = schedule.name;
        document.getElementById('course-day').value = schedule.day;
        document.getElementById('course-time').value = schedule.time;
        document.getElementById('course-room').value = schedule.room;
        this.scheduleManager.deleteSchedule(schedule.id);
    }

    editTask(task) {
        document.getElementById('task-name').value = task.name;
        document.getElementById('task-course').value = task.course;
        document.getElementById('task-deadline').value = task.deadline;
        document.getElementById('task-priority').value = task.priority;
        this.scheduleManager.deleteTask(task.id);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StudentDashboard();
});