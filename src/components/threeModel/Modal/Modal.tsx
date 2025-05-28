import styles from './Modal.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    img: { url: string };
    url?: string;
    description?: string;
  } | null;
};

export default function Modal({ isOpen, onClose, data }: ModalProps): JSX.Element {
  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.modalContent}>
              <a
                className={styles.imgLink}
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className={styles.img} src={data.img.url} alt="modal image" />
              </a>
              <div className={styles.descriptionWrapper}>
                {data.description?.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <button className={styles.closeButton} onClick={onClose}>
                ×
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
