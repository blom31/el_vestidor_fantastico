import React, { useState } from 'react';
import styles from '../styles/ContactModal.module.scss';
import { X, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { specimensData } from '../data/monographData';

export default function ContactModal({ isOpen, onClose, selectedSpecimen }) {
  const initialCode = selectedSpecimen
    ? `${selectedSpecimen.opusCode} — ${selectedSpecimen.title}`
    : 'OPUS 084 — Valkyrie Sovereign';

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    deliveryDate: '',
    finishType: 'Pan de Oro 24K & Terciopelo Imperial',
    specimenCode: initialCode,
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);


  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleResetAndClose}>
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <span className={styles.modalPretitle}>SOLICITUD DE ENCARGO PRIVADO</span>
            <h3 className={styles.modalTitle}>
              {selectedSpecimen ? `Cotizar ${selectedSpecimen.title}` : 'Dossier de Confección'}
            </h3>
            <p className={styles.modalSubtitle}>
              Cada encargo es confeccionado a medida anatómica exacta con ajuste presencial o mediante escaneo 3D.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={handleResetAndClose}
            aria-label="Cerrar modal"
          >
            <X size={22} />
          </button>
        </div>

        {isSubmitted ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={36} />
            </div>
            <h4 className={styles.successTitle}>Petición de Dossier Recibida</h4>
            <p className={styles.successText}>
              Su solicitud para <strong>{formData.specimenCode}</strong> ha sido registrada en el archivo
              de Atelier Aurelia. Nuestra maestra de taller revisará sus especificaciones anatómicas
              y responderá a <strong>{formData.email}</strong> en menos de 48 horas con el dossier confidencial.
            </p>
            <button
              type="button"
              className={styles.closeSuccessBtn}
              onClick={handleResetAndClose}
            >
              Volver a la Monografía
            </button>
          </div>
        ) : (
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Nombre del Solicitante / Entidad</label>
                <input
                  type="text"
                  placeholder="p. ej. Lady Genevieve / Warner Bros."
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Correo Electrónico de Contacto</label>
                <input
                  type="email"
                  placeholder="cliente@atelier-aurelia.art"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Fecha Estimada de Entrega</label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Gama de Acabado Preferente</label>
                <select
                  value={formData.finishType}
                  onChange={(e) => setFormData({ ...formData, finishType: e.target.value })}
                >
                  <option>Pan de Oro 24K & Terciopelo Imperial</option>
                  <option>Acero Pavonado & Seda Negra</option>
                  <option>Bronce Envejecido & Cuero Carmesí</option>
                  <option>Filigrana de Plata & Ópalo</option>
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Pieza del Catálogo / Modelo Base</label>
              <select
                value={formData.specimenCode}
                onChange={(e) => setFormData({ ...formData, specimenCode: e.target.value })}
              >
                {Object.values(specimensData).map((s) => (
                  <option key={s.id} value={`${s.opusCode} — ${s.title}`}>
                    {s.opusCode} — {s.title} ({s.subtitle})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Notas Especiales, Medidas o Ajustes de Escena</label>
              <textarea
                rows={3}
                placeholder="Indicar requerimientos para combate escénico, iluminación LED, anatomía o cinemática..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className={styles.estimateBanner}>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />
                <span>Tiempo de producción base: 6 a 10 semanas</span>
              </div>
              <span className={styles.priceHighlight}>Desde 3.200 €</span>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleResetAndClose}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.submitBtn}>
                <Send size={15} />
                <span>Enviar Petición de Dossier</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
