import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function LabelTerms({checked, onChange}) {
    return (
        <div>
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={checked} onChange={onChange}/>
                <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
        </div>
    )
}
