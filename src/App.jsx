import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/MagazineApp.module.scss';
import Header from './components/Header';
import Cover from './components/Cover';
import ChapterMenu from './components/ChapterMenu';
import CosplayCard from './components/CosplayCard';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import { specimensData } from './data/monographData';
import { Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('cover');
  const [activeChapterId, setActiveChapterId] = useState('ch-01');
  const [activeSpecimenId, setActiveSpecimenId] = useState('opus-084');
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const [quotingSpecimen, setQuotingSpecimen] = useState(null);
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);
  const [currentFolio, setCurrentFolio] = useState('FOLIO 01 / 04');

  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);

  // Section scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const coverEl = document.getElementById('cover');
      const chaptersEl = document.getElementById('chapters');
      const galleryEl = document.getElementById('gallery');

      if (galleryEl && scrollPosition >= galleryEl.offsetTop) {
        setActiveSection('gallery');
        setCurrentFolio('FOLIO 03 / 04');
      } else if (chaptersEl && scrollPosition >= chaptersEl.offsetTop) {
        setActiveSection('chapters');
        setCurrentFolio('FOLIO 02 / 04');
      } else {
        setActiveSection('cover');
        setCurrentFolio('FOLIO 01 / 04');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    if (sectionId === 'commissions') {
      handleOpenCommission();
      return;
    }

    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectChapter = (chapter) => {
    setActiveChapterId(chapter.id);
    if (chapter.specimenId) {
      setActiveSpecimenId(chapter.specimenId);
    }
    // Smooth scroll to gallery
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCommission = (specimen = null) => {
    setQuotingSpecimen(specimen || specimensData[activeSpecimenId]);
    setIsCommissionOpen(true);
  };

  // Ethereal Atelier Soundscape generator using Web Audio API
  const toggleSoundscape = () => {
    if (isPlayingSoundscape) {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // ignore
        }
      });
      oscillatorsRef.current = [];
      setIsPlayingSoundscape(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = audioCtxRef.current || new AudioContext();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Frequencies for a warm, celestial chord in D minor / dorian (D3, A3, F4, C5)
        const freqs = [146.83, 220.0, 349.23, 523.25];
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
        gainNode.connect(ctx.destination);

        const newOscs = freqs.map((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(gainNode);
          osc.start();
          return osc;
        });

        oscillatorsRef.current = newOscs;
        setIsPlayingSoundscape(true);
      } catch (err) {
        console.warn('AudioContext failed:', err);
      }
    }
  };

  return (
    <div className={styles.magazineApp}>
      {/* Background ambient noise layer */}
      <div className={styles.ambientNoise} aria-hidden="true" />

      {/* Header Bar */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCommission={handleOpenCommission}
        isPlayingSoundscape={isPlayingSoundscape}
        onToggleSoundscape={toggleSoundscape}
        currentFolio={currentFolio}
      />

      <main className={styles.mainContent}>
        {/* Cover */}
        <Cover
          onExploreSpread={() => handleNavigate('chapters')}
          onSelectChapter={handleSelectChapter}
        />

        {/* Chapter Menu: Pliego Abierto */}
        <ChapterMenu
          activeChapterId={activeChapterId}
          onSelectChapter={handleSelectChapter}
        />

        {/* Cosplay Card: Interactive Gallery with Technical Dossier & Blueprint */}
        <CosplayCard
          activeSpecimenId={activeSpecimenId}
          onSelectSpecimen={(id) => setActiveSpecimenId(id)}
          onOpenCommission={handleOpenCommission}
        />
      </main>

      {/* Footer Colophon */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCommission={handleOpenCommission}
      />

      {/* Floating Folio Tracker */}
      <div className={styles.folioTracker}>
        <span className={styles.folioIndicator}>{currentFolio}</span>
        <span className={styles.editionTag}>MONOGRAFÍA DE SALÓN</span>
      </div>

      {/* Ambient Soundscape Toggle Button */}
      <button
        type="button"
        className={`${styles.soundscapeToggle} ${isPlayingSoundscape ? styles.playing : ''}`}
        onClick={toggleSoundscape}
        aria-label="Alternar ambientación acústica"
      >
        <span className={styles.soundIcon}>
          {isPlayingSoundscape ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </span>
        <span className={styles.soundLabel}>
          {isPlayingSoundscape ? 'Ambiente Áureo Activo' : 'Activar Atmósfera'}
        </span>
        {isPlayingSoundscape && <span className={styles.pulseDot} />}
      </button>

      {/* Bespoke Commission Modal */}
      <ContactModal
        isOpen={isCommissionOpen}
        onClose={() => setIsCommissionOpen(false)}
        selectedSpecimen={quotingSpecimen || specimensData[activeSpecimenId]}
      />
    </div>
  );
}
