import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Dialog = ({ title, children, onClose }) => {
    useEffect(() => {
        const modalElement = document.querySelector('.modal');
        window.M.Modal.init(modalElement, {
            dismissible: false,
            opacity: 0.8,
            preventScrolling: false
        });

        // Open the modal
        const modalInstance = window.M.Modal.getInstance(modalElement);
        modalInstance && modalInstance.open();

        // Clean up modal instance on component unmount
        return () => {
            modalInstance && modalInstance.destroy();
        };
    }, []);

    return ReactDOM.createPortal(
        <div className="modal modal-fixed-footer large grey darken-4">
            <div className="modal-content white-text">
                <div className="row">
                    <div className="col s12 m12 l12 left-align">
                        <button className="btn-floating btn-medium waves-effect waves-light red right" onClick={onClose}>
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
        </div>,
        document.getElementById('portal')
    );

};

export default Dialog;
