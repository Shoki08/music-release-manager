import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const PLATFORMS = [
    { id: 'youtube', name: 'YouTube', icon: '📺', category: 'video' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', category: 'video' },
    { id: 'instagram', name: 'Instagram', icon: '📷', category: 'video' },
    { id: 'soundon', name: 'Soundon', icon: '🎧', category: 'audio' },
    { id: 'spotify', name: 'Spotify', icon: '🎶', category: 'audio' },
    { id: 'soundcloud', name: 'SoundCloud', icon: '☁️', category: 'audio' },
    { id: 'tiktok_sound', name: 'TikTok音源', icon: '🔊', category: 'audio' }
];

const INITIAL_PROJECT = {
    id: Date.now(),
    title: '',
    description: '',
    tags: '',
    hashtags: '',
    videoFile: '',
    audioFile: '',
    hookFile: '',
    createdAt: new Date().toISOString(),
    platforms: {},
    notes: ''
};

function App() {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [activeTab, setActiveTab] = useState('projects');
    const [showProjectForm, setShowProjectForm] = useState(false);

    // LocalStorageからデータ読み込み
    useEffect(() => {
        const saved = localStorage.getItem('musicProjects');
        if (saved) {
            const data = JSON.parse(saved);
            setProjects(data);
            if (data.length > 0 && !currentProject) {
                setCurrentProject(data[0]);
            }
        }
    }, []);

    // LocalStorageにデータ保存
    useEffect(() => {
        if (projects.length > 0) {
            localStorage.setItem('musicProjects', JSON.stringify(projects));
        }
    }, [projects]);

    const createProject = () => {
        const newProject = { 
            ...INITIAL_PROJECT, 
            id: Date.now(),
            platforms: PLATFORMS.reduce((acc, p) => ({ ...acc, [p.id]: { posted: false, url: '', postedAt: null } }), {})
        };
        setProjects([newProject, ...projects]);
        setCurrentProject(newProject);
        setShowProjectForm(true);
        setActiveTab('edit');
    };

    const updateProject = (updates) => {
        const updated = { ...currentProject, ...updates };
        setCurrentProject(updated);
        setProjects(projects.map(p => p.id === updated.id ? updated : p));
    };

    const deleteProject = (id) => {
        if (confirm('このプロジェクトを削除しますか?')) {
            const filtered = projects.filter(p => p.id !== id);
            setProjects(filtered);
            setCurrentProject(filtered[0] || null);
            if (currentProject?.id === id) {
                setActiveTab('projects');
            }
        }
    };

    const togglePlatform = (platformId) => {
        const platforms = { ...currentProject.platforms };
        platforms[platformId] = {
            ...platforms[platformId],
            posted: !platforms[platformId].posted,
            postedAt: !platforms[platformId].posted ? new Date().toISOString() : null
        };
        updateProject({ platforms });
    };

    const updatePlatformUrl = (platformId, url) => {
        const platforms = { ...currentProject.platforms };
        platforms[platformId] = { ...platforms[platformId], url };
        updateProject({ platforms });
    };

    const exportData = () => {
        const data = JSON.stringify(projects, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `music-projects-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    };

    const importData = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    setProjects(data);
                    setCurrentProject(data[0] || null);
                    alert('データをインポートしました');
                } catch (error) {
                    alert('インポートに失敗しました');
                }
            };
            reader.readAsText(file);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('クリップボードにコピーしました！');
    };

    const getProgress = (project) => {
        if (!project?.platforms) return 0;
        const total = PLATFORMS.length;
        const posted = Object.values(project.platforms).filter(p => p.posted).length;
        return Math.round((posted / total) * 100);
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">🎵 Music Release Manager</h1>
                            <p className="text-indigo-100 mt-1">複数プラットフォームへの公開を効率化</p>
                        </div>
                        <button
                            onClick={createProject}
                            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-md"
                        >
                            ＋ 新規プロジェクト
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-md p-4 sticky top-4">
                            <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <span>📁</span> プロジェクト一覧
                            </h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {projects.map(project => (
                                    <div
                                        key={project.id}
                                        onClick={() => {
                                            setCurrentProject(project);
                                            setActiveTab('edit');
                                        }}
                                        className={`p-3 rounded-lg cursor-pointer transition ${
                                            currentProject?.id === project.id
                                                ? 'bg-indigo-50 border-2 border-indigo-400'
                                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                        }`}
                                    >
                                        <div className="font-medium text-sm truncate">
                                            {project.title || '無題のプロジェクト'}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {new Date(project.createdAt).toLocaleDateString('ja-JP')}
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                                    <div
                                                        className="bg-indigo-600 h-1.5 rounded-full transition-all"
                                                        style={{ width: `${getProgress(project)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-gray-600">{getProgress(project)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-4 pt-4 border-t space-y-2">
                                <button
                                    onClick={exportData}
                                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                                >
                                    💾 エクスポート
                                </button>
                                <label className="block w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition cursor-pointer text-center">
                                    📥 インポート
                                    <input
                                        type="file"
                                        accept=".json"
                                        onChange={importData}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-12 lg:col-span-9">
                        {currentProject ? (
                            <div className="bg-white rounded-xl shadow-md">
                                {/* Tabs */}
                                <div className="border-b px-6 pt-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setActiveTab('edit')}
                                            className={`tab-button px-6 py-3 font-medium rounded-t-lg ${
                                                activeTab === 'edit' ? 'active' : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            ✏️ 編集
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('platforms')}
                                            className={`tab-button px-6 py-3 font-medium rounded-t-lg ${
                                                activeTab === 'platforms' ? 'active' : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            📤 公開管理
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('templates')}
                                            className={`tab-button px-6 py-3 font-medium rounded-t-lg ${
                                                activeTab === 'templates' ? 'active' : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            📋 テンプレート
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Edit Tab */}
                                    {activeTab === 'edit' && (
                                        <div className="fade-in space-y-6">
                                            <div className="flex justify-between items-start">
                                                <h2 className="text-2xl font-bold text-gray-800">プロジェクト情報</h2>
                                                <button
                                                    onClick={() => deleteProject(currentProject.id)}
                                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                >
                                                    🗑️ 削除
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        曲のタイトル
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={currentProject.title}
                                                        onChange={(e) => updateProject({ title: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="例: Summer Vibes"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        説明文
                                                    </label>
                                                    <textarea
                                                        value={currentProject.description}
                                                        onChange={(e) => updateProject({ description: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        rows="4"
                                                        placeholder="曲の説明、コンセプト、制作背景など..."
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            タグ (カンマ区切り)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={currentProject.tags}
                                                            onChange={(e) => updateProject({ tags: e.target.value })}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                            placeholder="pop, electronic, chill"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            ハッシュタグ
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={currentProject.hashtags}
                                                            onChange={(e) => updateProject({ hashtags: e.target.value })}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                            placeholder="#music #newrelease"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        動画ファイル名
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={currentProject.videoFile}
                                                        onChange={(e) => updateProject({ videoFile: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="video.mp4"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        音源ファイル名
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={currentProject.audioFile}
                                                        onChange={(e) => updateProject({ audioFile: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="audio.mp3"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Hookファイル名
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={currentProject.hookFile}
                                                        onChange={(e) => updateProject({ hookFile: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="hook.mp3"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        メモ
                                                    </label>
                                                    <textarea
                                                        value={currentProject.notes}
                                                        onChange={(e) => updateProject({ notes: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        rows="3"
                                                        placeholder="その他のメモ、TODO、アイデアなど..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Platforms Tab */}
                                    {activeTab === 'platforms' && (
                                        <div className="fade-in">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-6">公開状況</h2>
                                            
                                            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold text-gray-700">全体の進捗</span>
                                                    <span className="text-2xl font-bold text-indigo-600">
                                                        {getProgress(currentProject)}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3">
                                                    <div
                                                        className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                                                        style={{ width: `${getProgress(currentProject)}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {['video', 'audio'].map(category => (
                                                <div key={category} className="mb-8">
                                                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                                        {category === 'video' ? '🎬 動画プラットフォーム' : '🎧 音楽プラットフォーム'}
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {PLATFORMS.filter(p => p.category === category).map(platform => {
                                                            const status = currentProject.platforms[platform.id] || {};
                                                            return (
                                                                <div
                                                                    key={platform.id}
                                                                    className="platform-card border-2 rounded-xl p-4"
                                                                    style={{
                                                                        borderColor: status.posted ? '#10b981' : '#e5e7eb'
                                                                    }}
                                                                >
                                                                    <div className="flex items-start justify-between mb-3">
                                                                        <div className="flex items-center gap-3">
                                                                            <span className="text-3xl">{platform.icon}</span>
                                                                            <div>
                                                                                <h4 className="font-semibold text-gray-800">
                                                                                    {platform.name}
                                                                                </h4>
                                                                                {status.posted && status.postedAt && (
                                                                                    <p className="text-xs text-gray-500">
                                                                                        {new Date(status.postedAt).toLocaleDateString('ja-JP')} に公開
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => togglePlatform(platform.id)}
                                                                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                                                                                status.posted
                                                                                    ? 'checkbox-checked border-green-500'
                                                                                    : 'border-gray-300 hover:border-gray-400'
                                                                            }`}
                                                                        >
                                                                            {status.posted && (
                                                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                                </svg>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        value={status.url || ''}
                                                                        onChange={(e) => updatePlatformUrl(platform.id, e.target.value)}
                                                                        placeholder="公開URLを入力"
                                                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                                    />
                                                                    {status.url && (
                                                                        <a
                                                                            href={status.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-800"
                                                                        >
                                                                            🔗 リンクを開く
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Templates Tab */}
                                    {activeTab === 'templates' && (
                                        <div className="fade-in">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-6">投稿テンプレート</h2>
                                            
                                            <div className="space-y-6">
                                                {/* YouTube */}
                                                <div className="border-2 border-gray-200 rounded-xl p-6">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="text-3xl">📺</span>
                                                        <h3 className="text-xl font-semibold">YouTube</h3>
                                                    </div>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <p className="text-sm text-gray-600 mb-2 font-medium">タイトル:</p>
                                                        <p className="mb-4">{currentProject.title || '[タイトル未設定]'}</p>
                                                        
                                                        <p className="text-sm text-gray-600 mb-2 font-medium">説明:</p>
                                                        <p className="whitespace-pre-wrap mb-4">
                                                            {currentProject.description || '[説明未設定]'}
                                                            {currentProject.hashtags && `\n\n${currentProject.hashtags}`}
                                                        </p>
                                                        
                                                        <p className="text-sm text-gray-600 mb-2 font-medium">タグ:</p>
                                                        <p>{currentProject.tags || '[タグ未設定]'}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(
                                                            `${currentProject.title}\n\n${currentProject.description}\n\n${currentProject.hashtags}\n\nタグ: ${currentProject.tags}`
                                                        )}
                                                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                                    >
                                                        📋 コピー
                                                    </button>
                                                </div>

                                                {/* TikTok/Instagram */}
                                                <div className="border-2 border-gray-200 rounded-xl p-6">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="text-3xl">🎵📷</span>
                                                        <h3 className="text-xl font-semibold">TikTok / Instagram</h3>
                                                    </div>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <p className="whitespace-pre-wrap">
                                                            {currentProject.title && `${currentProject.title}\n\n`}
                                                            {currentProject.description && `${currentProject.description}\n\n`}
                                                            {currentProject.hashtags || '[ハッシュタグ未設定]'}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(
                                                            `${currentProject.title}\n\n${currentProject.description}\n\n${currentProject.hashtags}`
                                                        )}
                                                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                                    >
                                                        📋 コピー
                                                    </button>
                                                </div>

                                                {/* 音楽プラットフォーム */}
                                                <div className="border-2 border-gray-200 rounded-xl p-6">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="text-3xl">🎧</span>
                                                        <h3 className="text-xl font-semibold">Spotify / SoundCloud / Soundon</h3>
                                                    </div>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <p className="text-sm text-gray-600 mb-2 font-medium">曲名:</p>
                                                        <p className="mb-4">{currentProject.title || '[タイトル未設定]'}</p>
                                                        
                                                        <p className="text-sm text-gray-600 mb-2 font-medium">説明:</p>
                                                        <p className="whitespace-pre-wrap mb-4">
                                                            {currentProject.description || '[説明未設定]'}
                                                        </p>
                                                        
                                                        <p className="text-sm text-gray-600 mb-2 font-medium">ジャンル/タグ:</p>
                                                        <p>{currentProject.tags || '[タグ未設定]'}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(
                                                            `${currentProject.title}\n\n${currentProject.description}\n\nジャンル: ${currentProject.tags}`
                                                        )}
                                                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                                    >
                                                        📋 コピー
                                                    </button>
                                                </div>

                                                {/* クイックリンク */}
                                                <div className="border-2 border-indigo-200 bg-indigo-50 rounded-xl p-6">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">🔗 クイックリンク</h3>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <a href="https://youtube.com/upload" target="_blank" className="px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium text-center shadow-sm">
                                                            YouTube Studio
                                                        </a>
                                                        <a href="https://www.tiktok.com/creator-center/upload" target="_blank" className="px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium text-center shadow-sm">
                                                            TikTok Upload
                                                        </a>
                                                        <a href="https://www.instagram.com/" target="_blank" className="px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium text-center shadow-sm">
                                                            Instagram
                                                        </a>
                                                        <a href="https://soundon.global/" target="_blank" className="px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium text-center shadow-sm">
                                                            Soundon
                                                        </a>
                                                        <a href="https://artists.spotify.com/" target="_blank" className="px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium text-center shadow-sm">
                                                            Spotify for Artists
                                                        </a>
                                                        <a href="https://soundcloud.com/upload" target="_blank" className="px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition text-sm font-medium text-center shadow-sm">
                                                            SoundCloud Upload
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <div className="text-6xl mb-4">🎵</div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">プロジェクトがありません</h2>
                                <p className="text-gray-600 mb-6">
                                    新しいプロジェクトを作成して、音楽の公開を管理しましょう
                                </p>
                                <button
                                    onClick={createProject}
                                    className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                                >
                                    ＋ 新規プロジェクト作成
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">
                        Music Release Manager - データはブラウザに保存されます
                    </p>
                </div>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
