import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-accent-foreground"
            )
          }
        >
          <span className="mr-3">{item.icon}</span>
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}
