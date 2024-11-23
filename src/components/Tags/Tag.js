import React from "react";
import { Badge } from "@/components/ui/badge"


const Tag = ({text, removeTag, onChange}) => {

    return (
        <Badge variant="outline">
            <div className="">{text}</div>
            {removeTag && (
                <div className="class-preview-close text-black pl-2 cursor-pointer"
                    onClick={onChange}>
                    &times;
                </div>
            )}
        </Badge>
    )
}

export default Tag