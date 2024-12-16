import { Home, CreditCard, Church } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'

interface AppSidebarProps {
    activeView: 'overview' | 'transactions' | 'churches'
    setActiveView: (view: 'overview' | 'transactions' | 'churches') => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
    return (
        <Sidebar>
            <SidebarHeader>
                <h2 className="px-6 text-lg font-semibold">Donor Portal</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => setActiveView('overview')}
                                    isActive={activeView === 'overview'}
                                >
                                    <Home className="mr-2 h-4 w-4" />
                                    <span>Overview</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => setActiveView('transactions')}
                                    isActive={activeView === 'transactions'}
                                >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Transactions</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => setActiveView('churches')}
                                    isActive={activeView === 'churches'}
                                >
                                    <Church className="mr-2 h-4 w-4" />
                                    <span>Churches</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}

