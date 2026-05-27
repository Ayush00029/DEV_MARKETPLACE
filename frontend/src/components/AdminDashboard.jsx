import React, { useState, useEffect } from "react";
import {
  Users,
  Layers,
  DollarSign,
  Shield,
  Trash2,
  ArrowLeft,
  Loader2,
  RefreshCw,
  FolderGit2,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const AdminDashboard = ({ user, onClose }) => {
  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'projects'
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // id of user/project currently being operated on
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      // Load Stats
      const statsRes = await fetch(`${API_BASE}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!statsRes.ok) throw new Error("Failed to load statistics.");
      const statsData = await statsRes.json();
      setStats(statsData);

      // Load Users
      const usersRes = await fetch(`${API_BASE}/admin/users`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!usersRes.ok) throw new Error("Failed to load users list.");
      const usersData = await usersRes.json();
      setUsersList(usersData);

      // Load Projects
      const projectsRes = await fetch(`${API_BASE}/projects`);
      if (!projectsRes.ok) throw new Error("Failed to load projects list.");
      const projectsData = await projectsRes.json();
      setProjectsList(projectsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    if (user?.token) {
      const initLoad = async () => {
        try {
          const statsRes = await fetch(`${API_BASE}/admin/stats`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const statsData = await statsRes.json();

          const usersRes = await fetch(`${API_BASE}/admin/users`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const usersData = await usersRes.json();

          const projectsRes = await fetch(`${API_BASE}/projects`);
          const projectsData = await projectsRes.json();

          if (active) {
            setStats(statsData);
            setUsersList(usersData);
            setProjectsList(projectsData);
            setLoading(false);
          }
        } catch (err) {
          if (active) {
            setError(err.message);
            setLoading(false);
          }
        }
      };

      initLoad();
    }
    return () => {
      active = false;
    };
  }, [user]);

  const handleToggleRole = async (userId) => {
    setError("");
    setSuccess("");
    setActionLoading(userId);
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update role.");

      setSuccess(data.message);
      // Update local state
      setUsersList((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: data.user.role } : u))
      );
      // Reload stats
      const statsRes = await fetch(`${API_BASE}/admin/stats`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? All their projects will also be deleted!")) {
      return;
    }
    setError("");
    setSuccess("");
    setActionLoading(userId);
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete user.");

      setSuccess(data.message);
      setUsersList((prev) => prev.filter((u) => u._id !== userId));
      // Refresh projects as well (cascade deleted)
      const projectsRes = await fetch(`${API_BASE}/projects`);
      const projectsData = await projectsRes.json();
      setProjectsList(projectsData);

      // Reload stats
      const statsRes = await fetch(`${API_BASE}/admin/stats`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    setError("");
    setSuccess("");
    setActionLoading(projectId);
    try {
      const res = await fetch(`${API_BASE}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete project.");

      setSuccess(data.message);
      setProjectsList((prev) => prev.filter((p) => p._id !== projectId));

      // Reload stats
      const statsRes = await fetch(`${API_BASE}/admin/stats`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-primary-600 transition-colors shadow-sm cursor-pointer"
            title="Back to Marketplace"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black rounded-full uppercase tracking-[0.2em] px-2.5 py-1 border border-primary-100/50 dark:border-primary-900/20">
                Administration Mode
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Admin Dashboard
            </h1>
          </div>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-3 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Alert Notices */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/20 flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 rounded-2xl bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/20 flex items-start gap-3">
          <CheckCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm font-bold">{success}</p>
        </div>
      )}

      {/* Statistics Cards */}
      {stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1: Users */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-5 hover:translate-y-[-2px] transition-all duration-300">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Users size={28} />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">
                Total Developers
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.totalUsers}
              </span>
            </div>
          </div>

          {/* Card 2: Projects */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-5 hover:translate-y-[-2px] transition-all duration-300">
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <Layers size={28} />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">
                Listed Projects
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.totalProjects}
              </span>
            </div>
          </div>

          {/* Card 3: Value */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-5 hover:translate-y-[-2px] transition-all duration-300">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
              <DollarSign size={28} />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">
                Marketplace Inventory
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                ${Number(stats.totalValue).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card 4: Categories */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-5 hover:translate-y-[-2px] transition-all duration-300">
            <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
              <FolderGit2 size={28} />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-wider">
                Active Categories
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.categories?.length || 0}
              </span>
            </div>
          </div>
        </div>
      ) : (
        loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary-600 w-8 h-8" />
          </div>
        )
      )}

      {/* Tabs and Workspace Panels */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 p-2 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 py-4 px-6 rounded-2xl text-sm font-black transition-all cursor-pointer ${
              activeTab === "users"
                ? "bg-white dark:bg-slate-800 text-primary-600 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            DEVELOPERS MANAGEMENT ({usersList.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-4 px-6 rounded-2xl text-sm font-black transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-white dark:bg-slate-800 text-primary-600 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            PROJECT MODERATION ({projectsList.length})
          </button>
        </div>

        {/* Tab Panels */}
        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary-600 w-12 h-12 mb-4" />
              <p className="text-slate-500 font-medium">Fetching administrative records...</p>
            </div>
          ) : activeTab === "users" ? (
            // Users Management Panel
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest pl-2">
                      Developer
                    </th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                      Email
                    </th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                      Role
                    </th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                      Joined Date
                    </th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right pr-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {usersList.map((usr) => (
                    <tr key={usr._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                      <td className="py-4 pl-2 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 text-primary-600 dark:text-primary-400 flex items-center justify-center font-black">
                          {usr.name?.charAt(0).toUpperCase()}
                        </div>
                        <span>{usr.name}</span>
                      </td>
                      <td className="py-4 text-slate-500 font-medium">
                        {usr.email}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            usr.role === "admin"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {usr.role}
                        </span>
                      </td>
                      <td className="py-4 text-slate-400 text-sm font-medium">
                        {new Date(usr.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-4 text-right pr-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleRole(usr._id)}
                            disabled={actionLoading !== null || usr._id === user._id}
                            className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer text-slate-500 hover:text-primary-600 disabled:opacity-50`}
                            title={
                              usr._id === user._id
                                ? "Cannot change your own role"
                                : `Toggle between Admin/User`
                            }
                          >
                            {actionLoading === usr._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Shield size={16} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(usr._id)}
                            disabled={actionLoading !== null || usr._id === user._id}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-all cursor-pointer text-slate-500 disabled:opacity-50"
                            title={
                              usr._id === user._id
                                ? "Cannot delete your own admin account"
                                : "Delete user and projects"
                            }
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {usersList.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-400">
                        No registered users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            // Projects Moderation Panel
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest pl-2">
                      Project
                    </th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                      Category
                    </th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                      Creator
                    </th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">
                      Price
                    </th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right pr-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {projectsList.map((proj) => (
                    <tr key={proj._id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                      <td className="py-4 pl-2 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="w-12 h-8 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden relative border border-slate-200 dark:border-slate-700 shrink-0">
                          {proj.image ? (
                            <img
                              src={proj.image}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : null}
                        </div>
                        <span className="line-clamp-1">{proj.title}</span>
                      </td>
                      <td className="py-4">
                        <span className="inline-block px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-wider rounded">
                          {proj.category}
                        </span>
                      </td>
                      <td className="py-4 text-slate-500 font-medium">
                        {proj.owner?.name || "Unknown"}
                      </td>
                      <td className="py-4 font-bold text-slate-900 dark:text-white">
                        ${Number(proj.price || 0).toLocaleString()}
                      </td>
                      <td className="py-4 text-right pr-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDeleteProject(proj._id)}
                            disabled={actionLoading !== null}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-all cursor-pointer text-slate-500 disabled:opacity-50"
                            title="Moderate/Remove Project"
                          >
                            {actionLoading === proj._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {projectsList.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-400">
                        No projects listed in the marketplace.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
