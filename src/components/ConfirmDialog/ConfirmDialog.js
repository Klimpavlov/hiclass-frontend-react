
import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import deleteClass from "@/app/deleteClass/deleteClass";

export default function BasicDemo({classId, setIsModalOpen}) {
    const toast = useRef(null);

    const accept = () => {
        deleteClass({classId});
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
            message: 'Do you want to delete this class?',
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
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button onClick={confirm1} icon="pi pi-times" label="Cancel" className="mr-2"></Button>
                <Button onClick={confirm2} icon="pi pi-check" label="Delete"></Button>
            </div>
        </>
    )
}
