import React from "react";
import { Button } from "@material-ui/core";
import './Modal.css';

const Modal = ({open,onClose,handleAccepted, handleRejected, onPick}) => {    

    if(!open) return null
    
    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(event) => {
                event.stopPropagation()
            }} className="modalContainer">
                <p onClick={onClose} className="closeBtn">X</p>
                <div className="content">
                    <h3>Konfirmasi Status Pembayaran</h3>
                    <div className="btnContainer">
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleAccepted(onPick)
                        }}
                        >
                            <span>Terima</span>
                        </Button>
                        <Button
                        variant="contained"
                        style={{ 
                            backgroundColor: 'red',
                            color: 'white',
                            
                           }}
                        onClick={() => {
                            handleRejected(onPick)
                        }}
                        >
                            <span>Tolak</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;