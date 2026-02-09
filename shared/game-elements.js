/**
 * Quest Mode - Game Elements & Unlock System
 * Simple step-by-step learning progression
 */

(function() {
    'use strict';

    // ========================================
    // QUEST DATA STRUCTURE
    // ========================================
    
    // XP per completion
    const XP_PER_QUEST = 10;
    const XP_PER_LEVEL = 50;

    // Achievement definitions
    const ACHIEVEMENTS = [
        { id: 'first_quest', name: 'First Steps', description: 'Complete your first quest', icon: '🥇', xp: 50 },
        { id: 'subject_master', name: 'Subject Master', description: 'Complete all quests in one subject', icon: '👑', xp: 100 },
        { id: 'streak_7', name: '7-Day Streak', description: 'Study for 7 consecutive days', icon: '🔥', xp: 75 },
        { id: 'streak_30', name: '30-Day Streak', description: 'Study for 30 consecutive days', icon: '💎', xp: 200 },
        { id: 'level_10', name: 'Level 10 Achiever', description: 'Reach level 10', icon: '🌟', xp: 150 },
        { id: 'perfect_score', name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '💯', xp: 50 },
        { id: 'bookmarker', name: 'Bookmark Collector', description: 'Bookmark 5 quests', icon: '📚', xp: 25 },
        { id: 'note_taker', name: 'Note Taker', description: 'Save notes in 3 different quests', icon: '📝', xp: 25 }
    ];

    // Advanced Quest Types
    const ADVANCED_QUESTS = {
        physics: [
            {
                id: 'challenge-advanced-problems',
                title: 'Advanced Problem Solving',
                type: 'challenge',
                difficulty: 'hard',
                xp: 50,
                requirements: ['measurements', 'motion', 'forces']
            }
        ],
        chemistry: [
            {
                id: 'challenge-lab-experiments',
                title: 'Laboratory Experiments',
                type: 'challenge',
                difficulty: 'medium',
                xp: 40,
                requirements: ['atomic', 'bonding', 'energetics']
            }
        ],
        mathematics: [
            {
                id: 'challenge-real-world',
                title: 'Real World Applications',
                type: 'challenge',
                difficulty: 'hard',
                xp: 60,
                requirements: ['algebra', 'differentiation', 'integration']
            }
        ]
    };

    // Quest definitions for all subjects
    const QUEST_DATA = {
        physics: {
            name: 'Physics',
            color: '#1565c0',
            icon: '🔬',
            bigQuests: [
                {
                    id: 'measurements',
                    title: 'Measurements & Units',
                    sideQuests: [
                        { id: 'si-units', title: 'SI Units' },
                        { id: 'dimensional', title: 'Dimensional Analysis' },
                        { id: 'measurements-quiz', title: 'Quiz: Measurements' }
                    ]
                },
                {
                    id: 'motion',
                    title: 'Linear Motion',
                    sideQuests: [
                        { id: 'motion-concepts', title: 'Motion Concepts' },
                        { id: 'equations', title: 'Equations of Motion' },
                        { id: 'motion-quiz', title: 'Quiz: Motion' }
                    ]
                },
                {
                    id: 'newton',
                    title: "Newton's Laws",
                    sideQuests: [
                        { id: 'first-law', title: "Newton's First Law" },
                        { id: 'second-law', title: "Newton's Second Law" },
                        { id: 'third-law', title: "Newton's Third Law" },
                        { id: 'newton-quiz', title: "Quiz: Newton's Laws" }
                    ]
                },
                {
                    id: 'energy',
                    title: 'Work, Energy & Power',
                    sideQuests: [
                        { id: 'work', title: 'Work & Energy' },
                        { id: 'power', title: 'Power' },
                        { id: 'energy-quiz', title: 'Quiz: Energy' }
                    ]
                },
                {
                    id: 'momentum',
                    title: 'Momentum & Collisions',
                    sideQuests: [
                        { id: 'momentum-basics', title: 'Momentum Basics' },
                        { id: 'collisions', title: 'Collisions' },
                        { id: 'momentum-quiz', title: 'Quiz: Momentum' }
                    ]
                },
                {
                    id: 'circular',
                    title: 'Circular Motion',
                    sideQuests: [
                        { id: 'circular-basics', title: 'Circular Motion Basics' },
                        { id: 'gravitation', title: 'Gravitation' },
                        { id: 'circular-quiz', title: 'Quiz: Circular' }
                    ]
                },
                {
                    id: 'waves',
                    title: 'Waves & Oscillations',
                    sideQuests: [
                        { id: 'wave-basics', title: 'Wave Properties' },
                        { id: 'superposition', title: 'Superposition' },
                        { id: 'waves-quiz', title: 'Quiz: Waves' }
                    ]
                },
                {
                    id: 'electricity',
                    title: 'Electricity & Magnetism',
                    sideQuests: [
                        { id: 'electrostatics', title: 'Electrostatics' },
                        { id: 'current', title: 'Current Electricity' },
                        { id: 'magnetism', title: 'Magnetism' },
                        { id: 'emi', title: 'EMI' },
                        { id: 'electricity-quiz', title: 'Quiz: Electricity' }
                    ]
                },
                {
                    id: 'modern',
                    title: 'Modern Physics',
                    sideQuests: [
                        { id: 'atomic', title: 'Atomic Structure' },
                        { id: 'radioactivity', title: 'Radioactivity' },
                        { id: 'photoelectric', title: 'Photoelectric Effect' },
                        { id: 'modern-quiz', title: 'Quiz: Modern Physics' }
                    ]
                }
            ]
        },
        chemistry: {
            name: 'Chemistry',
            color: '#c62828',
            icon: '⚗️',
            bigQuests: [
                {
                    id: 'atomic',
                    title: 'Atomic Structure & Periodicity',
                    sideQuests: [
                        { id: 'atomic-models', title: 'Atomic Models' },
                        { id: 'periodicity', title: 'Periodic Trends' },
                        { id: 'atomic-quiz', title: 'Quiz: Atomic' }
                    ]
                },
                {
                    id: 'bonding',
                    title: 'Chemical Bonding',
                    sideQuests: [
                        { id: 'ionic', title: 'Ionic Bonding' },
                        { id: 'covalent', title: 'Covalent Bonding' },
                        { id: 'bonding-quiz', title: 'Quiz: Bonding' }
                    ]
                },
                {
                    id: 'energetics',
                    title: 'Energetics & Kinetics',
                    sideQuests: [
                        { id: 'enthalpy', title: 'Enthalpy' },
                        { id: 'hess-law', title: "Hess's Law" },
                        { id: 'kinetics', title: 'Reaction Rates' },
                        { id: 'energetics-quiz', title: 'Quiz: Energetics' }
                    ]
                },
                {
                    id: 'equilibrium',
                    title: 'Chemical Equilibrium',
                    sideQuests: [
                        { id: 'equilibrium-basics', title: 'Equilibrium Basics' },
                        { id: 'le-chatelier', title: 'Le Chatelier' },
                        { id: 'equilibrium-quiz', title: 'Quiz: Equilibrium' }
                    ]
                },
                {
                    id: 'electrochemistry',
                    title: 'Electrochemistry',
                    sideQuests: [
                        { id: 'redox', title: 'Redox Reactions' },
                        { id: 'cells', title: 'Electrochemical Cells' },
                        { id: 'electro-quiz', title: 'Quiz: Electro' }
                    ]
                },
                {
                    id: 'organic-basics',
                    title: 'Organic Chemistry Basics',
                    sideQuests: [
                        { id: 'hydrocarbons', title: 'Hydrocarbons' },
                        { id: 'functional-groups', title: 'Functional Groups' },
                        { id: 'organic-quiz', title: 'Quiz: Organic Basics' }
                    ]
                },
                {
                    id: 'organic-advanced',
                    title: 'Organic Chemistry Advanced',
                    sideQuests: [
                        { id: 'reactions', title: 'Reaction Mechanisms' },
                        { id: 'polymers', title: 'Polymers' },
                        { id: 'organic-advanced-quiz', title: 'Quiz: Organic Advanced' }
                    ]
                }
            ]
        },
        mathematics: {
            name: 'Mathematics',
            color: '#1a5f7a',
            icon: '📐',
            bigQuests: [
                {
                    id: 'algebra',
                    title: 'Algebra & Polynomials',
                    sideQuests: [
                        { id: 'polynomials', title: 'Polynomials' },
                        { id: 'roots', title: 'Roots of Equations' },
                        { id: 'algebra-quiz', title: 'Quiz: Algebra' }
                    ]
                },
                {
                    id: 'binomial',
                    title: 'Binomial & Sequences',
                    sideQuests: [
                        { id: 'binomial', title: 'Binomial Theorem' },
                        { id: 'sequences', title: 'Sequences & Series' },
                        { id: 'binomial-quiz', title: 'Quiz: Binomial' }
                    ]
                },
                {
                    id: 'trigonometry',
                    title: 'Trigonometry',
                    sideQuests: [
                        { id: 'identities', title: 'Trig Identities' },
                        { id: 'equations', title: 'Trig Equations' },
                        { id: 'trig-quiz', title: 'Quiz: Trigonometry' }
                    ]
                },
                {
                    id: 'differentiation',
                    title: 'Differentiation',
                    sideQuests: [
                        { id: 'derivatives', title: 'Basic Derivatives' },
                        { id: 'applications', title: 'Applications' },
                        { id: 'diff-quiz', title: 'Quiz: Differentiation' }
                    ]
                },
                {
                    id: 'integration',
                    title: 'Integration',
                    sideQuests: [
                        { id: 'integrals', title: 'Basic Integrals' },
                        { id: 'definite', title: 'Definite Integrals' },
                        { id: 'int-quiz', title: 'Quiz: Integration' }
                    ]
                },
                {
                    id: 'vectors',
                    title: 'Vectors',
                    sideQuests: [
                        { id: 'vector-basics', title: 'Vector Operations' },
                        { id: '3d-vectors', title: '3D Vectors' },
                        { id: 'vectors-quiz', title: 'Quiz: Vectors' }
                    ]
                },
                {
                    id: 'complex',
                    title: 'Complex Numbers',
                    sideQuests: [
                        { id: 'complex-basics', title: 'Complex Numbers' },
                        { id: 'polar-form', title: 'Polar Form' },
                        { id: 'complex-quiz', title: 'Quiz: Complex' }
                    ]
                },
                {
                    id: 'statistics',
                    title: 'Statistics & Probability',
                    sideQuests: [
                        { id: 'probability', title: 'Probability' },
                        { id: 'distributions', title: 'Distributions' },
                        { id: 'stats-quiz', title: 'Quiz: Statistics' }
                    ]
                }
            ]
        }
    };

    // ========================================
    // STATE MANAGEMENT
    // ========================================

    function getProgress() {
        const saved = localStorage.getItem('questModeProgress');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Ensure new fields exist for backward compatibility
            if (!parsed.bookmarks) parsed.bookmarks = [];
            if (!parsed.notes) parsed.notes = {};
            if (!parsed.streak) parsed.streak = { lastStudyDate: null, current: 0, best: 0 };
            return parsed;
        }
        // Default state - ALL big quests unlocked, only first side quest of first big quest unlocked
        return {
            version: '1.0',
            totalXP: 0,
            level: 1,
            bookmarks: [],
            notes: {},
            streak: { lastStudyDate: null, current: 0, best: 0 },
            achievements: [],
            achievementProgress: {},
            completedAdvancedQuests: [],
            achievements: [],
            achievementProgress: {},
            physics: {
                unlockedBigQuests: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                completedSideQuests: [],
                currentBigQuest: 0,
                currentSideQuest: 0
            },
            chemistry: {
                unlockedBigQuests: [0, 1, 2, 3, 4, 5, 6],
                completedSideQuests: [],
                currentBigQuest: 0,
                currentSideQuest: 0
            },
            mathematics: {
                unlockedBigQuests: [0, 1, 2, 3, 4, 5, 6, 7],
                completedSideQuests: [],
                currentBigQuest: 0,
                currentSideQuest: 0
            }
        };
    }

    function saveProgress(progress) {
        localStorage.setItem('questModeProgress', JSON.stringify(progress));
    }

    // ========================================
    // UNLOCK LOGIC
    // ========================================

    function isSideQuestUnlocked(subject, bigQuestIndex, sideQuestIndex, progress) {
        const subjectData = progress[subject];
        
        // Always unlock first side quest of first big quest
        if (bigQuestIndex === 0 && sideQuestIndex === 0) {
            return true;
        }
        
        // Check if big quest is unlocked
        if (!subjectData.unlockedBigQuests.includes(bigQuestIndex)) {
            return false;
        }
        
        // Check if previous side quest in this big quest is completed
        if (sideQuestIndex > 0) {
            const bigQuest = QUEST_DATA[subject].bigQuests[bigQuestIndex];
            const prevSideQuestId = bigQuest.sideQuests[sideQuestIndex - 1].id;
            return subjectData.completedSideQuests.includes(prevSideQuestId);
        }
        
        return true;
    }

    function isBigQuestUnlocked(subject, bigQuestIndex, progress) {
        // ALL big quests are unlocked by default - user can choose any lesson
        return true;
    }

    function completeSideQuest(subject, sideQuestId, progress) {
        if (!progress[subject].completedSideQuests.includes(sideQuestId)) {
            progress[subject].completedSideQuests.push(sideQuestId);
            
            // Award XP
            progress.totalXP += XP_PER_QUEST;
            progress.level = Math.floor(progress.totalXP / XP_PER_LEVEL) + 1;
            
            // Find which big quest this side quest belongs to
            const bigQuests = QUEST_DATA[subject].bigQuests;
            for (let bqIndex = 0; bqIndex < bigQuests.length; bqIndex++) {
                const bigQuest = bigQuests[bqIndex];
                const sqIndex = bigQuest.sideQuests.findIndex(sq => sq.id === sideQuestId);
                
                if (sqIndex !== -1) {
                    progress[subject].currentBigQuest = bqIndex;
                    progress[subject].currentSideQuest = sqIndex;
                    
                    // Check if all side quests in this big quest are completed
                    const allCompleted = bigQuest.sideQuests.every(sq => 
                        progress[subject].completedSideQuests.includes(sq.id)
                    );
                    
                    // Unlock next big quest
                    if (allCompleted && bqIndex + 1 < bigQuests.length) {
                        const nextBigQuestIndex = bqIndex + 1;
                        if (!progress[subject].unlockedBigQuests.includes(nextBigQuestIndex)) {
                            progress[subject].unlockedBigQuests.push(nextBigQuestIndex);
                        }
                    }
                    
                    break;
                }
            }
            
            saveProgress(progress);
            showRewardAnimation(progress.totalXP, progress.level);
            
            // Check for achievements
            checkAchievements(progress);
            
            return true;
        }
        return false;
    }

    // ========================================
    // UI FUNCTIONS
    // ========================================

    function getStatusIcon(subject, bigQuestIndex, sideQuestIndex, progress) {
        const sideQuestId = QUEST_DATA[subject].bigQuests[bigQuestIndex].sideQuests[sideQuestIndex].id;
        
        if (progress[subject].completedSideQuests.includes(sideQuestId)) {
            return { icon: '✅', status: 'completed' };
        }
        
        if (isSideQuestUnlocked(subject, bigQuestIndex, sideQuestIndex, progress)) {
            return { icon: '🔓', status: 'unlocked' };
        }
        
        return { icon: '🔒', status: 'locked' };
    }

    function getBigQuestStatus(subject, bigQuestIndex, progress) {
        const bigQuest = QUEST_DATA[subject].bigQuests[bigQuestIndex];
        const totalSideQuests = bigQuest.sideQuests.length;
        const completedSideQuests = bigQuest.sideQuests.filter(sq => 
            progress[subject].completedSideQuests.includes(sq.id)
        ).length;
        
        if (completedSideQuests === totalSideQuests) {
            return { icon: '✅', status: 'completed', progress: 100 };
        }
        
        if (isBigQuestUnlocked(subject, bigQuestIndex, progress)) {
            return { icon: '🔓', status: 'unlocked', progress: (completedSideQuests / totalSideQuests) * 100 };
        }
        
        return { icon: '🔒', status: 'locked', progress: 0 };
    }

    function getSubjectProgress(subject, progress) {
        const bigQuests = QUEST_DATA[subject].bigQuests;
        const totalSideQuests = bigQuests.reduce((sum, bq) => sum + bq.sideQuests.length, 0);
        const completedSideQuests = progress[subject].completedSideQuests.length;
        
        return {
            total: totalSideQuests,
            completed: completedSideQuests,
            percentage: totalSideQuests > 0 ? Math.round((completedSideQuests / totalSideQuests) * 100) : 0
        };
    }

    // ========================================
    // BOOKMARKS & NOTES
    // ========================================

    function getBookmarkedQuests(progress) {
        return progress.bookmarks || [];
    }

    function isBookmarked(questId, progress) {
        return (progress.bookmarks || []).includes(questId);
    }

    function toggleBookmark(questId, progress) {
        if (!progress.bookmarks) progress.bookmarks = [];
        
        const index = progress.bookmarks.indexOf(questId);
        if (index === -1) {
            progress.bookmarks.push(questId);
            saveProgress(progress);
            return true; // Now bookmarked
        } else {
            progress.bookmarks.splice(index, 1);
            saveProgress(progress);
            return false; // No longer bookmarked
        }
    }

    function getNote(questId, progress) {
        return (progress.notes || {})[questId] || '';
    }

    function saveNote(questId, note, progress) {
        if (!progress.notes) progress.notes = {};
        progress.notes[questId] = note;
        saveProgress(progress);
    }

    function deleteNote(questId, progress) {
        if (progress.notes && progress.notes[questId]) {
            delete progress.notes[questId];
            saveProgress(progress);
        }
    }

    // ========================================
    // STREAK TRACKING
    // ========================================

    function updateStreak(progress) {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (!progress.streak) {
            progress.streak = { lastStudyDate: today, current: 1, best: 1 };
        } else if (progress.streak.lastStudyDate === today) {
            // Already studied today, do nothing
        } else if (progress.streak.lastStudyDate === yesterday) {
            // Consecutive day!
            progress.streak.current += 1;
            progress.streak.lastStudyDate = today;
            if (progress.streak.current > progress.streak.best) {
                progress.streak.best = progress.streak.current;
            }
        } else {
            // Streak broken
            progress.streak.current = 1;
            progress.streak.lastStudyDate = today;
        }
        
        saveProgress(progress);
        
        // Check streak achievements
        checkAchievements(progress);
        
        return progress.streak;
    }

    // ========================================
    // ANIMATIONS
    // ========================================

    function showRewardAnimation(xp, level) {
        const overlay = document.createElement('div');
        overlay.className = 'reward-overlay';
        overlay.innerHTML = `
            <div class="reward-content">
                <div class="reward-xp">+${XP_PER_QUEST} XP</div>
                <div class="reward-level">Level ${level}</div>
                <div class="reward-total">Total: ${xp} XP</div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => overlay.classList.add('show'), 10);
        setTimeout(() => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        }, 2000);
    }

    // ========================================
    // NAVIGATION
    // ========================================

    function goToQuest(subject, bigQuestId) {
        const subjectData = QUEST_DATA[subject];
        const bigQuestIndex = subjectData.bigQuests.findIndex(bq => bq.id === bigQuestId);
        if (bigQuestIndex !== -1) {
            window.location.href = `${subject}/quest-${bigQuestIndex + 1}-${bigQuestId}.html`;
        }
    }

    function goToSideQuest(subject, bigQuestId, sideQuestId) {
        window.location.href = `${subject}/quest-${bigQuestId}.html#${sideQuestId}`;
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    function init() {
        // Check if this is a quest page
        const pathParts = window.location.pathname.split('/');
        const filename = pathParts[pathParts.length - 1];
        
        if (filename.startsWith('quest-')) {
            initQuestPage();
        } else if (filename === 'index.html' || filename === '') {
            initHomePage();
        }
        
        // Initialize theme selector after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initThemeSelector();
                // Apply saved theme
                const savedTheme = localStorage.getItem('questTheme') || 'original';
                applyTheme(savedTheme);
            });
        } else {
            initThemeSelector();
            // Apply saved theme
            const savedTheme = localStorage.getItem('questTheme') || 'original';
            applyTheme(savedTheme);
        }
        
        // Initialize interactive elements
        initDragDrop();
        initInteractiveQuiz();
    }

    function initQuestPage() {
        // Quest page initialization
        document.querySelectorAll('.side-quest').forEach(quest => {
            updateQuestStatus(quest);
        });
        
        // Make first unlocked side quest active by default
        const firstUnlocked = document.querySelector('.side-quest.unlocked');
        if (firstUnlocked && !firstUnlocked.classList.contains('active')) {
            firstUnlocked.classList.add('active');
        }
        
        // Update progress display
        updateProgressDisplay();
    }

    function initHomePage() {
        // Home page initialization
        updateHomePageProgress();
    }

    function updateQuestStatus(element) {
        const subject = getCurrentSubject();
        const bigQuestIndex = parseInt(element.dataset.bigQuest);
        const sideQuestIndex = parseInt(element.dataset.sideQuest);
        const progress = getProgress();
        const status = getStatusIcon(subject, bigQuestIndex, sideQuestIndex, progress);
        
        element.dataset.status = status.status;
        
        const statusElement = element.querySelector('.quest-status');
        if (statusElement) {
            statusElement.textContent = status.icon;
        }
    }

    function toggleQuest(questId) {
        const el = document.getElementById(questId);
        if (!el || el.dataset.status === 'locked') return;
        
        // Close all other side quests
        document.querySelectorAll('.side-quest.active').forEach(quest => {
            if (quest.id !== questId) {
                quest.classList.remove('active');
            }
        });
        
        // Toggle this one
        el.classList.toggle('active');
    }

    function updateProgressDisplay() {
        const subject = getCurrentSubject();
        const progress = getProgress();
        const subjectProgress = getSubjectProgress(subject, progress);
        
        const xpElement = document.getElementById('totalXP');
        const levelElement = document.getElementById('currentLevel');
        const progressElement = document.getElementById('subjectProgress');
        
        if (xpElement) xpElement.textContent = progress.totalXP;
        if (levelElement) levelElement.textContent = progress.level;
        if (progressElement) progressElement.textContent = `${subjectProgress.percentage}%`;
    }

    function updateHomePageProgress() {
        const progress = getProgress();
        
        ['physics', 'chemistry', 'mathematics'].forEach(subject => {
            const subjectProgress = getSubjectProgress(subject, progress);
            
            const progressElement = document.getElementById(`${subject}Progress`);
            const xpElement = document.getElementById(`${subject}XP`);
            
            if (progressElement) {
                progressElement.textContent = `${subjectProgress.percentage}%`;
                progressElement.style.setProperty('--progress', subjectProgress.percentage);
            }
        });
        
        const totalXP = document.getElementById('totalXP');
        const totalLevel = document.getElementById('totalLevel');
        
        if (totalXP) totalXP.textContent = progress.totalXP;
        if (totalLevel) totalLevel.textContent = progress.level;
    }

    function getCurrentSubject() {
        const pathParts = window.location.pathname.split('/');
        const subjectIndex = pathParts.findIndex(p => 
            ['physics', 'chemistry', 'mathematics'].includes(p)
        );
        if (subjectIndex !== -1) {
            return pathParts[subjectIndex];
        }
        return 'physics'; // Default
    }

    // ========================================
    // ADVANCED QUESTS SYSTEM
    // ========================================

    function getAvailableAdvancedQuests(subject, progress) {
        const subjectAdvancedQuests = ADVANCED_QUESTS[subject] || [];
        const completedBigQuests = progress[subject].completedSideQuests;
        
        return subjectAdvancedQuests.filter(quest => {
            // Check if all requirements are met
            return quest.requirements.every(req => {
                const bigQuest = QUEST_DATA[subject].bigQuests.find(bq => bq.id === req);
                return bigQuest && bigQuest.sideQuests.every(sq => completedBigQuests.includes(sq.id));
            });
        });
    }

    function isAdvancedQuestUnlocked(subject, questId, progress) {
        const quest = ADVANCED_QUESTS[subject]?.find(q => q.id === questId);
        if (!quest) return false;
        
        return quest.requirements.every(req => {
            const bigQuest = QUEST_DATA[subject].bigQuests.find(bq => bq.id === req);
            return bigQuest && bigQuest.sideQuests.every(sq => 
                progress[subject].completedSideQuests.includes(sq.id)
            );
        });
    }

    function completeAdvancedQuest(subject, questId, progress) {
        const quest = ADVANCED_QUESTS[subject]?.find(q => q.id === questId);
        if (!quest || !isAdvancedQuestUnlocked(subject, questId, progress)) {
            return false;
        }
        
        progress.totalXP += quest.xp;
        progress.level = Math.floor(progress.totalXP / XP_PER_LEVEL) + 1;
        
        // Mark as completed
        if (!progress.completedAdvancedQuests) {
            progress.completedAdvancedQuests = [];
        }
        progress.completedAdvancedQuests.push(questId);
        
        saveProgress(progress);
        showRewardAnimation(progress.totalXP, progress.level);
        checkAchievements(progress);
        
        return true;
    }

    // ========================================
    // ACHIEVEMENT SYSTEM
    // ========================================

    function checkAchievements(progress) {
        const newAchievements = [];
        
        // Check each achievement
        ACHIEVEMENTS.forEach(achievement => {
            if (!progress.achievements.includes(achievement.id)) {
                let earned = false;
                
                switch(achievement.id) {
                    case 'first_quest':
                        earned = progress.totalXP >= XP_PER_QUEST;
                        break;
                    case 'subject_master':
                        earned = ['physics', 'chemistry', 'mathematics'].some(subject => {
                            const subjectProgress = getSubjectProgress(subject, progress);
                            return subjectProgress.percentage === 100;
                        });
                        break;
                    case 'streak_7':
                        earned = progress.streak.current >= 7;
                        break;
                    case 'streak_30':
                        earned = progress.streak.current >= 30;
                        break;
                    case 'level_10':
                        earned = progress.level >= 10;
                        break;
                    case 'perfect_score':
                        // This would be tracked separately - placeholder
                        earned = progress.achievementProgress?.perfect_scores >= 1;
                        break;
                    case 'bookmarker':
                        earned = progress.bookmarks?.length >= 5;
                        break;
                    case 'note_taker':
                        earned = Object.keys(progress.notes || {}).length >= 3;
                        break;
                }
                
                if (earned) {
                    progress.achievements.push(achievement.id);
                    progress.totalXP += achievement.xp;
                    newAchievements.push(achievement);
                }
            }
        });
        
        if (newAchievements.length > 0) {
            saveProgress(progress);
            showAchievementAnimation(newAchievements);
        }
        
        return newAchievements;
    }

    function showAchievementAnimation(achievements) {
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                const overlay = document.createElement('div');
                overlay.className = 'achievement-overlay';
                overlay.innerHTML = `
                    <div class="achievement-content">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <div class="achievement-text">
                            <h3>Achievement Unlocked!</h3>
                            <div class="achievement-name">${achievement.name}</div>
                            <div class="achievement-description">${achievement.description}</div>
                            <div class="achievement-xp">+${achievement.xp} XP</div>
                        </div>
                    </div>
                `;
                document.body.appendChild(overlay);
                
                setTimeout(() => overlay.classList.add('show'), 10);
                setTimeout(() => {
                    overlay.classList.remove('show');
                    setTimeout(() => overlay.remove(), 300);
                }, 3000);
            }, index * 3500); // Stagger achievements
        });
    }

    function getAchievements(progress) {
        return ACHIEVEMENTS.map(achievement => ({
            ...achievement,
            unlocked: progress.achievements.includes(achievement.id)
        }));
    }

    // ========================================
    // THEME MANAGEMENT
    // ========================================

    function applyTheme(themeName) {
        const root = document.documentElement;
        
        // Reset all theme variables
        root.style.removeProperty('--subject-primary');
        root.style.removeProperty('--subject-secondary');
        root.style.removeProperty('--subject-accent');
        
        // Apply selected theme
        switch(themeName) {
            case 'vibrant':
                root.style.setProperty('--physics-primary', 'var(--vibrant-physics)');
                root.style.setProperty('--chemistry-primary', 'var(--vibrant-chemistry)');
                root.style.setProperty('--math-primary', 'var(--vibrant-math)');
                break;
            case 'pastel':
                root.style.setProperty('--physics-primary', 'var(--pastel-physics)');
                root.style.setProperty('--chemistry-primary', 'var(--pastel-chemistry)');
                root.style.setProperty('--math-primary', 'var(--pastel-math)');
                break;
            case 'professional':
                root.style.setProperty('--physics-primary', 'var(--professional-physics)');
                root.style.setProperty('--chemistry-primary', 'var(--professional-chemistry)');
                root.style.setProperty('--math-primary', 'var(--professional-math)');
                break;
            default: // original
                // Use default CSS variables
                break;
        }
        
        // Save theme preference
        localStorage.setItem('questTheme', themeName);
    }

    function initThemeSelector() {
        console.log('Theme selector initialized');
        const savedTheme = localStorage.getItem('questTheme') || 'original';
        
        // Wait for DOM to be ready and ensure header exists
        function initializeWhenReady() {
            const header = document.querySelector('.quest-header');
            if (header) {
                console.log('Header found, creating theme selector');
                createThemeSelector(savedTheme);
            } else {
                setTimeout(initializeWhenReady, 100);
            }
        }
        
        // Start initialization
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeWhenReady);
        } else {
            initializeWhenReady();
        }
    }
    
    function createThemeSelector(savedTheme) {
        console.log('Creating theme selector UI');
        
        // Create compact theme selector UI
        const themeSelector = document.createElement('div');
        themeSelector.className = 'theme-selector';
        themeSelector.innerHTML = `
            <div class="theme-header">
                <h4>🎨 Theme</h4>
                <button class="theme-close-btn" aria-label="Close theme panel">✕</button>
            </div>
            <div class="theme-options">
                <div class="theme-option active" data-theme="original" title="Original Theme"></div>
                <div class="theme-option" data-theme="vibrant" title="Vibrant Theme"></div>
                <div class="theme-option" data-theme="pastel" title="Pastel Theme"></div>
                <div class="theme-option" data-theme="professional" title="Professional Theme"></div>
            </div>
        `;
        
        // Add theme panel toggle button to header
        const themePanelToggle = document.createElement('button');
        themePanelToggle.className = 'theme-panel-toggle';
        themePanelToggle.setAttribute('aria-label', 'Toggle theme panel');
        themePanelToggle.innerHTML = '🎨';
        
        // Add theme selector to body
        document.body.appendChild(themeSelector);
        
        // Add theme panel toggle button to header FIRST
        const header = document.querySelector('.quest-header');
        if (header) {
            console.log('Header found, adding theme panel toggle');
            header.appendChild(themePanelToggle);
            
            // Position theme panel dynamically relative to theme panel toggle button
            function positionThemePanel() {
                const rect = themePanelToggle.getBoundingClientRect();
                themeSelector.style.top = (rect.bottom + 5) + 'px';
                themeSelector.style.right = (window.innerWidth - rect.right + 10) + 'px';
            }
            
            // Position initially and on window resize
            positionThemePanel();
            window.addEventListener('resize', positionThemePanel);
        } else {
            console.log('Header not found');
        }
            
            // Click to toggle theme panel
            themePanelToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const isVisible = themeSelector.classList.contains('show');
                if (isVisible) {
                    themeSelector.classList.remove('show');
                } else {
                    positionThemePanel();
                    themeSelector.classList.add('show');
                }
            });
            
            // Close button functionality
            themeSelector.querySelector('.theme-close-btn').addEventListener('click', function(e) {
                e.stopPropagation();
                themeSelector.classList.remove('show');
            });
            
            // Close panel when clicking outside
            document.addEventListener('click', function(e) {
                if (!themeSelector.contains(e.target) && !themePanelToggle.contains(e.target)) {
                    themeSelector.classList.remove('show');
                }
            });
            

        
        // Set active theme
        setActiveTheme(savedTheme);
        
        // Add event listeners
        themeSelector.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.dataset.theme;
                setActiveTheme(theme);
                applyTheme(theme);
                playSound('click');
                // Hide theme panel after selection
                themeSelector.classList.remove('show');
            });
        });
        
        // Add keyboard shortcut for theme panel (T key)
        document.addEventListener('keydown', function(e) {
            if (e.key === 't' || e.key === 'T') {
                const isVisible = themeSelector.classList.contains('show');
                if (isVisible) {
                    themeSelector.classList.remove('show');
                } else {
                    positionThemePanel();
                    themeSelector.classList.add('show');
                }
                e.preventDefault();
            }
        });
    }

    function setActiveTheme(themeName) {
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === themeName) {
                option.classList.add('active');
            }
        });
    }

    // ========================================
    // INTERACTIVE LEARNING ELEMENTS
    // ========================================

    function initDragDrop() {
        const dragItems = document.querySelectorAll('.drag-item');
        const dropZones = document.querySelectorAll('.drop-zone');
        
        dragItems.forEach(item => {
            item.setAttribute('draggable', 'true');
            
            item.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', this.textContent);
                this.classList.add('dragging');
            });
            
            item.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
        });
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('active');
            });
            
            zone.addEventListener('dragleave', function() {
                this.classList.remove('active');
            });
            
            zone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('active');
                
                const data = e.dataTransfer.getData('text/plain');
                const correctAnswer = this.dataset.correct;
                const feedback = document.getElementById(this.dataset.feedback);
                
                if (data === correctAnswer) {
                    this.innerHTML = `<div style="color: #4caf50; font-weight: bold;">✓ ${data}</div>`;
                    if (feedback) {
                        feedback.className = 'interactive-feedback feedback-correct';
                        feedback.textContent = 'Correct! Well done!';
                        feedback.style.display = 'block';
                    }
                } else {
                    this.innerHTML = `<div style="color: #f44336; font-weight: bold;">✗ ${data}</div>`;
                    if (feedback) {
                        feedback.className = 'interactive-feedback feedback-incorrect';
                        feedback.textContent = `Incorrect. Try again! Correct answer: ${correctAnswer}`;
                        feedback.style.display = 'block';
                    }
                }
            });
        });
    }

    function initInteractiveQuiz() {
        const quizzes = document.querySelectorAll('.interactive-quiz');
        quizzes.forEach(quiz => {
            const checkBtn = quiz.querySelector('.check-quiz-btn');
            if (checkBtn) {
                checkBtn.addEventListener('click', function() {
                    const correctAnswers = quiz.querySelectorAll('[data-correct="true"]');
                    const userAnswers = quiz.querySelectorAll('input:checked');
                    
                    let score = 0;
                    correctAnswers.forEach(answer => {
                        if (userAnswers.some(u => u.value === answer.value)) {
                            score++;
                        }
                    });
                    
                    const feedback = quiz.querySelector('.quiz-feedback');
                    if (feedback) {
                        const percentage = Math.round((score / correctAnswers.length) * 100);
                        feedback.textContent = `Score: ${score}/${correctAnswers.length} (${percentage}%)`;
                        feedback.style.display = 'block';
                        
                        if (percentage >= 80) {
                            feedback.className = 'quiz-feedback feedback-correct';
                        } else {
                            feedback.className = 'quiz-feedback feedback-incorrect';
                        }
                    }
                });
            }
        });
    }

    // ========================================
    // EXPORT
    // ========================================

    window.QuestSystem = {
        // Data
        QUEST_DATA,
        XP_PER_QUEST,
        XP_PER_LEVEL,
        
        // State
        getProgress,
        saveProgress,
        
        // Logic
        isSideQuestUnlocked,
        isBigQuestUnlocked,
        completeSideQuest,
        
        // UI
        getStatusIcon,
        getBigQuestStatus,
        getSubjectProgress,
        goToQuest,
        goToSideQuest,
        updateProgressDisplay,
        updateHomePageProgress,
        toggleQuest,
        
        // Bookmarks & Notes
        getBookmarkedQuests,
        isBookmarked,
        toggleBookmark,
        getNote,
        saveNote,
        deleteNote,
        
        // Streak
        updateStreak,
        
        // Achievements
        checkAchievements,
        getAchievements,
        
        // Advanced Quests
        getAvailableAdvancedQuests,
        isAdvancedQuestUnlocked,
        completeAdvancedQuest,
        
        // Theme Management
        applyTheme,
        initThemeSelector,
        
        // Interactive Learning
        initDragDrop,
        initInteractiveQuiz,
        
        // Init
        init
    };

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
