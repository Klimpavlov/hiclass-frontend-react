
import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import deleteClass from "@/app/deleteClass/deleteClass";

export default function DialogModal({setIsModalOpen, postDelete}) {
    const toast = useRef(null);

    const accept = () => {
        postDelete()
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });

    }

    const reject = () => {
        setIsModalOpen(false);
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm1 = () => {
        setIsModalOpen(false);
    };

    const confirm2 = () => {
        confirmDialog({
            message: 'Do you want to proceed?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className='fixed top-0 bottom-0 items-center'>
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button onClick={confirm1} icon="pi pi-times" label="Cancel" className="px-5 py-3 mt-4
                             mx-auto rounded-lg text-black bg-white
                              text-sm font-medium shadow-xs"></Button>
                <Button onClick={confirm2} icon="pi pi-check" label="Continue" className='px-5 py-3 mt-4 mx-auto rounded-lg bg-green-800 text-white text-sm font-medium shadow-xs'></Button>
            </div>
            </div>
        </>
    )
}
