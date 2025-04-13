import { ScheduleManager, TaskManager } from './modules/data.js';
import { updateDateTime } from './modules/utils.js';

class StudentDashboard {
    constructor() {
        console.log("Aplikasi berjalan!");
        
        this.scheduleManager = new ScheduleManager();
        this.taskManager = new TaskManager();
        
        this.elements = {
            scheduleForm: document.getElementById('schedule-form'),
            scheduleList: document.getElementById('schedule-list'),
            taskForm: document.getElementById('task-form'),
            taskList: document.getElementById('task-list')
        };
        
        if (!this.elements.scheduleForm || !this.elements.taskForm) {
            console.error("Form elements not found!");
            return;
        }

        this.setupEventListeners();
        this.loadData();
    }

    setupEventListeners() {
        this.elements.scheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleScheduleSubmit();
        });
        
        this.elements.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleTaskSubmit();
        });
    }

    loadData() {
        this.renderSchedules();
        this.renderTasks();
    }

    handleScheduleSubmit() {
        const name = document.getElementById('course-name').value;
        const day = document.getElementById('course-day').value;
        const time = document.getElementById('course-time').value;
        const room = document.getElementById('course-room').value;

        this.scheduleManager.addClass(name, day, time, room);
        this.renderSchedules();
        this.elements.scheduleForm.reset();
        this.showNotification('Jadwal berhasil ditambahkan!');
    }

    handleTaskSubmit() {
        const title = document.getElementById('task-name').value;
        const course = document.getElementById('task-course').value;
        const deadline = document.getElementById('task-deadline').value;
        const priority = document.getElementById('task-priority').value;

        this.taskManager.addTask(title, deadline, priority);
        this.renderTasks();
        this.elements.taskForm.reset();
        this.showNotification('Tugas berhasil ditambahkan!');
    }

    renderSchedules() {
        this.elements.scheduleList.innerHTML = '';
        
        const schedules = this.scheduleManager.getSchedule();
        
        if (schedules.length === 0) {
            this.elements.scheduleList.innerHTML = '<p class="empty-message">Belum ada jadwal kuliah</p>';
            return;
        }
        
        schedules.forEach(schedule => {
            const element = document.createElement('div');
            element.className = 'card';
            element.innerHTML = `
                <h3>${schedule.name}</h3>
                <p>Hari: ${schedule.day}</p>
                <p>Jam: ${schedule.time}</p>
                <p>Ruangan: ${schedule.location}</p>
                <div class="actions">
                    <button class="edit-btn" data-id="${schedule.id}">✏️</button>
                    <button class="delete-btn" data-id="${schedule.id}">🗑️</button>
                </div>
            `;
            
            element.querySelector('.delete-btn').addEventListener('click', (e) => {
                this.scheduleManager.deleteClass(e.target.dataset.id);
                this.renderSchedules();
            });
            
            element.querySelector('.edit-btn').addEventListener('click', (e) => {
                const schedule = this.scheduleManager.getClassById(e.target.dataset.id);
                this.editSchedule(schedule);
            });
            
            this.elements.scheduleList.appendChild(element);
        });
    }

    renderTasks() {
        this.elements.taskList.innerHTML = '';
        
        const tasks = this.taskManager.getTasks();
        
        if (tasks.length === 0) {
            this.elements.taskList.innerHTML = '<p class="empty-message">Belum ada tugas</p>';
            return;
        }

        const sortedTasks = [...tasks].sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority] || 
                   new Date(a.deadline) - new Date(b.deadline);
        });

        sortedTasks.forEach(task => {
            const element = document.createElement('div');
            element.className = `card ${task.completed ? 'completed' : ''}`;
            element.innerHTML = `
                <h3>${task.title}</h3>
                <p>Mata Kuliah: ${task.course || '-'}</p>
                <p>Deadline: ${new Date(task.deadline).toLocaleDateString('id-ID')}</p>
                <span class="priority ${task.priority}">${this.getPriorityLabel(task.priority)}</span>
                <div class="actions">
                    <button class="complete-btn" data-id="${task.id}">${task.completed ? '✅' : '⬜'}</button>
                    <button class="edit-btn" data-id="${task.id}">✏️</button>
                    <button class="delete-btn" data-id="${task.id}">🗑️</button>
                </div>
            `;
            
            element.querySelector('.delete-btn').addEventListener('click', (e) => {
                this.taskManager.deleteTask(e.target.dataset.id);
                this.renderTasks();
            });
            
            element.querySelector('.edit-btn').addEventListener('click', (e) => {
                const task = this.taskManager.getTaskById(e.target.dataset.id);
                this.editTask(task);
            });
            
            element.querySelector('.complete-btn').addEventListener('click', (e) => {
                this.taskManager.toggleTaskComplete(e.target.dataset.id);
                this.renderTasks();
            });
            
            this.elements.taskList.appendChild(element);
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
        document.getElementById('course-room').value = schedule.location;
        this.scheduleManager.deleteClass(schedule.id);
    }

    editTask(task) {
        document.getElementById('task-name').value = task.title;
        document.getElementById('task-course').value = task.course || '';
        document.getElementById('task-deadline').value = task.deadline;
        document.getElementById('task-priority').value = task.priority;
        this.taskManager.deleteTask(task.id);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StudentDashboard();
});