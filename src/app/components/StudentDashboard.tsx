import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  BookOpen, 
  Briefcase, 
  MessageSquare, 
  User, 
  Award,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Student, mockVacancies, mockTests, Vacancy, Test } from "../data/mockData";

interface StudentDashboardProps {
  student: Student;
}

export function StudentDashboard({ student }: StudentDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("tests");

  // Вакансии, доступные для студента (уровень не выше его)
  const availableVacancies = mockVacancies.filter(v => v.requiredLevel <= student.level);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>{student.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1>{student.name}</h1>
                <p className="text-muted-foreground">{student.bio || student.email}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Уровень {student.level}
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Пройдено тестов</p>
                  <p className="text-2xl font-semibold">{student.tests.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Доступно вакансий</p>
                  <p className="text-2xl font-semibold">{availableVacancies.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Средний балл</p>
                  <p className="text-2xl font-semibold">
                    {student.tests.length > 0
                      ? Math.round(student.tests.reduce((acc, t) => acc + (t.score / t.maxScore) * 100, 0) / student.tests.length)
                      : 0}
                    %
                  </p>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tests">Тесты</TabsTrigger>
            <TabsTrigger value="vacancies">Вакансии</TabsTrigger>
            <TabsTrigger value="results">Результаты</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Доступные тесты</CardTitle>
                <CardDescription>
                  Пройдите тесты, чтобы подтвердить свои навыки и получить доступ к вакансиям
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTests.map((test: Test) => (
                  <Card key={test.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{test.name}</CardTitle>
                          <CardDescription>{test.skillArea}</CardDescription>
                        </div>
                        <Badge variant={student.tests.some(t => t.testId === test.id) ? "default" : "outline"}>
                          Уровень {test.level}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{test.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {test.duration} мин
                          </span>
                          <span>{test.questions} вопросов</span>
                        </div>
                        {student.tests.some(t => t.testId === test.id) ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Пройден
                          </Badge>
                        ) : (
                          <Button>Начать тест</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vacancies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Доступные вакансии</CardTitle>
                <CardDescription>
                  Вакансии, доступные для вашего уровня навыков
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableVacancies.map((vacancy: Vacancy) => (
                  <Card key={vacancy.id} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{vacancy.title}</CardTitle>
                          <CardDescription>{vacancy.company.name}</CardDescription>
                        </div>
                        <Badge>Уровень {vacancy.requiredLevel}</Badge>
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
                        <span className="text-sm text-muted-foreground">
                          Откликов: {vacancy.applications}
                        </span>
                        <Button>Откликнуться</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Результаты тестов</CardTitle>
                <CardDescription>
                  История ваших тестирований и обратная связь
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {student.tests.map((result) => (
                  <Card key={result.id} className={`border-l-4 ${result.passed ? 'border-l-green-500' : 'border-l-red-500'}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{result.testName}</CardTitle>
                          <CardDescription>{result.skillArea}</CardDescription>
                        </div>
                        {result.passed ? (
                          <Badge variant="default" className="gap-1 bg-green-600">
                            <CheckCircle2 className="h-3 w-3" />
                            Сдан
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            Не сдан
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Результат</span>
                            <span>{result.score} / {result.maxScore}</span>
                          </div>
                          <Progress value={(result.score / result.maxScore) * 100} />
                        </div>
                        {result.feedback && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm font-medium mb-2">Обратная связь:</p>
                            <p className="text-sm text-muted-foreground">{result.feedback}</p>
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Дата прохождения: {new Date(result.completedAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Мой профиль</CardTitle>
                <CardDescription>
                  Информация о вас, которую видят работодатели
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Имя</label>
                  <p className="text-muted-foreground">{student.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-muted-foreground">{student.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">О себе</label>
                  <p className="text-muted-foreground">{student.bio || 'Не заполнено'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Навыки</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {student.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Текущий уровень</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      Уровень {student.level}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline">Редактировать профиль</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
