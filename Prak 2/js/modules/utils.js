import { formatDate, getTodayName, isDueSoon } from "../app.js";

export const renderTasks = (tasks) => {
  const tasksList = document.getElementById("tasks-list");
  tasksList.innerHTML = "";

  if (tasks.length === 0) {
    tasksList.innerHTML =
      '<p class="empty-message">Tidak Ada Tugas, Masukkan Tugas Terlebih Dahulu!</p>';
    return;
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(a.deadline) - new Date(b.deadline);
  });

  sortedTasks.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item", `priority-${task.priority}`);
    if (task.completed) {
      taskElement.classList.add("completed");
    }

    const dueSoonClass = isDueSoon(task.deadline) ? "due-soon" : "";

    taskElement.innerHTML = `
            <div class="task-header">
                <span class="task-title">${task.title}</span>
                <div class="task-actions">
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${
                      task.id
                    }">Delete</button>
                </div>
            </div>
            <div class="task-details">
                <span class="task-deadline ${dueSoonClass}">Due: ${formatDate(
      task.deadline
    )}</span>
                <div class="task-priority" style="background-color: ${getPriorityColor(
                  task.priority
                )}">
                    ${
                      task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)
                    }
                </div>
            </div>
        `;

    tasksList.appendChild(taskElement);
  });
};

const getPriorityColor = (priority) => {
  const colors = {
    high: "#e74c3c",
    medium: "#f39c12",
    low: "#2ecc71",
  };
  return colors[priority] || "#3498db";
};

export const renderSchedule = (scheduleItems) => {
  const scheduleList = document.getElementById("schedule-list");
  scheduleList.innerHTML = "";

  if (scheduleItems.length === 0) {
    scheduleList.innerHTML =
      '<p class="empty-message">Tidak Ada Jadwal Kelas, Masukkan Jadwal Kelas Terlebih Dahulu!</p>';
    return;
  }

  const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const groupedByDay = {};

  dayOrder.forEach((day) => {
    groupedByDay[day] = [];
  });

  scheduleItems.forEach((item) => {
    if (groupedByDay[item.day]) {
      groupedByDay[item.day].push(item);
    }
  });

  for (const day in groupedByDay) {
    groupedByDay[day].sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
  }

  dayOrder.forEach((day) => {
    const dayItems = groupedByDay[day];
    if (dayItems.length === 0) return;

    const dayElement = document.createElement("div");
    dayElement.classList.add("day-container");
    if (day === getTodayName()) {
      dayElement.classList.add("today");
    }

    const dayHeader = document.createElement("h3");
    dayHeader.textContent = day.charAt(0).toUpperCase() + day.slice(1);
    dayHeader.style.marginBottom = "10px";
    dayHeader.style.color = "#4a6baf";
    dayHeader.style.fontWeight = "600";
    dayElement.appendChild(dayHeader);

    const dayList = document.createElement("ul");
    dayItems.forEach((classItem) => {
      const classElement = document.createElement("li");
      classElement.classList.add("schedule-item");

      const timeDisplay = new Date(
        `2000-01-01T${classItem.time}`
      ).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      classElement.innerHTML = `
                <div class="schedule-header">
                    <span class="class-name">${classItem.name}</span>
                    <div class="schedule-actions">
                        <button class="edit-btn" data-id="${classItem.id}">Edit</button>
                        <button class="delete-btn" data-id="${classItem.id}">Delete</button>
                    </div>
                </div>
                <div class="schedule-details">
                    <span class="class-time">⏰ ${timeDisplay}</span>
                    <span class="class-location">📍 ${classItem.location}</span>
                </div>
            `;

      dayList.appendChild(classElement);
    });

    dayElement.appendChild(dayList);
    scheduleList.appendChild(dayElement);
  });
};

export const renderNotes = (notes) => {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  if (notes.length === 0) {
    notesList.innerHTML =
      '<p class="empty-message">Tidak Ada Catatan, Masukkan Catatan Terlebih Dahulu!</p>';
    return;
  }

  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  sortedNotes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note-item");

    const formattedContent = note.content
      .split("\n")
      .filter((paragraph) => paragraph.trim() !== "")
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");

    const createdDate = new Date(note.createdAt);
    const dateFormatted = createdDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    noteElement.innerHTML = `
            <div class="note-header">
                <span class="note-title">${note.title}</span>
                <div class="note-actions">
                    <button class="edit-btn" data-id="${note.id}">Edit</button>
                    <button class="delete-btn" data-id="${note.id}">Delete</button>
                </div>
            </div>
            <small style="display: block; margin-bottom: 8px; color: #999;">Created: ${dateFormatted}</small>
            <div class="note-content">${formattedContent}</div>
        `;

    notesList.appendChild(noteElement);
  });
};

export const showNotification = (message, type = "info") => {
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => {
    notification.remove();
  });

  const notification = document.createElement("div");
  notification.classList.add("notification", `notification-${type}`);
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("hide");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
};

export const setButtonLoading = (button, isLoading) => {
  if (isLoading) {
    button.classList.add("loading");
    button.disabled = true;
  } else {
    button.classList.remove("loading");
    button.disabled = false;
  }
};