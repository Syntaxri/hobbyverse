export const STATUS_CONFIG = {
  CONFIRMED: { label: 'Confirmed', color: 'blue', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  PACKING: { label: 'Packing', color: 'purple', bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: 'cyan', bg: 'bg-cyan-100', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  DELIVERED: { label: 'Delivered', color: 'green', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  ACTIVE_RENTAL: { label: 'Active Rental', color: 'amber', bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  RETURN_SCHEDULED: { label: 'Return Scheduled', color: 'indigo', bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  RETURNED: { label: 'Returned', color: 'gray', bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
};

export const STATUS_ORDER = [
  'CONFIRMED',
  'PACKING',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'ACTIVE_RENTAL',
  'RETURN_SCHEDULED',
  'RETURNED',
];
