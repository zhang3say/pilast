import { getSettings } from '@/lib/actions';
import SettingsForm from './SettingsForm';

export default async function AdminSettings() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">网站设置</h1>
      <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
