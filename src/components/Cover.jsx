import React from 'react';
import styles from '../styles/Cover.module.scss';
import { BookOpen, Sparkles, Shield, ChevronDown } from 'lucide-react';

export default function Cover({ onExploreSpread, onSelectChapter }) {
  return (
    <section className={styles.coverSection} id="cover">
      {/* Background backdrop with high-couture imagery */}
      <div className={styles.coverBackdrop}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOeBr6is2qBhuAlgdViUlZxkUbkzXe00b8vcBusn0RaiwMe6KgSl7VIgIoZTGEzLi4S66Ri6y42PeJtzubNC1wWUJc7xvTxKrTJB555TXsNtJ1UQRy1nZek-CBkmvGZc2EqQNI-e-mVV8V93Fhldx_xCVme3husB3hUT4iIfk0oWjQZp5FM-MXiFxFb3rcYUbVaxIuHaahZIDA_eeApVoe3e1dXup8ov1-J4yFc1g5"
          alt="Valkyrie Sovereign Haute Couture Armor"
          className={styles.backdropImage}
        />
      </div>

      {/* Luxury Magazine Cover Plate */}
      <div className={styles.coverPlate}>
        {/* Top Folio & Barcode Header */}
        <div className={styles.coverTopBar}>
          <div className={styles.issueBadge}>
            <span className={styles.volText}>VOLUMEN IV // COLECCIÓN PRIVADA</span>
            <span className={styles.seasonText}>HAUTE ARMURERIE & FANTASY REGALIA</span>
          </div>

          <Shield className={styles.crestIcon} />

          <div className={styles.barcodeArea}>
            <span className={styles.priceTag}>N° 084 • ARCHIVO ATELIER</span>
            <div className={styles.barcodeLines} aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Masthead */}
        <div className={styles.mastheadWrapper}>
          <h1 className={styles.mastheadTitle}>El Vestidor</h1>
          <p className={styles.subTitle}>
            MONOGRAFÍA DE ALTA COSTURA & ARMADURAS DE FANTASÍA
          </p>
        </div>

        {/* Center/Bottom Cover Headlines */}
        <div className={styles.coverBody}>
          <div className={styles.leftHeadlines}>
            <div className={styles.coverHeadlineItem}>
              <span className={styles.headlineNumber}>I. TERCIOPELO ASTRAL</span>
              <h3 className={styles.headlineTitle}>320.000 Puntadas Venecianas</h3>
              <p className={styles.headlineSnippet}>
                El bordado en oro francés que redefine la caída escénica en capas pesadas.
              </p>
            </div>

            <div className={styles.coverHeadlineItem}>
              <span className={styles.headlineNumber}>II. SINFONÍA DE CHAPA & WORBLA</span>
              <h3 className={styles.headlineTitle}>La Armadura Milanesa Revisitada</h3>
              <p className={styles.headlineSnippet}>
                Termoformado con memoria de torsión activa y acabados en pan de oro 24K.
              </p>
            </div>

            <div className={styles.coverHeadlineItem}>
              <span className={styles.headlineNumber}>III. DOSSIER DE GREMIO</span>
              <h3 className={styles.headlineTitle}>El Arte del Encargo Anatómico</h3>
              <p className={styles.headlineSnippet}>
                Protocolo de confección con ajuste digital 3D y piezas numeradas.
              </p>
            </div>
          </div>

          <div className={styles.rightFeature}>
            <span className={styles.specimenCode}>PIEZA PRINCIPAL • OPUS 084</span>
            <h2 className={styles.mainHeroName}>Valkyrie Sovereign</h2>
            <p className={styles.heroDescriptor}>
              Cuirass & Celestial Velvet Regalia. Fusión irrepetible de forja sintética en frío y corsetería de escamas cinceladas.
            </p>
          </div>
        </div>

        {/* Floating CTA Button */}
        <div className={styles.floatingCtaContainer}>
          <button
            type="button"
            className={styles.openSpreadBtn}
            onClick={onExploreSpread}
            aria-label="Abrir Pliego Editorial de la Revista"
          >
            <BookOpen className={styles.btnIcon} size={18} />
            <span>Abrir Pliego Editorial</span>
            <ChevronDown className={styles.btnIcon} size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
