import React from 'react';
import styles from '../styles/Header.module.scss';
import { Sparkles, Feather } from 'lucide-react';

export default function Header({
  activeSection,
  onNavigate,
  onOpenCommission,
  currentFolio = 'FOLIO 01 / 04'
}) {
  return (
    <header className={styles.headerBar}>
      <div className={styles.brandArea} onClick={() => onNavigate('cover')}>
        <img
          src="https://lh3.googleusercontent.com/aida/AEtjO1U4m-b6u83X51137svMms5Ei23oT1zhzUd23NJkYAXZxc36FHzazW2RecaqrvFcjSPwRoPV48NP21xN82bx7Tkj2o1xMRg5vJpW3CR7NoHXda54vTpD4Ig-4l2a9lj3TsouZNZoJWqPxTYeIgmy4w1NqjesWkmUUmrINHfOsQ4LfvtxbhH0NdxZqgLtnyHdNLDpbdVYnJqeSmfa7kJHwohnMT3fMJU6LrhoaXgXkN4VkA"
          alt="."
          className={styles.crestLogo}
        />
        <div className={styles.brandText}>
          <span className={styles.brandTitle}>El Vestidor Fantástico</span>
          {/* <span className={styles.brandTagline}>Atelier Aurelia • Vol. IV</span> */}
        </div>
      </div>

      <nav className={styles.navigationMenu} aria-label="Navegación Editorial">
        <button
          type="button"
          className={`${styles.navLink} ${activeSection === 'cover' ? styles.active : ''}`}
          onClick={() => onNavigate('cover')}
        >
          Portada
        </button>
        <button
          type="button"
          className={`${styles.navLink} ${activeSection === 'chapters' ? styles.active : ''}`}
          onClick={() => onNavigate('chapters')}
        >
          Capítulos
        </button>
        <button
          type="button"
          className={`${styles.navLink} ${activeSection === 'gallery' ? styles.active : ''}`}
          onClick={() => onNavigate('gallery')}
        >
          Galería & Plano
        </button>
        <button
          type="button"
          className={`${styles.navLink} ${activeSection === 'commissions' ? styles.active : ''}`}
          onClick={() => onNavigate('commissions')}
        >
          Encargos
        </button>
      </nav>

      <div className={styles.headerActions}>
        <div className={styles.folioBadge}>
          <Feather size={14} />
          <span>{currentFolio}</span>
        </div>

        <button
          type="button"
          className={styles.acquireBtn}
          onClick={() => onOpenCommission()}
        >
          <Sparkles size={14} />
          <span>Cotizar Pieza</span>
        </button>
      </div>
    </header>
  );
}
