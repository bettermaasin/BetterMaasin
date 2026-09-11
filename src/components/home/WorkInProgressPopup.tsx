import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/Dialog';

const STORAGE_KEY = 'bettermaasin:wip-dismissed';

const WorkInProgressPopup: FC = () => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
    }
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='max-w-md'>
        <div className='pr-8'>
          <p className='text-[11px] font-semibold uppercase tracking-wider text-amber-600'>
            {t('workInProgress.notice')}
          </p>
          <DialogTitle className='mt-1 text-lg font-semibold leading-snug text-gray-900'>
            {t('workInProgress.title')}
          </DialogTitle>
        </div>

        <DialogDescription className='text-sm leading-relaxed text-gray-600'>
          {t('workInProgress.body')}
        </DialogDescription>

        <div className='mt-2 flex gap-2'>
          <button
            type='button'
            onClick={() => handleOpenChange(false)}
            className='inline-flex flex-1 items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'
          >
            {t('workInProgress.gotIt')}
          </button>

          <Link
            to='/join-us'
            onClick={() => handleOpenChange(false)}
            className='inline-flex flex-1 items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700'
          >
            {t('workInProgress.joinVolunteer')}
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkInProgressPopup;
