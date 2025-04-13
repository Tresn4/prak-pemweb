class StorageManager {
    constructor(storageKey) {
      this.storageKey = storageKey;
    }
  
    generateId = () => {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };
  
    getData = () => {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    };
  
    saveData = (data) => {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    };
  }
  
  export class TaskManager extends StorageManager {
    constructor() {
      super("studentDashboard_tasks");
    }
  
    getTasks = () => {
      return this.getData();
    };
  
    getTaskById = (id) => {
      const tasks = this.getTasks();
      return tasks.find((task) => task.id === id);
    };
  
    addTask = (title, deadline, priority) => {
      const tasks = this.getTasks();
      const newTask = {
        id: this.generateId(),
        title,
        deadline,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      };
  
      tasks.push(newTask);
      this.saveData(tasks);
      return newTask;
    };
  
    updateTask = (id, updates) => {
      let tasks = this.getTasks();
      tasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );
  
      this.saveData(tasks);
    };
  
    deleteTask = (id) => {
      let tasks = this.getTasks();
      tasks = tasks.filter((task) => task.id !== id);
  
      this.saveData(tasks);
    };
  
    toggleTaskComplete = (id) => {
      const task = this.getTaskById(id);
      if (task) {
        this.updateTask(id, { completed: !task.completed });
      }
    };
  }
  
  export class ScheduleManager extends StorageManager {
    constructor() {
      super("studentDashboard_schedule");
    }
  
    getSchedule = () => {
      return this.getData();
    };
  
    getClassById = (id) => {
      const schedule = this.getSchedule();
      return schedule.find((classItem) => classItem.id === id);
    };
  
    addClass = (name, day, time, location) => {
      const schedule = this.getSchedule();
      const newClass = {
        id: this.generateId(),
        name,
        day,
        time,
        location,
        createdAt: new Date().toISOString(),
      };
  
      schedule.push(newClass);
      this.saveData(schedule);
      return newClass;
    };
  
    updateClass = (id, updates) => {
      let schedule = this.getSchedule();
      schedule = schedule.map((classItem) =>
        classItem.id === id ? { ...classItem, ...updates } : classItem
      );
  
      this.saveData(schedule);
    };
  
    deleteClass = (id) => {
      let schedule = this.getSchedule();
      schedule = schedule.filter((classItem) => classItem.id !== id);
  
      this.saveData(schedule);
    };
  
    getClassesByDay = (day) => {
      const schedule = this.getSchedule();
      return schedule.filter((classItem) => classItem.day === day);
    };
  }
  
  export class NoteManager extends StorageManager {
    constructor() {
      super("studentDashboard_notes");
    }
  
    getNotes = () => {
      return this.getData();
    };
  
    getNoteById = (id) => {
      const notes = this.getNotes();
      return notes.find((note) => note.id === id);
    };
  
    addNote = (title, content) => {
      const notes = this.getNotes();
      const newNote = {
        id: this.generateId(),
        title,
        content,
        createdAt: new Date().toISOString(),
      };
  
      notes.push(newNote);
      this.saveData(notes);
      return newNote;
    };
  
    updateNote = (id, updates) => {
      let notes = this.getNotes();
      notes = notes.map((note) =>
        note.id === id ? { ...note, ...updates } : note
      );
  
      this.saveData(notes);
    };
  
    deleteNote = (id) => {
      let notes = this.getNotes();
      notes = notes.filter((note) => note.id !== id);
  
      this.saveData(notes);
    };
  }