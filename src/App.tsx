import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SplashScreen } from './components/SplashScreen';
import { BadgeCreator } from './components/BadgeCreator';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeToggle } from './components/ThemeToggle';
import './i18n/i18n';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <LanguageSwitcher />
        <ThemeToggle />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/badge" element={<BadgeCreator />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;