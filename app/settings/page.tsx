import { SettingsSection } from "@/components/settings/settings-section"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Settings</h1>
      <SettingsSection />
    </div>
  )
}

