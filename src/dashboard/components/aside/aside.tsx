import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronRightIcon } from 'lucide-react'
import { Link } from 'react-router'

export const Aside = () => {
  return (
    <aside className="py-6 px-4">
      <ScrollArea className="h-24 pr-4">
        <div className="space-y-4">
          <Button className="w-full justify-start" asChild>
            <Link to="/dashboard/statistics">
              <ChevronRightIcon className="mr-2 h-4 w-4" /> Tablero de Estadísticas
            </Link>
          </Button>
          <Button className="w-full justify-start" asChild>
            <Link to="/dashboard/my-classes">
              <ChevronRightIcon className="mr-2 h-4 w-4" /> Mis Clases
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </aside>
  )
}
