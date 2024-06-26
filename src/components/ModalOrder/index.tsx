import Modal from 'react-modal';
import styles from './styles.module.scss'
import { OrderItemProps } from '@/pages/dashboard';
import { FiX } from 'react-icons/fi';


interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[];
    handleFinishOrder: (id: string) => void;
}

const ModalOrder = ({ isOpen, onRequestClose, order, handleFinishOrder }: ModalOrderProps) => {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'

        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0 }}
            >

                <FiX size={45} color='#f34748' />
            </button>

            <div className={styles.container}>
                <span className={styles.table}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>
                {order.map(item => (
                    <section key={item.id} className={styles.containerItem}>
                        <span>{item.amount} - <strong>{item.product.name}</strong> </span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}

                <button className={styles.buttonOrder} onClick={() => handleFinishOrder(order[0].order.id)}>
                    Concluir Pedido
                </button>
            </div>
        </Modal>
    );
}

export default ModalOrder;