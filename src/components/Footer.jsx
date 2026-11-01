import React from 'react';
import styles from '../styles/Footer.module.scss';
import { Feather, Shield, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate, onOpenCommission }) {
  return (
    <footer className={styles.editorialFooter}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerColumns}>
          <div className={styles.colBrand}>
            <h3 className={styles.brandName}>El Vestidor</h3>
            <p className={styles.brandDescription}>
              Monografía artística de alta costura, armaduras de fantasía ceremonial y sastrería de salón
              para cine de época, exposiciones museísticas y colecciones privadas.
            </p>
            <span className={styles.monographNote}>
              Monografía N° 04 — Edición Privada de Coleccionista
            </span>
          </div>

          <div className={styles.colNavigation}>
            <h4 className={styles.colTitle}>Secciones del Archivo</h4>
            <ul className={styles.linksList}>
              <li>
                <button type="button" onClick={() => onNavigate('cover')}>
                  00. Portada & Frontispicio
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('chapters')}>
                  01. Sumario de Capítulos (Pliego)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('gallery')}>
                  02. Galería & Mapeo de Patronaje
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenCommission()}>
                  03. Formulario de Encargo Privado
                </button>
              </li>
            </ul>
          </div>

          <div className={styles.colColophon}>
            <div className={styles.colophonCard}>
              <span className={styles.colophonTitle}>Colofón & Registro</span>
              <p className={styles.colophonText}>
                Publicación digital encuadernada con tipografías Playfair Display, Cinzel y Hanken Grotesk.
                Concebida y curada en Barcelona bajo la dirección artística de Maestra Aurelia Vane.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottomFolioBar}>
          <div className="flex items-center gap-2">
            <Feather size={14} className="text-primary" />
            <span className={styles.folioVol}>FOLIO VOL. IV // CATALOGUE RAISONNÉ</span>
          </div>
          <span>© 2024 Atelier Aurelia — El Vestidor. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
