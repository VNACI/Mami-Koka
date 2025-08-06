export const CATEGORIES = {
  JOBS: ['All Categories', 'Cleaning', 'Delivery', 'Teaching', 'Digital Services', 'Construction', 'Tutoring', 'Cooking', 'Gardening', 'Repairs'],
  MARKETPLACE: ['All Categories', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Vehicles', 'Tools', 'Furniture'],
};

export const LOCATIONS = [
  'Freetown, Western Area',
  'Bo, Southern Province',
  'Kenema, Eastern Province',
  'Makeni, Northern Province',
  'Koidu, Eastern Province',
  'Kono, Eastern Province',
  'Bonthe, Southern Province',
  'Moyamba, Southern Province',
  'Kailahun, Eastern Province',
  'Kambia, Northern Province',
];

export const MOBILE_MONEY_PROVIDERS = [
  { name: 'Orange Money', code: 'orange', icon: '📱' },
  { name: 'MTN MoMo', code: 'mtn', icon: '📱' },
  { name: 'Africell Money', code: 'africell', icon: '📱' },
  { name: 'Bank Transfer', code: 'bank', icon: '🏦' },
];

export const URGENCY_LEVELS = {
  urgent: { label: 'Urgent', color: 'bg-red-500', textColor: 'text-red-500' },
  normal: { label: 'Normal', color: 'bg-blue-500', textColor: 'text-blue-500' },
};

export const JOB_STATUS = {
  active: { label: 'Active', color: 'bg-green-500' },
  completed: { label: 'Completed', color: 'bg-blue-500' },
  cancelled: { label: 'Cancelled', color: 'bg-red-500' },
};

export const APPLICATION_STATUS = {
  pending: { label: 'Pending', color: 'bg-yellow-500' },
  accepted: { label: 'Accepted', color: 'bg-green-500' },
  rejected: { label: 'Rejected', color: 'bg-red-500' },
};

export const ITEM_CONDITIONS = {
  new: { label: 'New', color: 'bg-green-500' },
  used: { label: 'Used', color: 'bg-yellow-500' },
  refurbished: { label: 'Refurbished', color: 'bg-blue-500' },
};

export const NOTIFICATION_TYPES = {
  job: { icon: '💼', color: 'bg-blue-500' },
  payment: { icon: '💰', color: 'bg-green-500' },
  event: { icon: '🎉', color: 'bg-purple-500' },
  system: { icon: '🔔', color: 'bg-gray-500' },
};

export const CURRENCY_SYMBOL = 'NLe';
export const CURRENCY_FORMAT = (amount: string | number) => {
  return `${CURRENCY_SYMBOL} ${parseFloat(amount.toString()).toLocaleString()}`;
};
