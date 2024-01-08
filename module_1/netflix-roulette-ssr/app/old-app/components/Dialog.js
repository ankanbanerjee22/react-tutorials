import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';


const Dialog = ({ title, children, onClose, isOpen }) => {

    const [modalInstance, setModalInstance] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const modalElement = document.querySelector('.modal');
            const instance = window.M.Modal.init(modalElement, {
                dismissible: false,
                opacity: 0.8,
                preventScrolling: false
            });
            instance.isOpen = false;

            setModalInstance(instance);
        }
        return () => {
            modalInstance && modalInstance.destroy();
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && modalInstance) {
            modalInstance.open();
        }
    }, [isOpen, modalInstance]);

    const handleClose = () => {
        if (modalInstance) {
            modalInstance.destroy();
            setModalInstance(null);
            onClose();
        }
    };

    return (
        <div className="modal movie-form-modal modal-fixed-footer large grey darken-4">
            <div className="modal-content white-text">
                <div className="row">
                    <div className="col s12 m12 l12 left-align">
                        <button className="btn-floating btn-medium waves-effect waves-light red right" onClick={handleClose}>
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m12 l12">
                        <h2 className="center-align">{title}</h2>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
/*         ,
        document.getElementById('portal') */
    );

};

export default Dialog;
