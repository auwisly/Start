import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { StudentDashboard } from "./components/StudentDashboard";
import { HRDashboard } from "./components/HRDashboard";
import { mockStudents, mockHR } from "./data/mockData";

function App() {
  const [userRole, setUserRole] = useState<'student' | 'hr' | null>(null);

  // Используем первого студента и HR из mock данных
  const currentStudent = mockStudents[0];
  const currentHR = mockHR[0];

  const handleSelectRole = (role: 'student' | 'hr') => {
    setUserRole(role);
  };

  const handleBackToLanding = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <LandingPage onSelectRole={handleSelectRole} />;
  }

  return (
    <div>
      {/* Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackToLanding}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Контур.Старт
          </button>
          <div className="text-sm text-gray-600">
            {userRole === 'student' ? 'Панель студента' : 'Панель HR'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {userRole === 'student' ? (
        <StudentDashboard student={currentStudent} />
      ) : (
        <HRDashboard hr={currentHR} />
      )}
    </div>
  );
}

export default App;
