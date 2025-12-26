import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Users, Target, Award, MessageSquare } from "lucide-react";

interface LandingPageProps {
  onSelectRole: (role: 'student' | 'hr') => void;
}

export function LandingPage({ onSelectRole }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4 text-blue-600">Контур.Старт</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Платформа для связи студентов и работодателей через объективную оценку навыков
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectRole('student')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Для студентов
              </CardTitle>
              <CardDescription>
                Покажите свои навыки и получите доступ к стажировкам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Честный и подробный разбор ваших работ</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Один тест - множество возможностей</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Ценный фидбэк для профессионального роста</span>
                </li>
              </ul>
              <Button className="w-full mt-4" onClick={() => onSelectRole('student')}>
                Начать как студент
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSelectRole('hr')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-indigo-600" />
                Для HR
              </CardTitle>
              <CardDescription>
                Находите мотивированных кандидатов с подтверждёнными навыками
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Объективное тестирование с прокторингом</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Фильтрация по уровню навыков</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Короткая очередь мотивированных кандидатов</span>
                </li>
              </ul>
              <Button className="w-full mt-4" variant="outline" onClick={() => onSelectRole('hr')}>
                Начать как HR
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Для студентов</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Платформа ценит ваше время и старания. Получите подробный анализ навыков, 
                а не просто "спасибо, мы свяжемся".
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Для HR</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Полностью берём на себя первичный отбор. Получайте только проверенных 
                и мотивированных кандидатов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Прозрачность</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Честная оценка навыков без возможности списать. Реальные компетенции, 
                а не красивое резюме.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
