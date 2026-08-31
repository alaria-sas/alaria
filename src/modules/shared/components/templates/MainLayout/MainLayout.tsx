import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from 'modules/shared/components/organisms/Sidebar/Sidebar';
import CanvasLogo from 'modules/shared/components/atoms/CanvasLogo/CanvasLogo';
import { useAppSelector } from 'modules/shared/hooks/useAppDispatch';
import { ROUTES } from 'modules/shared/constants/routes';
import './MainLayout.scss';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logoSize = scrolled ? (isMobile ? 28 : 34) : (isMobile ? 46 : 66);

  return (
    <div className="main-layout">
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'sidebar-overlay--visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top bar */}
      <header className="main-layout__topbar">
        <button
          className="main-layout__menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Menú"
          title="Menú"
        >
          <Menu size={22} />
          <span className="main-layout__menu-label">Menú</span>
        </button>

        <Link
          to={ROUTES.PROPERTIES}
          className={`main-layout__logo ${scrolled ? 'main-layout__logo--compact' : ''}`}
        >
          <div className="main-layout__logo-canvas">
            <CanvasLogo size={logoSize} color="#0B1E24" flutter={7} />
          </div>
        </Link>

        {isAuthenticated && user && (
          <span className="main-layout__user-name">Hola {user.full_name.split(' ')[0]}!</span>
        )}
      </header>

      <main className="main-layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
