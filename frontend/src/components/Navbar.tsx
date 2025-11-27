import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore, applyTheme } from '@/context/themeStore';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const isMobile = useIsMobile();

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const menuItems = [
    { label: 'الرئيسية', href: '/', icon: '🏠' },
    { label: 'الدوريات', href: '/leagues', icon: '🏆' },
    { label: 'المنتخبات', href: '/teams', icon: '👥' },
    { label: 'الأخبار', href: '/news', icon: '📰' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 dark:from-dark-800 dark:via-dark-900 dark:to-dark-800 text-white shadow-lg border-b border-primary-600 dark:border-dark-700 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
              <div className="w-11 h-11 bg-gradient-to-br from-accent-red via-orange-500 to-accent-red rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-xl transition-shadow transform group-hover:rotate-6">
                ⚽
              </div>
              <div className="hidden sm:block">
                <div className="font-black text-xl leading-tight text-white">YallaGoal</div>
                <div className="text-xs text-blue-100 font-medium">يلا جول</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          {!isMobile && (
            <div className="hidden md:flex gap-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className="nav-link group relative px-4 py-2 text-sm font-semibold text-white hover:text-blue-100 transition-colors duration-200"
                  >
                    <span className="flex items-center gap-2">
                      <span className="group-hover:scale-125 transition-transform">{item.icon}</span>
                      {item.label}
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent-red to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={() => toggleTheme()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 hover:bg-white/20 rounded-lg transition-colors duration-200 group"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-lg inline-block"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <motion.span
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl inline-block"
                >
                  {isMenuOpen ? '✕' : '☰'}
                </motion.span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pb-4 border-t border-white/10 bg-gradient-to-b from-primary-600/80 to-primary-700/80"
            >
              {menuItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-sm font-medium text-white group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-lg group-hover:scale-125 transition-transform">{item.icon}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
