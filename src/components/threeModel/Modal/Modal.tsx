import styles from './Modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    img: { url: string };
    url: string;
    description: string;
  } | null;
};

export default function Modal({ isOpen, onClose, data }: ModalProps): JSX.Element | null {
  console.log('Modal data:', data);
  if (!isOpen || !data) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            <img src={data.img.url} alt="modal image" />
          </a>
          <p>{data.description}</p>
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </>
  );
}
