type StatusBadgeProps = {
  status: string;
  size: string;
};

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  opened: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  closed: {
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  unpublished: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  published: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  draft: {
    bg: "bg-gray-200",
    text: "text-gray-600",
  },
  removed: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
};

function StatusBadge({ status, size }: StatusBadgeProps) {
  const key = status.toLowerCase();

  const styles = STATUS_STYLES[key] ?? {
    bg: "bg-gray-100",
    text: "text-gray-500",
  };

  return (
    <span
      className={`px-4 py-1 rounded-full font-semibold ${size} ${styles.bg} ${styles.text}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
