import { createApp } from 'https://unpkg.com/petite-vue@0.4.1?module'

// Hardcoded sample data (Sprint 1 — no persistence yet)
const SEED_TASKS = [
  { id: 1, title: 'Scrum Product Backlog', category: 'Project', deadline: '2026-11-10', student: 'Justin', done: false },
  { id: 2, title: 'Web Dev Quiz 4', category: 'Quiz', deadline: '2026-11-12', student: 'Timothy', done: false },
  { id: 3, title: 'Ethics Reflection Paper', category: 'Assignment', deadline: '2026-11-08', student: 'Aian', done: true },
  { id: 4, title: 'Data Structures Midterm', category: 'Exam', deadline: '2026-11-18', student: 'Timothy', done: false },
]

createApp({
  categories: ['Assignment', 'Project', 'Quiz', 'Exam', 'Other'],
  students: ['Justin', 'Aian', 'Timothy'],
  tasks: SEED_TASKS,
  form: { title: '', category: '', deadline: '', student: 'Timothy' },
  error: '',

  // US01–US03: validate and add a task
  addTask() {
    const { title, category, deadline } = this.form
    if (!title) return (this.error = 'Task title is required.')
    if (!category) return (this.error = 'Please select a category.')
    if (!deadline) return (this.error = 'Please set a deadline.')

    this.tasks.push({ id: Date.now(), ...this.form, done: false })
    this.form = { title: '', category: '', deadline: '', student: this.form.student }
    this.error = ''
  },

  // US05: mark complete / pending
  toggleDone(task) {
    task.done = !task.done
  },

  formatDate(iso) {
    return new Date(iso + 'T00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
  },
}).mount('#app')
