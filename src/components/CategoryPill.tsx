import { View, Text } from "react-native";
import { Shapes } from "lucide-react-native";
import { categories } from "@/constants/categories";

const BRAND = "#A33900";

const SIZES = {
  sm: { box: "px-2 py-1 gap-1", text: "text-[11px]", icon: 11 },
  md: { box: "px-3 py-1.5 gap-1.5", text: "text-xs", icon: 14 },
};

export default function CategoryPill({
  category,
  size = "md",
}: {
  category: string;
  size?: keyof typeof SIZES;
}) {
  const match = categories.find((c) => c.id === category);
  const Icon = match?.Icon ?? Shapes;
  // Unknown ids (e.g. older listings) still read as a proper label
  const label = match?.label ?? category.charAt(0).toUpperCase() + category.slice(1);
  const s = SIZES[size];

  return (
    <View
      className={`flex-row items-center self-start shrink rounded-full bg-[#FFF4EC] border border-[#FED7AA] ${s.box}`}
    >
      <Icon size={s.icon} color={BRAND} strokeWidth={2.25} />
      <Text numberOfLines={1} className={`shrink font-semibold text-[#A33900] ${s.text}`}>
        {label}
      </Text>
    </View>
  );
}
