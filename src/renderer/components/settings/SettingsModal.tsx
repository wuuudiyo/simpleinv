import { Modal } from '../ui/Modal';
import { ThemeSelector } from './ThemeSelector';
import { InfoSection } from './InfoSection';

interface SettingsModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Einstellungen" size="md">
      <div className="space-y-6">
        <ThemeSelector />

        <hr className="border-gray-200 dark:border-gray-700" />

        <InfoSection />
      </div>
    </Modal>
  );
}
