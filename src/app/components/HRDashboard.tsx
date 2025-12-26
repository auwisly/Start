import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { 
  Briefcase, 
  Users, 
  MessageSquare, 
  PlusCircle,
  Search,
  CheckCircle2,
  Clock
} from "lucide-react";
import { HR, mockVacancies, mockStudents, mockApplications, Student } from "../data/mockData";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface HRDashboardProps {
  hr: HR;
}

export function HRDashboard({ hr }: HRDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("vacancies");
  const [filterLevel, setFilterLevel] = useState<string>("all");

  // Вакансии компании
  const companyVacancies = mockVacancies.filter(v => v.company.id === hr.company.id);

  // Студенты с откликами
  const applicants = mockApplications.map(app => {
    const student = mockStudents.find(s => s.id === app.studentId);
    const vacancy = mockVacancies.find(v => v.id === app.vacancyId);
    return { ...app, student, vacancy };
  }).filter(app => app.vacancy?.company.id === hr.company.id);

  // Фильтрация студентов по уровню
  const filteredStudents = filterLevel === "all" 
    ? mockStudents 
    : mockStudents.filter(s => s.level === parseInt(filterLevel));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>{hr.company.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1>{hr.name}</h1>
                <p className="text-muted-foreground">{hr.company.name}</p>
              </div>
            </div>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Создать вакансию
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Активные вакансии</p>
                  <p className="text-2xl font-semibold">{companyVacancies.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Всего откликов</p>
                  <p className="text-2xl font-semibold">
                    {companyVacancies.reduce((sum, v) => sum + v.applications, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">На рассмотрении</p>
                  <p className="text-2xl font-semibold">
                    {applicants.filter(a => a.status === 'reviewing').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Сообщения</p>
                  <p className="text-2xl font-semibold">2</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vacancies">Мои вакансии</TabsTrigger>
            <TabsTrigger value="candidates">Банк кандидатов</TabsTrigger>
            <TabsTrigger value="applications">Отклики</TabsTrigger>
          </TabsList>

          <TabsContent value="vacancies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Активные вакансии</CardTitle>
                <CardDescription>
                  Управление вакансиями вашей компании
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyVacancies.map((vacancy) => (
                  <Card key={vacancy.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{vacancy.title}</CardTitle>
                          <CardDescription>{vacancy.skillArea}</CardDescription>
                        </div>
                        <Badge>Требуется уровень {vacancy.requiredLevel}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{vacancy.description}</p>
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Требования:</p>
                        <div className="flex flex-wrap gap-2">
                          {vacancy.requirements.map((req, idx) => (
                            <Badge key={idx} variant="outline">{req}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Откликов: {vacancy.applications}</span>
                          <span>Опубликовано: {new Date(vacancy.postedAt).toLocaleDateString('ru-RU')}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Редактировать</Button>
                          <Button size="sm">Просмотреть отклики</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Банк кандидатов</CardTitle>
                <CardDescription>
                  Студенты с подтверждёнными навыками
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input 
                      placeholder="Поиск по навыкам..." 
                      className="w-full"
                      prefix={<Search className="h-4 w-4" />}
                    />
                  </div>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Уровень" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все уровни</SelectItem>
                      <SelectItem value="2">Уровень 2</SelectItem>
                      <SelectItem value="3">Уровень 3</SelectItem>
                      <SelectItem value="4">Уровень 4</SelectItem>
                      <SelectItem value="5">Уровень 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredStudents.map((student: Student) => (
                    <Card key={student.id} className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{student.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{student.name}</CardTitle>
                              <CardDescription>{student.bio}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-base">
                            Уровень {student.level}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Навыки:</p>
                          <div className="flex flex-wrap gap-2">
                            {student.skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Пройденные тесты:</p>
                          {student.tests.map((test, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{test.testName}</span>
                              <Badge variant="outline" className="ml-auto">
                                {Math.round((test.score / test.maxScore) * 100)}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Просмотреть профиль</Button>
                          <Button size="sm">Пригласить</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Отклики на вакансии</CardTitle>
                <CardDescription>
                  Кандидаты, откликнувшиеся на ваши вакансии
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicants.map((app) => {
                  if (!app.student || !app.vacancy) return null;
                  
                  const statusColors = {
                    pending: 'bg-gray-100 text-gray-800',
                    reviewing: 'bg-blue-100 text-blue-800',
                    interview: 'bg-green-100 text-green-800',
                    rejected: 'bg-red-100 text-red-800',
                    accepted: 'bg-green-100 text-green-800'
                  };

                  const statusLabels = {
                    pending: 'Новый',
                    reviewing: 'На рассмотрении',
                    interview: 'Приглашён',
                    rejected: 'Отклонён',
                    accepted: 'Принят'
                  };

                  return (
                    <Card key={app.id} className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{app.student.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{app.student.name}</CardTitle>
                              <CardDescription>{app.vacancy.title}</CardDescription>
                            </div>
                          </div>
                          <Badge className={statusColors[app.status]}>
                            {statusLabels[app.status]}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Уровень кандидата</p>
                            <Badge variant="outline">Уровень {app.student.level}</Badge>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">Дата отклика</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(app.appliedAt).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Навыки:</p>
                          <div className="flex flex-wrap gap-2">
                            {app.student.skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Результаты тестов:</p>
                          {app.student.tests.map((test, idx) => (
                            <div key={idx} className="mb-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{test.testName}</span>
                                <span>{test.score} / {test.maxScore}</span>
                              </div>
                              <Progress value={(test.score / test.maxScore) * 100} />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Профиль</Button>
                          <Button size="sm">Написать сообщение</Button>
                          {app.status === 'reviewing' && (
                            <Button size="sm" variant="default">Пригласить на интервью</Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
