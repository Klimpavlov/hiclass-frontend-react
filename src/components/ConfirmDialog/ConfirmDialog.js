import React from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

export default function DialogModal({ setIsModalOpen, postDelete, toast }) {
    const accept = async () => {
        await postDelete();
        setTimeout(() => {
            setIsModalOpen(false);
        }, 1500);
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        setTimeout(() => {
            setIsModalOpen(false);
        }, 1500);
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
            <ConfirmDialog />
            <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
                <div className="card flex flex-wrap gap-2 justify-content-center">
                    <Button onClick={() => setIsModalOpen(false)} icon="pi pi-times" label="Cancel" className="px-5 py-3 mt-4 mx-auto rounded-lg text-black bg-white text-sm font-medium shadow-xs"></Button>
                    <Button onClick={confirm2} icon="pi pi-check" label="Continue" className='px-5 py-3 mt-4 mx-auto rounded-lg bg-green-800 text-white text-sm font-medium shadow-xs'></Button>
                </div>
            </div>
        </>
    );
}

