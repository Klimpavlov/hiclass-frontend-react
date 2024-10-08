import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";


const InputCalendar = ({inputFormText, placeholderText, value, onChange}) => {
    const [selectedDate, setSelectedDate] = useState(value);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange(date);
    };

    return (
        <div className="">
            {inputFormText}
            <label htmlFor="Input" className='flex justify-between cursor-pointer'>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="w-full py-3 px-5 rounded-lg border border-gray-400"
                    placeholderText={placeholderText}
                    minDate={new Date()}
                    customInput={
                        <input
                            className="w-full flex justify-center items-center py-3 px-5 rounded-lg border border-gray-400 cursor-pointer"
                            value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
                            onChange={() => {
                            }}
                        />
                    }
                />
            </label>
        </div>
    );
};

export default InputCalendar;