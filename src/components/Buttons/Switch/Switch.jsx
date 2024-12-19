import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchDemo({ value, onChange, text }) {
    return (
        <div className="flex items-center space-x-2">
            <Switch cheked={value} onCheckedChange={onChange} id="airplane-mode" />
            <Label htmlFor="airplane-mode">{text}</Label>
        </div>
    )
}
