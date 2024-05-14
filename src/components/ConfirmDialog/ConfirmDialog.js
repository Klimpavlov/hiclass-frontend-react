import React, {useRef} from 'react';
import {ConfirmDialog, confirmDialog} from 'primereact/confirmdialog';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';


export default function DialogModal({setIsModalOpen, postDelete}) {
    const toast = useRef(null);

    const accept = () => {
        postDelete()
        toast.current.show({severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000});

    }

    const reject = () => {
        toast.current.show({severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000});
        setTimeout(() => {
            setIsModalOpen(false);
        }, 1500)
    }

    const confirm1 = () => {
        setIsModalOpen(false);
    };

    const confirm2 = () => {
        confirmDialog({
            message: 'Do you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    return (
        <>
            <Toast ref={toast}/>
            <ConfirmDialog/>
            <div className='fixed inset-0 flex items-center justify-center bg-white'>
                <div className="card flex flex-wrap gap-2 justify-content-center">
                    <Button onClick={confirm1} icon="pi pi-times" label="Cancel" className="px-5 py-3 mt-4
                             mx-auto rounded-lg text-black bg-white
                              text-sm font-medium shadow-xs"></Button>
                    <Button onClick={confirm2} icon="pi pi-check" label="Continue"
                            className='px-5 py-3 mt-4 mx-auto rounded-lg bg-green-800 text-white text-sm font-medium shadow-xs'></Button>
                </div>
            </div>
        </>
    )
}
