import { createApp } from 'https://unpkg.com/petite-vue@0.4.1?module'

const STORAGE_KEY = 'dlsud-stms-tasks'
const DAY = 86_400_000

// Hardcoded sample data — used on first load and when "Reset demo data" is clicked
const SEED_TASKS = [
  { id: 1, title: 'Scrum Product Backlog', category: 'Project', deadline: '2026-11-10', student: 'Justin', done: false },
  { id: 2, title: 'Web Dev Quiz 4', category: 'Quiz', deadline: '2026-11-12', student: 'Timothy', done: false },
  { id: 3, title: 'Ethics Reflection Paper', category: 'Assignment', deadline: '2026-11-08', student: 'Aian', done: true },
  { id: 4, title: 'Data Structures Midterm', category: 'Exam', deadline: '2026-11-18', student: 'Timothy', done: false },
  { id: 5, title: 'Sprint Review Slides', category: 'Project', deadline: '2026-11-14', student: 'Aian', done: false },
  { id: 6, title: 'Statistics Problem Set 2', category: 'Assignment', deadline: '2026-11-09', student: 'Justin', done: true },
  { id: 7, title: 'Philippine History Quiz', category: 'Quiz', deadline: '2026-11-04', student: 'Aian', done: false },
  { id: 8, title: 'NSTP Community Report', category: 'Other', deadline: '2026-11-20', student: 'Justin', done: false },
  { id: 9, title: 'UI Wireframes for STMS', category: 'Project', deadline: '2026-11-07', student: 'Timothy', done: false },
]

// US12: Local Storage helpers
const clone = (data) => JSON.parse(JSON.stringify(data))
const load = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') ?? clone(SEED_TASKS)
const save = (tasks) => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))

const emptyForm = (student = 'Timothy') => ({ title: '', category: '', deadline: '', student })
const today = () => new Date(new Date().toDateString()).getTime()
const daysLeft = (iso) => Math.round((new Date(iso + 'T00:00').getTime() - today()) / DAY)

createApp({
  categories: ['Assignment', 'Project', 'Quiz', 'Exam', 'Other'],
  students: ['Justin', 'Aian', 'Timothy'],
  statuses: ['All', 'Pending', 'Completed', 'Overdue'],
  tasks: load(),
  form: emptyForm(),
  editingId: null,
  errors: {},
  search: '',
  categoryFilter: '',
  studentFilter: '',
  statusFilter: 'All',
  sortBy: 'deadline',
  toast: '',

  // US08, US09, US15 + status tabs, US13 sorting
  get visibleTasks() {
    const q = this.search.trim().toLowerCase()
    const list = this.tasks.filter((t) =>
      (t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) &&
      (!this.categoryFilter || t.category === this.categoryFilter) &&
      (!this.studentFilter || t.student === this.studentFilter) &&
      this.matchesStatus(t)
    )
    const sorters = {
      deadline: (a, b) => a.deadline.localeCompare(b.deadline),
      title: (a, b) => a.title.localeCompare(b.title),
      newest: (a, b) => b.id - a.id,
    }
    // Pending tasks first, completed tasks sink to the bottom
    return list.sort((a, b) => a.done - b.done || sorters[this.sortBy](a, b))
  },

  // US10: statistics
  get pendingCount() { return this.tasks.filter((t) => !t.done).length },
  get completedCount() { return this.tasks.filter((t) => t.done).length },
  get overdueCount() { return this.tasks.filter((t) => this.isOverdue(t)).length },
  get progress() {
    return this.tasks.length ? Math.round((this.completedCount / this.tasks.length) * 100) : 0
  },

  matchesStatus(t) {
    return {
      All: true,
      Pending: !t.done,
      Completed: t.done,
      Overdue: this.isOverdue(t),
    }[this.statusFilter]
  },

  // US14: deadline helpers
  isOverdue(t) { return !t.done && daysLeft(t.deadline) < 0 },
  dueLabel(t) {
    if (t.done) return 'Done'
    const d = daysLeft(t.deadline)
    if (d < 0) return `${-d} day${d === -1 ? '' : 's'} overdue`
    if (d === 0) return 'Due today'
    if (d === 1) return 'Due tomorrow'
    return `${d} days left`
  },
  dueClass(t) {
    if (t.done) return 'text-slate-400'
    const d = daysLeft(t.deadline)
    if (d < 0) return 'text-red-600 font-medium'
    if (d <= 2) return 'text-amber-600 font-medium'
    return 'text-slate-500'
  },

  // US01–US03 validation
  validate() {
    const e = {}
    if (!this.form.title) e.title = 'Task title is required.'
    if (!this.form.category) e.category = 'Please select a category.'
    if (!this.form.deadline) e.deadline = 'Please set a deadline.'
    this.errors = e
    return !Object.keys(e).length
  },

  // US01 + US06: add or update a task
  submitTask() {
    if (!this.validate()) return
    if (this.editingId) {
      Object.assign(this.tasks.find((t) => t.id === this.editingId), this.form)
      this.notify('Task updated.')
    } else {
      this.tasks.push({ id: Date.now(), ...this.form, done: false })
      this.notify('Task added.')
    }
    this.resetForm()
    this.persist()
  },

  // US06: load a task into the form
  editTask(task) {
    this.editingId = task.id
    this.form = { title: task.title, category: task.category, deadline: task.deadline, student: task.student }
    this.errors = {}
    document.getElementById('title').focus()
  },

  // US07: delete with confirmation
  deleteTask(task) {
    if (!confirm(`Delete "${task.title}"?`)) return
    this.tasks = this.tasks.filter((t) => t.id !== task.id)
    if (this.editingId === task.id) this.resetForm()
    this.persist()
    this.notify('Task deleted.')
  },

  // US05: mark complete / pending
  toggleDone(task) {
    task.done = !task.done
    this.persist()
  },

  resetForm() {
    this.form = emptyForm(this.form.student)
    this.editingId = null
    this.errors = {}
  },

  resetDemo() {
    if (!confirm('Restore the sample tasks? Your changes will be replaced.')) return
    this.tasks = clone(SEED_TASKS)
    this.resetForm()
    this.persist()
    this.notify('Sample data restored.')
  },

  persist() { save(this.tasks) },

  notify(msg) {
    this.toast = msg
    clearTimeout(this._t)
    this._t = setTimeout(() => (this.toast = ''), 2000)
  },

  initials: (name) => name[0],
  formatDate(iso) {
    return new Date(iso + 'T00:00').toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })
  },
}).mount('#app')
