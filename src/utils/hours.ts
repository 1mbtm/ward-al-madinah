import { BranchData } from '@/types';

export interface BranchStatus {
  isOpen: boolean;
  statusLabel: string;
  badgeClass: string;
}

export function getBranchCurrentStatus(branch: BranchData): BranchStatus {
  if (branch.isComingSoon) {
    return {
      isOpen: false,
      statusLabel: 'Coming Soon',
      badgeClass: 'badge-gold',
    };
  }

  if (!branch.openingTime || !branch.closingTime) {
    return {
      isOpen: true,
      statusLabel: 'Open Today',
      badgeClass: 'badge-gold',
    };
  }

  try {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const [openH, openM] = branch.openingTime.split(':').map(Number);
    const [closeH, closeM] = branch.closingTime.split(':').map(Number);

    const openTimeInMinutes = openH * 60 + (openM || 0);
    let closeTimeInMinutes = closeH * 60 + (closeM || 0);

    // If closing after midnight (e.g. 24:00 or 01:00)
    if (closeTimeInMinutes <= openTimeInMinutes) {
      closeTimeInMinutes += 24 * 60;
    }

    const isOpen =
      currentTimeInMinutes >= openTimeInMinutes &&
      currentTimeInMinutes < closeTimeInMinutes;

    return {
      isOpen,
      statusLabel: isOpen ? 'Open Now' : 'Closed Now',
      badgeClass: isOpen ? 'badge-gold' : 'badge',
    };
  } catch {
    return {
      isOpen: true,
      statusLabel: 'Open Today',
      badgeClass: 'badge-gold',
    };
  }
}
