import { createApp } from 'https://unpkg.com/petite-vue@0.4.1?module'

const STORAGE_KEY = 'dlsud-stms-tasks'

// Hardcoded sample data — used only on first load (before anything is saved)
const SEED_TASKS = [
  { id: 1, title: 'Scrum Product Backlog', category: 'Project', deadline: '2026-11-10', student: 'Justin', done: false },
  { id: 2, title: 'Web Dev Quiz 4', category: 'Quiz', deadline: '2026-11-12', student: 'Timothy', done: false },
  { id: 3, title: 'Ethics Reflection Paper', category: 'Assignment', deadline: '2026-11-08', student: 'Aian', done: true },
  { id: 4, title: 'Data Structures Midterm', category: 'Exam', deadline: '2026-11-18', student: 'Timothy', done: false },
  { id: 5, title: 'Sprint Review Slides', category: 'Project', deadline: '2026-11-14', student: 'Aian', done: false },
  { id: 6, title: 'Statistics Problem Set 2', category: 'Assignment', deadline: '2026-11-09', student: 'Justin', done: true },
]

// US12: Local Storage helpers
const load = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') ?? SEED_TASKS
const save = (tasks) => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))

const emptyForm = (student = 'Timothy') => ({ title: '', category: '', deadline: '', student })

createApp({
  categories: ['Assignment', 'Project', 'Quiz', 'Exam', 'Other'],
  students: ['Justin', 'Aian', 'Timothy'],
  tasks: load(),
  form: emptyForm(),
  editingId: null,
  error: '',
  search: '',
  categoryFilter: '',

  // US08 + US09: search and category filter
  get visibleTasks() {
    const q = this.search.toLowerCase()
    return this.tasks.filter(
      (t) => t.title.toLowerCase().includes(q) && (!this.categoryFilter || t.category === this.categoryFilter)
    )
  },

  // US10: statistics
  get pendingCount() { return this.tasks.filter((t) => !t.done).length },
  get completedCount() { return this.tasks.filter((t) => t.done).length },

  // US01–US03 + US06: add or update a task
  submitTask() {
    const { title, category, deadline } = this.form
    if (!title) return (this.error = 'Task title is required.')
    if (!category) return (this.error = 'Please select a category.')
    if (!deadline) return (this.error = 'Please set a deadline.')

    if (this.editingId) {
      const task = this.tasks.find((t) => t.id === this.editingId)
      Object.assign(task, this.form)
    } else {
      this.tasks.push({ id: Date.now(), ...this.form, done: false })
    }
    this.resetForm()
    this.persist()
  },

  // US06: load task into the form for editing
  editTask(task) {
    this.editingId = task.id
    this.form = { title: task.title, category: task.category, deadline: task.deadline, student: task.student }
    this.error = ''
  },

  // US07: delete a task
  deleteTask(task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id)
    if (this.editingId === task.id) this.resetForm()
    this.persist()
  },

  // US05: mark complete / pending
  toggleDone(task) {
    task.done = !task.done
    this.persist()
  },

  resetForm() {
    this.form = emptyForm(this.form.student)
    this.editingId = null
    this.error = ''
  },

  persist() { save(this.tasks) },

  formatDate(iso) {
    return new Date(iso + 'T00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
  },
}).mount('#app')
