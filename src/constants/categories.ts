import { 
    ShoppingCartIcon, 
    HomeIcon, 
    TruckIcon, 
    HeartIcon, 
    SparklesIcon,
    BuildingStorefrontIcon,
    FilmIcon,               
    ShoppingBagIcon,      
    PuzzlePieceIcon,      
    TvIcon,               
    BanknotesIcon,         
    AcademicCapIcon,    
    GiftIcon,         
    SquaresPlusIcon     
} from '@heroicons/react/24/outline';

export const CATEGORIES = [
    // 1. Kategorie Podstawowe (The Essentials)
    { id: 'groceries', label: 'Groceries', icon: ShoppingCartIcon },
    { id: 'housing', label: 'Housing & Bills', icon: HomeIcon },
    { id: 'transport', label: 'Transport', icon: TruckIcon },
    { id: 'health', label: 'Health', icon: HeartIcon },
    { id: 'personal_care', label: 'Personal Care', icon: SparklesIcon },
    
    // 2. Styl życia i Rozrywka (Lifestyle & Fun)
    { id: 'dining', label: 'Dining Out', icon: BuildingStorefrontIcon },
    { id: 'entertainment', label: 'Entertainment', icon: FilmIcon },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBagIcon },
    { id: 'hobby', label: 'Hobby', icon: PuzzlePieceIcon },
    { id: 'subscriptions', label: 'Subscriptions', icon: TvIcon },
    
    // 3. Finanse i Inne (Financial & Other)
    { id: 'savings', label: 'Investments', icon: BanknotesIcon },
    { id: 'education', label: 'Education', icon: AcademicCapIcon },
    { id: 'gifts', label: 'Gifts', icon: GiftIcon },
    { id: 'other', label: 'Other', icon: SquaresPlusIcon },
];