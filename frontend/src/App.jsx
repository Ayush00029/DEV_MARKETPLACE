import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  Loader2,
  Search,
  Code2,
} from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCard from './components/ProjectCard'
import AuthSection from './components/AuthSection'
import ProjectForm from './components/ProjectForm'
import AdminDashboard from './components/AdminDashboard'
import MyProjectsList from './components/MyProjectsList'
import CheckoutPage from './components/CheckoutPage'

const API_BASE = import.meta.env.VITE_API_URL || '/api'
const projectCategories = ['Full Stack', 'Frontend', 'Backend', 'AI', 'Mobile App', 'UI Kit', 'API']

const fallbackProjects = [
  {
    _id: 'sample-1',
    title: 'SaaS Analytics Dashboard',
    description:
      'A responsive admin dashboard with revenue charts, cohort metrics, and subscription reporting screens.',
    techStack: 'React, Node.js, MongoDB, Chart.js',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    price: 79,
    category: 'Full Stack',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    owner: { name: 'Marketplace Studio' },
  },
  {
    _id: 'sample-2',
    title: 'AI Portfolio Builder',
    description:
      'A polished portfolio generator with project import, theme presets, and deploy-ready static output.',
    techStack: 'Next.js, Tailwind, OpenAI API',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    price: 129,
    category: 'AI',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    owner: { name: 'Ayush Dev' },
  },
  {
    _id: 'sample-3',
    title: 'Restaurant Ordering App',
    description:
      'Full ordering flow with menu management, checkout UI, kitchen status board, and mobile-first screens.',
    techStack: 'MERN, Stripe, JWT',
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
    price: 99,
    category: 'Full Stack',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
    owner: { name: 'Launch Kit' },
  },
]

const emptyProject = {
  title: '',
  description: '',
  techStack: '',
  githubLink: '',
  liveLink: '',
  price: '',
  category: projectCategories[0],
  image: '',
  status: 'In Progress',
  progress: 0,
}

function App() {
  const [projects, setProjects] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [projectForm, setProjectForm] = useState(emptyProject)
  const [user, setUser] = useState(() => readStoredUser())
  const [loading, setLoading] = useState(true)
  const [savingProject, setSavingProject] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(() => {
    const stored = localStorage.getItem('dev_marketplace_user')
    return stored ? 'marketplace' : 'auth'
  })
  const [cart, setCart] = useState([])

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    if (user?.role === 'admin' && (currentPage === 'projects' || currentPage === 'checkout')) {
      setCurrentPage('marketplace')
    }
  }, [user, currentPage])

  async function loadProjects() {
    setLoading(true)
    setError('')
    try {
      const data = await api('/projects')
      setProjects(Array.isArray(data) ? data : [])
    } catch {
      setProjects(fallbackProjects)
      setNotice('Showing sample projects until the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const categories = useMemo(() => {
    const names = projects.map((project) => project.category).filter(Boolean)
    return ['All', ...Array.from(new Set(names))]
  }, [projects])

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesCategory = category === 'All' || project.category === category
      const searchable = [
        project.title,
        project.description,
        formatTechStack(project.techStack),
        project.category,
        project.owner?.name,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return matchesCategory && searchable.includes(normalizedQuery)
    })
  }, [category, projects, query])

  async function handleAuth(event) {
    event.preventDefault()
    setAuthLoading(true)
    setError('')
    setNotice('')

    try {
      if (authMode === 'register') {
        await api('/auth/register', {
          method: 'POST',
          body: {
            name: authForm.name,
            email: authForm.email,
            password: authForm.password,
          },
        })
      }

      const loggedInUser = await api('/auth/login', {
        method: 'POST',
        body: {
          email: authForm.email,
          password: authForm.password,
        },
      })

      const nextUser = {
        _id: loggedInUser._id,
        name: loggedInUser.name,
        email: loggedInUser.email,
        role: loggedInUser.role,
        token: loggedInUser.token,
      }
      localStorage.setItem('dev_marketplace_user', JSON.stringify(nextUser))
      setUser(nextUser)
      setAuthForm({ name: '', email: '', password: '' })
      setNotice(`Welcome, ${nextUser.name}.`)
      setCurrentPage('marketplace')
    } catch (err) {
      setError(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  async function handleCreateProject(event) {
    event.preventDefault()
    if (!user?.token) {
      setError('Please sign in before listing a project.')
      const accountSection = document.getElementById('account');
      if (accountSection) accountSection.scrollIntoView({ behavior: 'smooth' });
      return
    }

    setSavingProject(true)
    setError('')
    setNotice('')

    try {
      await api('/projects', {
        method: 'POST',
        token: user.token,
        body: {
          ...projectForm,
          price: Number(projectForm.price),
          techStack: splitTechStack(projectForm.techStack),
        },
      })
      setProjectForm(emptyProject)
      setNotice('Project listed successfully.')
      await loadProjects()
    } catch (err) {
      setError(err.message)
    } finally {
      setSavingProject(false)
    }
  }

  async function handleDeleteProject(projectId) {
    if (!user?.token || projectId.startsWith('sample-')) return
    setError('')
    setNotice('')

    try {
      await api(`/projects/${projectId}`, {
        method: 'DELETE',
        token: user.token,
      })
      setProjects((current) => current.filter((project) => project._id !== projectId))
      setNotice('Project deleted.')
    } catch (err) {
      setError(err.message)
    }
  }

  function handleAddToCart(project) {
    if (project._id.startsWith('sample-')) {
      setError('Cannot add mock sample projects to the cart. Please click the "Refresh" button or reload the page to load active listings from the database.');
      return;
    }
    setCart((prev) => {
      if (prev.some((item) => item._id === project._id)) return prev;
      return [...prev, project];
    });
    setNotice(`"${project.title}" added to shopping cart.`);
  }

  function handleRemoveFromCart(projectId) {
    setCart((prev) => prev.filter((item) => item._id !== projectId));
  }

  async function handlePlaceOrder(cartItems) {
    if (!user?.token) throw new Error("Authentication token is missing.");

    const promises = cartItems.map((item) =>
      api(`/projects/${item._id}/buy`, {
        method: 'POST',
        token: user.token,
      })
    );

    await Promise.all(promises);
    setCart([]);
    await loadProjects();
  }



  function handleLogout() {
    localStorage.removeItem('dev_marketplace_user')
    setUser(null)
    setCurrentPage('auth')
    setNotice('Signed out.')
  }

  function setAuthFormValue(key, value) {
    setAuthForm((current) => ({ ...current, [key]: value }))
  }

  function setProjectFormValue(key, value) {
    setProjectForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 selection:bg-primary-500/30">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} 
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
      />

      <main className="pt-16">
        {/* Status Messages */}
        {(error || notice) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 mt-6">
            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${
              error ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30' : 
              'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-100/50 dark:border-primary-900/20'
            }`}>
              <div className={`p-2 rounded-full ${error ? 'bg-red-100 dark:bg-red-900/40' : 'bg-primary-100 dark:bg-primary-900/40'}`}>
                {error ? <Loader2 size={18} className="rotate-45" /> : <CheckCircle2 size={18} />}
              </div>
              <p className="font-bold text-sm tracking-tight">{error || notice}</p>
            </div>
          </div>
        )}

        {/* Page 1: Auth Portal */}
        {(!user || currentPage === 'auth') && (
          <AuthSection 
            user={user}
            authMode={authMode}
            setAuthMode={setAuthMode}
            authForm={authForm}
            setAuthFormValue={setAuthFormValue}
            handleAuth={handleAuth}
            authLoading={authLoading}
            handleLogout={handleLogout}
          />
        )}

        {/* Page 2: Marketplace Dashboard */}
        {user && currentPage === 'marketplace' && (
          <>
            <Hero user={user} />

            <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4">
                    Explore
                  </span>
                  <h2 className="text-4xl font-extrabold tracking-tight">Marketplace</h2>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative group w-full sm:w-80">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                      <Search size={18} />
                    </div>
                    <input
                      className="w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all font-medium shadow-sm text-slate-900 dark:text-white"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search projects..."
                    />
                  </div>
                  <button 
                    type="button" 
                    className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
                    onClick={loadProjects}
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`px-6 py-3 rounded-xl text-sm font-black transition-all whitespace-nowrap border cursor-pointer ${
                      item === category 
                        ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/20' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary-600/50'
                    }`}
                    onClick={() => setCategory(item)}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="animate-spin text-primary-600 w-10 h-10" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard 
                      key={project._id}
                      project={project}
                      user={user}
                      onDelete={handleDeleteProject}
                      cart={cart}
                      onAddToCart={handleAddToCart}
                      fallbackImage={fallbackProjects[0].image}
                    />
                  ))}
                </div>
              )}

              {!filteredProjects.length && !loading && (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 border-dashed">
                  <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No projects found</h3>
                  <p className="text-slate-500">Try adjusting your search or filters.</p>
                </div>
              )}
            </section>

            {/* List Project (Sell) Area */}
            {user.role !== 'admin' && (
              <section id="sell" className="bg-slate-100 dark:bg-[#0b1120] py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <ProjectForm 
                    projectForm={projectForm}
                    setProjectFormValue={setProjectFormValue}
                    handleCreateProject={handleCreateProject}
                    savingProject={savingProject}
                    projectCategories={projectCategories}
                  />
                </div>
              </section>
            )}
          </>
        )}

        {/* Page 3: My Projects Console */}
        {user && currentPage === 'projects' && user.role !== 'admin' && (
          <MyProjectsList 
            projects={projects}
            user={user}
            onDelete={handleDeleteProject}
            fallbackImage={fallbackProjects[0].image}
          />
        )}

        {/* Admin Dashboard */}
        {user && currentPage === 'admin' && user.role === 'admin' && (
          <AdminDashboard user={user} onClose={() => setCurrentPage('marketplace')} />
        )}

        {/* Secure Checkout Sequence */}
        {user && currentPage === 'checkout' && user.role !== 'admin' && (
          <CheckoutPage 
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={setCurrentPage}
          />
        )}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 dark:bg-slate-100 p-1 rounded text-white dark:text-slate-900">
              <Code2 size={16} />
            </div>
            <span className="text-slate-900 dark:text-white font-black">DEV MARKETPLACE</span>
          </div>
          <p>© 2026 Dev Marketplace. Built for developers by developers.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper functions (same as before)
async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'Something went wrong.')
  }

  return payload
}

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('dev_marketplace_user'))
  } catch {
    return null
  }
}

function formatTechStack(techStack) {
  if (Array.isArray(techStack)) {
    return techStack.join(', ')
  }
  return techStack || ''
}

function splitTechStack(techStack) {
  return techStack
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export default App
