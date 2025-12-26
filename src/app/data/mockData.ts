// Mock данные для платформы Контур.Старт

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'hr';
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  skills: string[];
  level: number; // 1-5
  tests: TestResult[];
  bio?: string;
  portfolio?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
}

export interface HR extends User {
  role: 'hr';
  company: Company;
}

export interface TestResult {
  id: string;
  testId: string;
  testName: string;
  skillArea: string;
  score: number;
  maxScore: number;
  level: number; // 1-5
  passed: boolean;
  completedAt: Date;
  feedback?: string;
}

export interface Vacancy {
  id: string;
  title: string;
  company: Company;
  description: string;
  requirements: string[];
  requiredLevel: number; // 1-5
  skillArea: string;
  postedAt: Date;
  applications: number;
}

export interface Application {
  id: string;
  vacancyId: string;
  studentId: string;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  appliedAt: Date;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  text: string;
  sentAt: Date;
  read: boolean;
}

// Mock компании
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'СКБ Контур',
    description: 'Разрабатываем облачные сервисы для бизнеса',
  },
  {
    id: '2',
    name: 'Яндекс',
    description: 'Интернет-компания',
  },
  {
    id: '3',
    name: 'VK',
    description: 'Социальные сети и технологии',
  },
];

// Mock студенты
export const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'Анна Иванова',
    email: 'anna@example.com',
    role: 'student',
    skills: ['React', 'TypeScript', 'Node.js'],
    level: 3,
    bio: 'Фронтенд-разработчик, 3 курс МГУ',
    tests: [
      {
        id: 't1',
        testId: 'test1',
        testName: 'Frontend базовый',
        skillArea: 'Frontend Development',
        score: 85,
        maxScore: 100,
        level: 3,
        passed: true,
        completedAt: new Date('2024-12-01'),
        feedback: 'Отличное знание React и TypeScript',
      },
    ],
  },
  {
    id: 's2',
    name: 'Дмитрий Петров',
    email: 'dmitry@example.com',
    role: 'student',
    skills: ['Python', 'Django', 'PostgreSQL'],
    level: 4,
    bio: 'Backend-разработчик, 4 курс СПбГУ',
    tests: [
      {
        id: 't2',
        testId: 'test2',
        testName: 'Backend продвинутый',
        skillArea: 'Backend Development',
        score: 92,
        maxScore: 100,
        level: 4,
        passed: true,
        completedAt: new Date('2024-12-05'),
        feedback: 'Превосходное владение Python и базами данных',
      },
    ],
  },
];

// Mock HR
export const mockHR: HR[] = [
  {
    id: 'hr1',
    name: 'Елена Смирнова',
    email: 'elena@skbkontur.ru',
    role: 'hr',
    company: mockCompanies[0],
  },
];

// Mock вакансии
export const mockVacancies: Vacancy[] = [
  {
    id: 'v1',
    title: 'Стажёр Frontend-разработчик',
    company: mockCompanies[0],
    description: 'Ищем талантливого студента для работы над веб-приложениями',
    requirements: ['React', 'TypeScript', 'Git'],
    requiredLevel: 3,
    skillArea: 'Frontend Development',
    postedAt: new Date('2024-12-10'),
    applications: 12,
  },
  {
    id: 'v2',
    title: 'Стажёр Backend-разработчик',
    company: mockCompanies[1],
    description: 'Разработка серверной части высоконагруженных систем',
    requirements: ['Python', 'Django', 'SQL'],
    requiredLevel: 4,
    skillArea: 'Backend Development',
    postedAt: new Date('2024-12-12'),
    applications: 8,
  },
  {
    id: 'v3',
    title: 'Стажёр Data Analyst',
    company: mockCompanies[2],
    description: 'Анализ данных и построение моделей',
    requirements: ['Python', 'Pandas', 'SQL'],
    requiredLevel: 2,
    skillArea: 'Data Science',
    postedAt: new Date('2024-12-15'),
    applications: 15,
  },
];

// Mock отклики
export const mockApplications: Application[] = [
  {
    id: 'a1',
    vacancyId: 'v1',
    studentId: 's1',
    status: 'reviewing',
    appliedAt: new Date('2024-12-18'),
  },
  {
    id: 'a2',
    vacancyId: 'v2',
    studentId: 's2',
    status: 'interview',
    appliedAt: new Date('2024-12-19'),
  },
];

// Mock сообщения
export const mockMessages: Message[] = [
  {
    id: 'm1',
    fromId: 'hr1',
    toId: 's1',
    text: 'Здравствуйте! Мы рассмотрели ваш профиль и хотели бы пригласить вас на собеседование.',
    sentAt: new Date('2024-12-20T10:00:00'),
    read: true,
  },
  {
    id: 'm2',
    fromId: 's1',
    toId: 'hr1',
    text: 'Добрый день! Спасибо за приглашение, я с удовольствием приду.',
    sentAt: new Date('2024-12-20T14:30:00'),
    read: true,
  },
];

// Доступные тесты
export interface Test {
  id: string;
  name: string;
  skillArea: string;
  level: number;
  duration: number; // в минутах
  description: string;
  questions: number;
}

export const mockTests: Test[] = [
  {
    id: 'test1',
    name: 'Frontend базовый',
    skillArea: 'Frontend Development',
    level: 3,
    duration: 60,
    description: 'Тестирование знаний React, TypeScript, HTML/CSS',
    questions: 25,
  },
  {
    id: 'test2',
    name: 'Backend продвинутый',
    skillArea: 'Backend Development',
    level: 4,
    duration: 90,
    description: 'Тестирование знаний Python, Django, PostgreSQL, архитектуры',
    questions: 30,
  },
  {
    id: 'test3',
    name: 'Data Science начальный',
    skillArea: 'Data Science',
    level: 2,
    duration: 45,
    description: 'Основы Python, Pandas, визуализация данных',
    questions: 20,
  },
];
