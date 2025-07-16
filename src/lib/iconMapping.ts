import { 
  Package, Truck, Warehouse, Timer, Package2, Shield, Clock, Users, 
  Calendar, MapPin, User, Building, Globe, CheckCircle, Star, Award,
  Target, Zap, Heart, ThumbsUp, TrendingUp, RefreshCw, Settings
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  package: Package,
  truck: Truck,
  warehouse: Warehouse,
  timer: Timer,
  package2: Package2,
  shield: Shield,
  clock: Clock,
  users: Users,
  calendar: Calendar,
  mappin: MapPin,
  user: User,
  building: Building,
  globe: Globe,
  checkcircle: CheckCircle,
  star: Star,
  award: Award,
  target: Target,
  zap: Zap,
  heart: Heart,
  thumbsup: ThumbsUp,
  trendingup: TrendingUp,
  refreshcw: RefreshCw,
  settings: Settings
};

export function getIcon(iconKey: string | null): LucideIcon {
  if (!iconKey) return Package;
  const key = iconKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  return iconMap[key] || Package;
}