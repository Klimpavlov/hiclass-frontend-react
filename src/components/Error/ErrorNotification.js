import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';

const ErrorNotification = React.forwardRef((props, ref) => {
    return (
        <Toast ref={ref} position="top-right" />
    );
});

export default ErrorNotification;
