import React, { useState } from 'react';
import styles from '../styles/CosplayCard.module.scss';
import { specimensData } from '../data/monographData';
import {
  Eye,
  ZoomIn,
  Compass,
  Layers,
  History,
  ShieldCheck,
  ChevronDown,
  Quote,
  Sparkles,
  Download,
  ArrowRight,
  Maximize2
} from 'lucide-react';

export default function CosplayCard({
  activeSpecimenId = 'opus-084',
  onSelectSpecimen,
  onOpenCommission
}) {
  const [currentView, setCurrentView] = useState('final'); // 'final' | 'macro' | 'blueprint'
  const [openAccordions, setOpenAccordions] = useState({
    materials: true,
    techniques: false,
    preservation: false
  });
  const [isZoomed, setIsZoomed] = useState(false);

  const specimen = specimensData[activeSpecimenId] || specimensData['opus-084'];

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDownloadPDF = () => {
    alert(
      `Generando Ficha Técnica Oficial (.PDF) para ${specimen.title} (${specimen.opusCode}) con planos de corte y certificación holográfica...`
    );
  };

  // Other specimens to show in carousel
  const otherSpecimens = Object.values(specimensData).filter(
    (s) => s.id !== specimen.id
  );

  return (
    <section className={styles.cosplaySection} id="gallery">
      {/* Monograph Top Header Bar */}
      <div className={styles.monographHeader}>
        <div className={styles.catalogMeta}>
          <div className={styles.codeLine}>
            <span className={styles.opusTag}>{specimen.opusCode}</span>
            <span className={styles.slash}>/</span>
            <span className={styles.serieTag}>{specimen.serieTag}</span>
          </div>
          <h2 className={styles.pieceTitle}>{specimen.title}</h2>
          <p className={styles.pieceSubtitle}>{specimen.subtitle}</p>
        </div>

        <div className={styles.headerActionButtons}>
          <button
            type="button"
            className={styles.primaryQuoteBtn}
            onClick={() => onOpenCommission(specimen)}
          >
            <Sparkles size={15} />
            <span>Cotizar este diseño</span>
          </button>
          <button
            type="button"
            className={styles.secondarySpecBtn}
            onClick={handleDownloadPDF}
          >
            <Download size={15} />
            <span>Ficha Técnica (.PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Stage */}
      <div className={styles.stageGrid}>
        {/* Left Column: Visual Exhibition & Blueprint */}
        <div className={styles.visualStage}>
          {/* View Switcher Tabs */}
          <div className={styles.viewSwitcher}>
            <div className={styles.tabsGroup} role="tablist">
              <button
                type="button"
                className={`${styles.viewTabBtn} ${currentView === 'final' ? styles.activeTab : ''}`}
                onClick={() => setCurrentView('final')}
              >
                <Eye size={14} />
                <span>Fotografía Final</span>
              </button>
              <button
                type="button"
                className={`${styles.viewTabBtn} ${currentView === 'macro' ? styles.activeTab : ''}`}
                onClick={() => setCurrentView('macro')}
              >
                <ZoomIn size={14} />
                <span>Detalle Macro 1:1</span>
              </button>
              <button
                type="button"
                className={`${styles.viewTabBtn} ${currentView === 'blueprint' ? styles.activeTab : ''}`}
                onClick={() => setCurrentView('blueprint')}
              >
                <Compass size={14} />
                <span>Plano de Patronaje</span>
              </button>
            </div>

            <div className={styles.techIndicator}>
              <span className={styles.indicatorPill}>EXP. 48MP FINE-GRAIN</span>
              <span className={styles.indicatorPill}>PAN DE ORO 24K</span>
            </div>
          </div>

          {/* Master Viewport Frame */}
          <div className={styles.viewportFrame}>
            {/* View 1: Fotografía Final */}
            {currentView === 'final' && (
              <div
                className={styles.photoView}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={specimen.fullImage}
                  alt={`${specimen.title} Vista Completa`}
                  className={isZoomed ? styles.zoomed : ''}
                />
                <div className={styles.plateOverlay}>
                  <div className={styles.plateInfo}>
                    <span className={styles.plateId}>{specimen.plateFullCaption}</span>
                    <p className={styles.plateDesc}>{specimen.plateFullDesc}</p>
                  </div>
                  <span className={styles.plateFigure}>FIG. PRIMA</span>
                </div>
              </div>
            )}

            {/* View 2: Detalle Macro 1:1 */}
            {currentView === 'macro' && (
              <div
                className={styles.photoView}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={specimen.macroImage}
                  alt={`${specimen.title} Macro`}
                  className={isZoomed ? styles.zoomed : ''}
                />
                <div className={styles.plateOverlay}>
                  <div className={styles.plateInfo}>
                    <span className={styles.plateId}>{specimen.plateMacroCaption}</span>
                    <p className={styles.plateDesc}>{specimen.plateMacroDesc}</p>
                  </div>
                  <span className={styles.plateFigure}>{specimen.macroBadge}</span>
                </div>
              </div>
            )}

            {/* View 3: Plano de Patronaje & Blueprint SVG Diagram */}
            {currentView === 'blueprint' && (
              <div className={styles.blueprintView}>
                <div className={styles.blueprintHeader}>
                  <h3 className={styles.blueprintTitle}>
                    Esquema Técnico // Despiece Cuirass {specimen.title}
                  </h3>
                  <span className={styles.blueprintRev}>REV. 4.2 / MILANESE SPEC</span>
                </div>

                <div className={styles.svgDiagramWrapper}>
                  <svg viewBox="0 0 600 360" className="w-full h-auto">
                    <defs>
                      <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#gridPattern)" />

                    {/* Armor Anatomy Blueprint Path */}
                    <path
                      d="M 180 60 C 240 40, 360 40, 420 60 C 470 120, 480 220, 430 300 C 370 330, 230 330, 170 300 C 120 220, 130 120, 180 60 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="4 2"
                      strokeWidth="2"
                    />
                    <path d="M 170 110 Q 300 130 430 110" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 160 160 Q 300 185 440 160" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 165 210 Q 300 235 435 210" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 180 260 Q 300 280 420 260" fill="none" stroke="currentColor" strokeWidth="1.5" />

                    {/* Central Medallion */}
                    <circle cx="300" cy="185" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="300" cy="185" r="14" fill="none" stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" />

                    {/* Pins & Callouts */}
                    <line x1="300" y1="60" x2="300" y2="20" stroke="currentColor" strokeWidth="1" />
                    <circle cx="300" cy="20" r="3" fill="currentColor" />
                    <text x="310" y="24" fill="currentColor" fontSize="10" letterSpacing="1">
                      GORGET INTERLOCK [RUNIC BIND]
                    </text>

                    <line x1="435" y1="210" x2="510" y2="210" stroke="currentColor" strokeWidth="1" />
                    <circle cx="510" cy="210" r="3" fill="currentColor" />
                    <text x="515" y="214" fill="currentColor" fontSize="10" letterSpacing="1">
                      PIEL 2.5MM + WORBLA
                    </text>

                    <line x1="165" y1="210" x2="90" y2="210" stroke="currentColor" strokeWidth="1" />
                    <circle cx="90" cy="210" r="3" fill="currentColor" />
                    <text x="10" y="214" fill="currentColor" fontSize="10" letterSpacing="1">
                      EVA HD100+ FLANGE
                    </text>
                  </svg>
                </div>

                <div className={styles.blueprintSpecsGrid}>
                  <div className={styles.specCell}>
                    <span className={styles.specLabel}>Puntos de Anclaje</span>
                    <span className={styles.specValue}>14 Remaches Ciegos</span>
                  </div>
                  <div className={styles.specCell}>
                    <span className={styles.specLabel}>Tolerancia de Giro</span>
                    <span className={styles.specValue}>{specimen.mobility}</span>
                  </div>
                  <div className={styles.specCell}>
                    <span className={styles.specLabel}>Curvatura de Pecho</span>
                    <span className={styles.specValue}>Radio 18.5 cm</span>
                  </div>
                  <div className={styles.specCell}>
                    <span className={styles.specLabel}>Sistema de Cierre</span>
                    <span className={styles.specValue}>Hebillas Latón Forjado</span>
                  </div>
                </div>
              </div>
            )}

            {/* Hover Zoom Indicator */}
            {currentView !== 'blueprint' && (
              <div className={styles.zoomHint}>
                <Maximize2 size={13} />
                <span>Hover Zoom 1.15x Activo</span>
              </div>
            )}
          </div>

          {/* Pull Quote from Master Artisan */}
          <div className={styles.artisanPullQuote}>
            <div className={styles.quoteSign}>
              <Quote size={16} />
              <span>Nota de Taller // Maestra Aurelia Vane</span>
            </div>
            <p className={styles.quoteText}>{specimen.quote}</p>
            <div className={styles.quoteFooter}>
              <span>{specimen.quoteAuthor}</span>
              <span className={styles.editionSerial}>{specimen.serialRegistry}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Technical Dossier with Accordions */}
        <div className={styles.technicalColumn}>
          <div className={styles.dossierContainer}>
            <div className={styles.dossierHeader}>
              <div className={styles.dossierTitleGroup}>
                <Compass size={18} className="text-primary" />
                <h3 className={styles.dossierTitle}>Desglose Técnico</h3>
              </div>
              <span className={styles.verifiedBadge}>Auditado</span>
            </div>

            {/* Bento Quick Metrics */}
            <div className={styles.metricsBento}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Mano de Obra</span>
                <div className={styles.metricValueWrapper}>
                  <span className={styles.metricNumber}>{specimen.hours}</span>
                  <span className={styles.metricUnit}>Horas</span>
                </div>
                <span className={styles.metricSubtext}>Modelado & pátina</span>
              </div>

              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Peso Total</span>
                <div className={styles.metricValueWrapper}>
                  <span className={styles.metricNumber}>{specimen.weight}</span>
                  <span className={styles.metricUnit}>Kg</span>
                </div>
                <span className={styles.metricSubtext}>Distribución 3D</span>
              </div>
            </div>

            {/* Accordion Group */}
            <div className={styles.accordionGroup}>
              {/* Accordion 1: Materiales */}
              <div className={`${styles.accordionItem} ${openAccordions.materials ? styles.isOpen : ''}`}>
                <button
                  type="button"
                  className={styles.accordionTrigger}
                  onClick={() => toggleAccordion('materials')}
                >
                  <div className={styles.triggerTitle}>
                    <Layers size={16} />
                    <span>Materiales Utilizados</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`${styles.accordionIcon} ${openAccordions.materials ? styles.rotated : ''}`}
                  />
                </button>
                {openAccordions.materials && (
                  <div className={styles.accordionBody}>
                    <div className={styles.tagsWrap}>
                      {specimen.materials.map((mat, i) => (
                        <span key={i} className={styles.materialPill}>
                          {mat}
                        </span>
                      ))}
                    </div>
                    <p className={styles.accordionText}>{specimen.materialsDesc}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Referencias & Técnicas */}
              <div className={`${styles.accordionItem} ${openAccordions.techniques ? styles.isOpen : ''}`}>
                <button
                  type="button"
                  className={styles.accordionTrigger}
                  onClick={() => toggleAccordion('techniques')}
                >
                  <div className={styles.triggerTitle}>
                    <History size={16} />
                    <span>Referencias & Técnicas</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`${styles.accordionIcon} ${openAccordions.techniques ? styles.rotated : ''}`}
                  />
                </button>
                {openAccordions.techniques && (
                  <div className={styles.accordionBody}>
                    <ul className={styles.techList}>
                      {specimen.techniques.map((tech, i) => (
                        <li key={i}>
                          <strong>{tech.title}:</strong> {tech.desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Conservación & Guarda */}
              <div className={`${styles.accordionItem} ${openAccordions.preservation ? styles.isOpen : ''}`}>
                <button
                  type="button"
                  className={styles.accordionTrigger}
                  onClick={() => toggleAccordion('preservation')}
                >
                  <div className={styles.triggerTitle}>
                    <ShieldCheck size={16} />
                    <span>Conservación & Guarda</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`${styles.accordionIcon} ${openAccordions.preservation ? styles.rotated : ''}`}
                  />
                </button>
                {openAccordions.preservation && (
                  <div className={styles.accordionBody}>
                    <p className={styles.accordionText}>{specimen.preservation}</p>
                    <span className="text-xs text-muted block mt-1 tracking-wider uppercase font-mono">
                      {specimen.preservationRegistry}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Production Timeline Progress */}
            <div className={styles.timelineSection}>
              <div className={styles.timelineHeader}>
                <span>Etapas de Creación</span>
                <span className={styles.timelineStatus}>100% Finalizado</span>
              </div>
              <div className={styles.timelineBar}>
                <div className={styles.timelineFill}></div>
              </div>
              <div className={styles.timelineSteps}>
                <span>Boceto</span>
                <span>Patronaje</span>
                <span>Termoformado</span>
                <span>Pan de Oro</span>
              </div>
            </div>

            {/* Action Buttons in Technical Column */}
            <div className={styles.columnActionButtons}>
              <button
                type="button"
                className={styles.quoteDesignBtn}
                onClick={() => onOpenCommission(specimen)}
              >
                <Sparkles size={16} />
                <span>Cotizar esta pieza ({specimen.opusCode})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Specimens Carousel Strip */}
      <div className={styles.carouselSection}>
        <div className={styles.carouselHeader}>
          <div>
            <span className={styles.carouselPretitle}>COMPLEMENTOS DEL ARCHIVO</span>
            <h3 className={styles.carouselTitle}>Piezas del Mismo Universo Monográfico</h3>
          </div>
          <span className={styles.archiveHint}>
            <span>Haz clic para explorar espécimen</span>
            <ArrowRight size={14} />
          </span>
        </div>

        <div className={styles.carouselGrid}>
          {otherSpecimens.map((item) => (
            <div
              key={item.id}
              className={styles.specimenCard}
              onClick={() => {
                onSelectSpecimen(item.id);
                // Scroll slightly up to stage
                const el = document.getElementById('gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className={styles.cardImage}>
                <img src={item.fullImage} alt={item.title} />
                <span className={styles.cardOpusBadge}>{item.opusCode}</span>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardCategory}>{item.subtitle}</span>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <p className={styles.cardSnippet}>{item.plateFullDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
