import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { ChefHat, Building, Activity, Settings, BookOpen } from 'lucide-react';

// Agent Data
const agentsData: Record<string, {
    name: string;
    nameAr: string;
    role: string;
    roleAr: string;
    color: string;
    iconName: string;
    description: string;
    descriptionAr: string;
    features: string[];
    featuresAr: string[];
}> = {
    sofra: {
        name: 'Sofra',
        nameAr: 'سفرة',
        role: 'Restaurant OS',
        roleAr: 'نظام المطاعم',
        color: '#FF6B5B',
        iconName: 'chef',
        description: 'Your AI-powered restaurant assistant. Handle orders, manage reservations, and delight customers 24/7.',
        descriptionAr: 'مساعد مطعمك الذكي. يستقبل الطلبات، يدير الحجوزات، ويخدم الزبائن على مدار الساعة.',
        features: ['Order Taking', 'Menu Recommendations', 'Reservation Management', 'Customer Support'],
        featuresAr: ['استقبال الطلبات', 'توصيات القائمة', 'إدارة الحجوزات', 'دعم العملاء'],
    },
    tajer: {
        name: 'Tajer',
        nameAr: 'تاجر',
        role: 'Real Estate',
        roleAr: 'العقارات',
        color: '#FFB347',
        iconName: 'building',
        description: 'Your AI real estate agent. Show properties, book viewings, and close deals automatically.',
        descriptionAr: 'وكيلك العقاري الذكي. يعرض العقارات، يحجز المعاينات، ويغلق الصفقات تلقائياً.',
        features: ['Property Listings', 'Virtual Tours', 'Booking Viewings', 'Price Negotiation'],
        featuresAr: ['عرض العقارات', 'جولات افتراضية', 'حجز المعاينات', 'التفاوض على الأسعار'],
    },
    drmoe: {
        name: 'Dr. Moe',
        nameAr: 'د. مو',
        role: 'Pharmacy AI',
        roleAr: 'الصيدلية الذكية',
        color: '#00C4B4',
        iconName: 'activity',
        description: 'Your AI pharmacy assistant. Check drug interactions, manage prescriptions, and serve customers.',
        descriptionAr: 'مساعد صيدليتك الذكي. يفحص تفاعلات الأدوية، يدير الوصفات، ويخدم الزبائن.',
        features: ['Drug Interaction Check', 'Prescription Management', 'Inventory Alerts', 'Customer Guidance'],
        featuresAr: ['فحص تفاعلات الأدوية', 'إدارة الوصفات', 'تنبيهات المخزون', 'إرشاد العملاء'],
    },
    tirs: {
        name: 'Tirs',
        nameAr: 'تِرس',
        role: 'Industrial B2B',
        roleAr: 'الصناعة والجملة',
        color: '#8B9EB7',
        iconName: 'settings',
        description: 'Your B2B sales agent. Handle wholesale inquiries, generate quotes, and manage orders.',
        descriptionAr: 'وكيل مبيعات الجملة. يستقبل استفسارات الجملة، يولد عروض الأسعار، ويدير الطلبات.',
        features: ['Quote Generation', 'Bulk Orders', 'Supplier Matching', 'Inventory Sync'],
        featuresAr: ['توليد عروض الأسعار', 'طلبات الجملة', 'مطابقة الموردين', 'مزامنة المخزون'],
    },
    ostaz: {
        name: 'Ostaz',
        nameAr: 'أستاذ',
        role: 'Education',
        roleAr: 'التعليم',
        color: '#7C5CFF',
        iconName: 'book',
        description: 'Your AI tutor. Teach, assess, and guide students with personalized learning paths.',
        descriptionAr: 'معلمك الذكي. يعلّم، يقيّم، ويرشد الطلاب بمسارات تعليمية مخصصة.',
        features: ['Personalized Lessons', 'Progress Tracking', 'Quiz Generation', 'Parent Reports'],
        featuresAr: ['دروس مخصصة', 'تتبع التقدم', 'توليد الاختبارات', 'تقارير الوالدين'],
    },
};

// Required for static export
export function generateStaticParams() {
    return [
        { id: 'sofra' },
        { id: 'tajer' },
        { id: 'drmoe' },
        { id: 'tirs' },
        { id: 'ostaz' },
    ];
}

// Icon component
function AgentIcon({ name, className }: { name: string; className?: string }) {
    switch (name) {
        case 'chef': return <ChefHat className={className} />;
        case 'building': return <Building className={className} />;
        case 'activity': return <Activity className={className} />;
        case 'settings': return <Settings className={className} />;
        case 'book': return <BookOpen className={className} />;
        default: return null;
    }
}

export default async function AgentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const agent = agentsData[id];

    if (!agent) {
        return (
            <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Agent Not Found</h1>
                    <Link href="/" className="text-[#39FF14] hover:underline">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#050508] text-white">
            {/* Top Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div
                    className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top, ${agent.color}, transparent 50%)` }}
                />
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-6 mb-8">
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
                        >
                            <AgentIcon name={agent.iconName} className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">{agent.name}</h1>
                            <p className="text-lg text-slate-400">{agent.role}</p>
                        </div>
                    </div>
                    <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                        {agent.description}
                    </p>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Features</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {agent.features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10"
                            >
                                <CheckCircle className="w-5 h-5 text-[#39FF14]" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6">
                <div className="max-w-xl mx-auto text-center">
                    <div
                        className="p-10 rounded-2xl border border-white/10"
                        style={{ background: `linear-gradient(135deg, ${agent.color}10, transparent)` }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Get Started with {agent.name}</h2>
                        <p className="text-slate-400 mb-6">Join the waitlist and get early access.</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-black transition-all"
                            style={{ backgroundColor: agent.color }}
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-sm">
                <p>© 2024 Axiom Reset</p>
            </footer>
        </main>
    );
}
