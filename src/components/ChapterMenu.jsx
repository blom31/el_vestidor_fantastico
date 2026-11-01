import React from 'react';
import styles from '../styles/ChapterMenu.module.scss';
import { chaptersData } from '../data/monographData';
import { ArrowUpRight } from 'lucide-react';


export default function ChapterMenu({ activeChapterId, onSelectChapter }) {
  return (
    <section className={styles.chapterSection} id="chapters">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionPretitle}>MONOGRAFÍA DE SALÓN • PLIEGO CENTRAL</span>
        <h2 className={styles.sectionTitle}>Sumario de Capítulos</h2>
        <div className={styles.sectionDivider}></div>
      </div>

      {/* Realistic 2-Page Magazine Open Spread */}
      <div className={styles.magazineSpread}>
        {/* Left Page: Sommaire Editorial & Note */}
        <div className={styles.pageLeft}>
          <div className={styles.pageFolioTop}>
            <span>FOLIO 02</span>
            <span>EL VESTIDOR FANTÁSTICO</span>
          </div>

          <div className={styles.editorialContent}>
            <span className={styles.sommaireTag}>PRÓLOGO EDITORIAL</span>
            <h3 className={styles.sommaireHeading}>La Alquimia del Cosplay de Salón</h3>
            <p className={styles.editorialText}>
              En este cuarto volumen monográfico, abrimos las puertas de la cámara de confección para documentar
              la intersección entre la armería histórica milanesa del siglo XVI y las exigencias escénicas contemporáneas.
            </p>
            <p className={styles.editorialText}>
              Cada diseño concebido en el taller trasciende la condición de indumentaria teatral: es un artefacto cinético
              donde el cuero teñido a mano, las resinas facetadas y los polímeros termoformados dialogan en perfecta comunión.
            </p>

            <div className={styles.artisanQuote}>
              <p>
                “Un traje de alta fantasía no imita la realidad: funda un imperio temporal en quien tiene el honor de vestirlo.”
              </p>
              <span>— Aurelia Vane, Maestra de Taller</span>
            </div>
          </div>

          <div className={styles.pageFolioBottom}>
            <span>SECCIÓN: MANIFIESTO DE ARTE & TALLER</span>
            <span>PÁG. 04</span>
          </div>
        </div>

        {/* Right Page: Interactive Chapter Index Grid */}
        <div className={styles.pageRight}>
          <div className={styles.pageFolioTop}>
            <span>ÍNDICE DE PIEZAS & TÉCNICAS</span>
            <span>FOLIO 03</span>
          </div>

          <div className={styles.chaptersList}>
            {chaptersData.map((chapter) => {
              const isSelected = activeChapterId === chapter.id;

              return (
                <div
                  key={chapter.id}
                  className={`${styles.chapterItem} ${isSelected ? styles.activeChapter : ''}`}
                  onClick={() => onSelectChapter(chapter)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelectChapter(chapter);
                    }
                  }}
                >
                  <div className={styles.chapterThumb}>
                    <img src={chapter.thumbnail} alt={chapter.title} />
                  </div>

                  <div className={styles.chapterDetails}>
                    <div className={styles.chapterHeaderRow}>
                      <span className={styles.chapterNum}>{chapter.number}</span>
                      <span className={styles.chapterTag}>{chapter.tag}</span>
                    </div>
                    <h4 className={styles.chapterTitle}>{chapter.title}</h4>
                    <p className={styles.chapterSummary}>{chapter.summary}</p>
                  </div>

                  <div className={styles.chapterMeta}>
                    <span className={styles.chapterPage}>{chapter.page}</span>
                    <div className={styles.chapterAction}>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.pageFolioBottom}>
            <span>BARCELONA // PARIS // TOKYO</span>
            <span>PÁG. 05</span>
          </div>
        </div>
      </div>
    </section>
  );
}
