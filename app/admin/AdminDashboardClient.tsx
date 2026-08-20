"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit, Trash2, ExternalLink, Image as ImageIcon,
  Check, X, LogOut, Database, Layers, FolderKanban,
  Upload, Search, Copy, CheckCheck, RefreshCw, AlertCircle
} from 'lucide-react';
import {
  isSupabaseConfigured,
  fetchProjectsFromDB,
  insertProjectIntoDB,
  updateProjectInDB,
  deleteProjectFromDB,
  fetchServicesFromDB,
  insertServiceIntoDB,
  updateServiceInDB,
  deleteServiceFromDB,
  uploadPortfolioImage
} from '@/lib/supabaseClient';
import { Project } from '@/lib/projects';
import { ServiceData } from '@/app/services/seoServices';
import Link from 'next/link';

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'services'>('projects');
  const [dbConfigured, setDbConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState<Project>({
    id: '',
    title: '',
    category: 'CAD Design',
    description: '',
    image: '',
    size: 'large',
    year: '2024',
    client: '',
    tools: [],
    highlights: [],
  });
  const [toolsInput, setToolsInput] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Services State
  const [services, setServices] = useState<ServiceData[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState<ServiceData>({
    slug: '',
    title: '',
    description: '',
    keywords: [],
    tools: [],
    deliverables: [],
    longDescription: '',
    heroImage: '',
    faq: [],
  });
  const [serviceKeywordsInput, setServiceKeywordsInput] = useState('');
  const [serviceToolsInput, setServiceToolsInput] = useState('');
  const [serviceDeliverablesInput, setServiceDeliverablesInput] = useState('');
  const [faqInput, setFaqInput] = useState('');

  // SQL Modal
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    setDbConfigured(isSupabaseConfigured());
    loadAllData();
  }, []);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [projList, servList] = await Promise.all([
        fetchProjectsFromDB(),
        fetchServicesFromDB(),
      ]);
      setProjects(projList);
      setServices(servList);
    } catch {
      showStatus('error', 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  // ====================================================
  // PROJECT ACTIONS
  // ====================================================
  const openNewProjectModal = () => {
    setSelectedProject(null);
    setProjectForm({
      id: '',
      title: '',
      category: 'CAD Design',
      description: '',
      image: '',
      size: 'large',
      year: new Date().getFullYear().toString(),
      client: '',
      tools: [],
      highlights: [],
    });
    setToolsInput('SolidWorks, KeyShot');
    setHighlightsInput('High-precision tolerances\nProduction-ready CAD\nOptimized assembly');
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setSelectedProject(proj);
    setProjectForm({ ...proj });
    setToolsInput(proj.tools?.join(', ') || '');
    setHighlightsInput(proj.highlights?.join('\n') || '');
    setIsProjectModalOpen(true);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const { url, error } = await uploadPortfolioImage(file);
    setUploadingImage(false);

    if (url) {
      setProjectForm((prev) => ({ ...prev, image: url }));
      showStatus('success', 'Image uploaded successfully to Supabase Storage!');
    } else {
      // Local fallback for preview
      const localUrl = URL.createObjectURL(file);
      setProjectForm((prev) => ({ ...prev, image: localUrl }));
      showStatus('error', error || 'Failed to upload to Supabase bucket. Using local preview.');
    }
  };

  const handleServiceImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const { url, error } = await uploadPortfolioImage(file);
    setUploadingImage(false);

    if (url) {
      setServiceForm((prev) => ({ ...prev, heroImage: url }));
      showStatus('success', 'Service image uploaded successfully!');
    } else {
      const localUrl = URL.createObjectURL(file);
      setServiceForm((prev) => ({ ...prev, heroImage: localUrl }));
      showStatus('error', error || 'Failed to upload to Supabase bucket.');
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title) {
      showStatus('error', 'Project title is required');
      return;
    }

    // Generate slug from title if empty
    const slug = projectForm.id.trim()
      ? projectForm.id.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
      : projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const parsedTools = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const parsedHighlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const finalProject: Project = {
      ...projectForm,
      id: slug,
      tools: parsedTools,
      highlights: parsedHighlights,
    };

    if (selectedProject) {
      // Update
      const res = await updateProjectInDB(selectedProject.id, finalProject);
      if (res.success) {
        showStatus('success', `Project "${finalProject.title}" updated successfully!`);
        setIsProjectModalOpen(false);
        loadAllData();
      } else {
        showStatus('error', res.error || 'Failed to update project');
      }
    } else {
      // Insert
      const res = await insertProjectIntoDB(finalProject);
      if (res.success) {
        showStatus('success', `Project "${finalProject.title}" created successfully!`);
        setIsProjectModalOpen(false);
        loadAllData();
      } else {
        showStatus('error', res.error || 'Failed to create project');
      }
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    const res = await deleteProjectFromDB(id);
    if (res.success) {
      showStatus('success', `Deleted "${title}"`);
      loadAllData();
    } else {
      showStatus('error', res.error || 'Failed to delete project');
    }
  };

  // ====================================================
  // SERVICE ACTIONS
  // ====================================================
  const openNewServiceModal = () => {
    setSelectedService(null);
    setServiceForm({
      slug: '',
      title: '',
      description: '',
      keywords: [],
      tools: [],
      deliverables: [],
      longDescription: '',
      heroImage: '',
      faq: [],
    });
    setServiceKeywordsInput('CAD modeling, engineering design');
    setServiceToolsInput('SolidWorks, PTC Creo');
    setServiceDeliverablesInput('STEP, IGES, STL, PDF blueprints');
    setFaqInput('Q: What files do you deliver?\nA: STEP, IGES, STL, and PDF engineering drawings.');
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (serv: ServiceData) => {
    setSelectedService(serv);
    setServiceForm({ ...serv });
    setServiceKeywordsInput(serv.keywords?.join(', ') || '');
    setServiceToolsInput(serv.tools?.join(', ') || '');
    setServiceDeliverablesInput(serv.deliverables?.join(', ') || '');
    const formattedFaq = serv.faq
      ?.map((item) => `Q: ${item.question}\nA: ${item.answer}`)
      .join('\n\n') || '';
    setFaqInput(formattedFaq);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title) {
      showStatus('error', 'Service title is required');
      return;
    }

    const slug = serviceForm.slug.trim()
      ? serviceForm.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
      : serviceForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const parsedKeywords = serviceKeywordsInput.split(',').map((k) => k.trim()).filter(Boolean);
    const parsedTools = serviceToolsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const parsedDeliverables = serviceDeliverablesInput.split(',').map((d) => d.trim()).filter(Boolean);

    // Parse FAQ blocks (Q: ... A: ...)
    const parsedFaq: { question: string; answer: string }[] = [];
    const faqBlocks = faqInput.split(/\n\s*\n/);
    for (const block of faqBlocks) {
      const qMatch = block.match(/Q:\s*(.+)/i);
      const aMatch = block.match(/A:\s*([\s\S]+)/i);
      if (qMatch && aMatch) {
        parsedFaq.push({ question: qMatch[1].trim(), answer: aMatch[1].trim() });
      }
    }

    const finalService: ServiceData = {
      ...serviceForm,
      slug,
      keywords: parsedKeywords,
      tools: parsedTools,
      deliverables: parsedDeliverables,
      faq: parsedFaq,
    };

    if (selectedService) {
      const res = await updateServiceInDB(selectedService.slug, finalService);
      if (res.success) {
        showStatus('success', `Service "${finalService.title}" updated!`);
        setIsServiceModalOpen(false);
        loadAllData();
      } else {
        showStatus('error', res.error || 'Failed to update service');
      }
    } else {
      const res = await insertServiceIntoDB(finalService);
      if (res.success) {
        showStatus('success', `Service "${finalService.title}" created!`);
        setIsServiceModalOpen(false);
        loadAllData();
      } else {
        showStatus('error', res.error || 'Failed to create service');
      }
    }
  };

  const handleDeleteService = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete service "${title}"?`)) return;

    const res = await deleteServiceFromDB(slug);
    if (res.success) {
      showStatus('success', `Deleted service "${title}"`);
      loadAllData();
    } else {
      showStatus('error', res.error || 'Failed to delete service');
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* TOP STATUS & HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#090d16]/70 backdrop-blur-xl shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00d4ff] font-bold">Studio Admin Console</span>
              {dbConfigured ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Supabase Live
                </span>
              ) : (
                <button
                  onClick={() => setIsSqlModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-semibold hover:bg-amber-500/20 transition-colors"
                >
                  <AlertCircle className="w-3 h-3" />
                  Setup Supabase Database
                </button>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-black dark:text-white">
              Portfolio & Services Manager
            </h1>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={() => setIsSqlModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white transition-colors flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-[#00d4ff]" />
              Database SQL Script
            </button>
            <button
              onClick={loadAllData}
              disabled={loading}
              className="p-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white transition-colors"
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* TOAST / STATUS NOTIFICATION */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-2xl border text-sm font-medium flex items-center justify-between shadow-lg ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
              }`}
            >
              <div className="flex items-center gap-2">
                {statusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{statusMessage.text}</span>
              </div>
              <button onClick={() => setStatusMessage(null)} className="opacity-60 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TABS SELECTOR */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-black/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white shadow-md'
                  : 'bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              Portfolio Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white shadow-md'
                  : 'bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              Services ({services.length})
            </button>
          </div>

          <div>
            {activeTab === 'projects' ? (
              <button
                onClick={openNewProjectModal}
                className="px-5 py-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-md hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Add New Project
              </button>
            ) : (
              <button
                onClick={openNewServiceModal}
                className="px-5 py-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-md hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Add New Service
              </button>
            )}
          </div>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: PORTFOLIO PROJECTS MANAGER */}
        {/* ==================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, category, client..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-[#00d4ff]"
              />
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#090d16]/60 backdrop-blur-xl overflow-hidden shadow-md flex flex-col group hover:border-[#00d4ff]/40 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-black/5 dark:bg-white/5 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-black/30 dark:text-white/30 gap-2">
                        <ImageIcon className="w-8 h-8" />
                        <span className="text-xs">No image</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.year && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/80 dark:bg-black/80 text-black dark:text-white text-[10px] font-mono">
                        {project.year}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-black dark:text-white leading-snug line-clamp-2 mb-1.5">
                        {project.title}
                      </h3>
                      <p className="text-xs text-black/60 dark:text-white/60 line-clamp-2 mb-3">
                        {project.description}
                      </p>
                      {project.tools && project.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tools.slice(0, 3).map((tool) => (
                            <span
                              key={tool}
                              className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 text-[10px]"
                            >
                              {tool}
                            </span>
                          ))}
                          {project.tools.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50 text-[10px]">
                              +{project.tools.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                      <Link
                        href={`/portfolio/${project.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs text-[#00d4ff] hover:underline"
                      >
                        <span>View Page</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditProjectModal(project)}
                          className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] text-black/70 dark:text-white/70 transition-colors"
                          title="Edit project"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id, project.title)}
                          className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-black/70 dark:text-white/70 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: SERVICES MANAGER */}
        {/* ==================================================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service.slug}
                  className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#090d16]/60 backdrop-blur-xl p-6 shadow-md flex flex-col justify-between hover:border-[#00d4ff]/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#00d4ff]">
                          /services/{service.slug}
                        </span>
                        <h3 className="text-xl font-bold font-mono text-black dark:text-white mt-0.5">
                          {service.title}
                        </h3>
                      </div>
                      {service.heroImage && (
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex-shrink-0">
                          <img src={service.heroImage} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-black/60 dark:text-white/60 line-clamp-3 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="space-y-1 mb-4">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-black/50 dark:text-white/50 block">Deliverables</span>
                        <div className="flex flex-wrap gap-1">
                          {service.deliverables.map((d) => (
                            <span key={d} className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 text-[10px]">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-[#00d4ff] hover:underline"
                    >
                      <span>View Live Service Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditServiceModal(service)}
                        className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] text-black/70 dark:text-white/70 transition-colors"
                        title="Edit service"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.slug, service.title)}
                        className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-black/70 dark:text-white/70 transition-colors"
                        title="Delete service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ==================================================== */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-[#0b0f19] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-mono text-black dark:text-white">
                    {selectedProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
                  </h2>
                  <p className="text-xs text-black/50 dark:text-white/50">
                    Creates or updates the project in your Supabase database.
                  </p>
                </div>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. ORBAI Spherical Drone"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                      URL Slug / ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={projectForm.id}
                      onChange={(e) => setProjectForm({ ...projectForm, id: e.target.value })}
                      placeholder="auto-generated from title"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      placeholder="CAD Design, Medical, Product Design..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                      Client Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={projectForm.client || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                      placeholder="e.g. ORBAI Labs"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      value={projectForm.year || '2024'}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      placeholder="2024"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                </div>

                {/* Project Image Upload / URL */}
                <div>
                  <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                    Project Image
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#7c3aed]/10 border border-[#00d4ff]/30 text-black dark:text-white text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2">
                        <Upload className="w-3.5 h-3.5 text-[#00d4ff]" />
                        {uploadingImage ? 'Uploading...' : 'Upload Image File'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-black/40 dark:text-white/40">or enter image path / URL below</span>
                    </div>

                    <input
                      type="text"
                      value={projectForm.image || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="https://... or /assets/external/projects/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    />

                    {projectForm.image && (
                      <div className="mt-2 w-full h-32 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 relative">
                        <img src={projectForm.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                    Short Description *
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Comprehensive mechanical design description..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                    Tools Used (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={toolsInput}
                    onChange={(e) => setToolsInput(e.target.value)}
                    placeholder="SolidWorks, KeyShot, PTC Creo, Blender"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                    Highlights (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    placeholder="Tight tolerance engineering\nExploded assembly visualization\nInjection mold ready"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                  />
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-sm font-semibold text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold text-sm hover:opacity-95 shadow-md"
                  >
                    {selectedProject ? 'Save Changes' : 'Create Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT SERVICE */}
      {/* ==================================================== */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white dark:bg-[#0b0f19] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-mono text-black dark:text-white">
                    {selectedService ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <p className="text-xs text-black/50 dark:text-white/50">
                    Updates service page content, hero banner, deliverables, and FAQs.
                  </p>
                </div>
                <button
                  onClick={() => setIsServiceModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveService} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      placeholder="e.g. CAD Design, Feasibility, DFM..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                      Slug (URL identifier)
                    </label>
                    <input
                      type="text"
                      value={serviceForm.slug}
                      onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                      placeholder="e.g. cad-design"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                    Hero Image
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#7c3aed]/10 border border-[#00d4ff]/30 text-black dark:text-white text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2">
                        <Upload className="w-3.5 h-3.5 text-[#00d4ff]" />
                        {uploadingImage ? 'Uploading...' : 'Upload Hero Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleServiceImageFileChange}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={serviceForm.heroImage || ''}
                      onChange={(e) => setServiceForm({ ...serviceForm, heroImage: e.target.value })}
                      placeholder="https://... or /assets/external/projects/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                    Short Summary (Hero / List view) *
                  </label>
                  <textarea
                    rows={2}
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    placeholder="Brief description..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                    Long Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    value={serviceForm.longDescription}
                    onChange={(e) => setServiceForm({ ...serviceForm, longDescription: e.target.value })}
                    placeholder="Full in-depth explanation for the service detail page..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                      Tools (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={serviceToolsInput}
                      onChange={(e) => setServiceToolsInput(e.target.value)}
                      placeholder="SolidWorks, PTC Creo, ANSYS"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                      Deliverables (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={serviceDeliverablesInput}
                      onChange={(e) => setServiceDeliverablesInput(e.target.value)}
                      placeholder="STEP, IGES, STL, DWG, PDF"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-black/70 dark:text-white/70 mb-1">
                    FAQs (Format: Q: Question? \n A: Answer)
                  </label>
                  <textarea
                    rows={4}
                    value={faqInput}
                    onChange={(e) => setFaqInput(e.target.value)}
                    placeholder="Q: What formats do you deliver?&#10;A: We deliver STEP, IGES, STL, and PDF drawings."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm text-black dark:text-white focus:outline-none focus:border-[#00d4ff]"
                  />
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsServiceModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-sm font-semibold text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold text-sm hover:opacity-95 shadow-md"
                  >
                    {selectedService ? 'Save Changes' : 'Create Service'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* MODAL: SUPABASE SQL SCRIPT HELPER */}
      {/* ==================================================== */}
      <AnimatePresence>
        {isSqlModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-white dark:bg-[#0b0f19] border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#00d4ff]/10 text-[#00d4ff]">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-mono text-black dark:text-white">
                      Supabase Setup Guide & SQL Script
                    </h2>
                    <p className="text-xs text-black/50 dark:text-white/50">
                      Copy and run this in your Supabase SQL Editor to initialize all tables and storage.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSqlModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2">
                  <h4 className="font-bold text-black dark:text-white">Quick 3-Step Setup:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-black/70 dark:text-white/70 text-xs">
                    <li>Open your project at <strong>supabase.com/dashboard</strong>.</li>
                    <li>Click <strong>SQL Editor</strong> on the left sidebar &rarr; <strong>New Query</strong>.</li>
                    <li>Paste the SQL script below and click <strong>Run</strong> (or press Ctrl+Enter).</li>
                    <li>Add your Supabase Project URL and Anon Key into your <strong>.env.local</strong> or Netlify environment variables:</li>
                  </ol>
                  <div className="p-3 rounded-xl bg-black/90 text-white font-mono text-[11px] select-all">
                    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co<br />
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...<br />
                    Add the admin password only as a server-side Netlify environment variable.
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold text-xs text-black/80 dark:text-white/80">Complete SQL Script:</span>
                  <button
                    onClick={() => {
                      fetch('/api/admin/sql-schema')
                        .then((res) => res.text())
                        .then((text) => {
                          navigator.clipboard.writeText(text);
                          setCopiedSql(true);
                          setTimeout(() => setCopiedSql(false), 3000);
                        });
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copiedSql ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Script'}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-black/80 dark:text-white/80 max-h-60 overflow-y-auto">
                  <p className="text-black/50 dark:text-white/50 mb-2">-- Complete schema is located in lib/supabase-schema.sql</p>
                  <code>
                    CREATE TABLE public.projects (...);<br />
                    CREATE TABLE public.services (...);<br />
                    INSERT INTO storage.buckets (id, name, public) VALUES (&apos;portfolio-images&apos;, ...);
                  </code>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
