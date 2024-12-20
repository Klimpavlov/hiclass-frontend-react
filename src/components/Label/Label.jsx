import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function LabelTerms({checked, onChange, text}) {
    return (
        <div>
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={checked} onChange={onChange}/>
                <Label htmlFor="terms">{text}</Label>
            </div>
        </div>
    )
}
