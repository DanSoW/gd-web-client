import React, { memo, ReactNode } from "react";
import styles from './ModalWindow.module.scss';
// import { RiCloseLine } from "react-icons/ri";
import closeModal from '../../resources/images/closeModal.svg'

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
  }

const ModalWindow = (props: ModalType) => {
    return (
        <>
          {props.isOpen && (
            <div className={styles.modalOverlay} onClick={props.toggle}>
              <div  className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
                <div className={styles.closeBlock}>
                  <img src={closeModal} alt="close" onClick={props.toggle} />
                </div>
                {props.children}
              </div>
            </div>
          )}
        </>
      );
}

export default memo(ModalWindow);