import { FiGithub } from 'react-icons/fi'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'

export function Navbar() {
  const { setTheme } = useTheme()

  return (
    <nav className="flex w-full items-center justify-between border-[1px] bg-background px-8 py-2 transition-all duration-500">
      <h1 className="text-xl font-semibold">Tamakabin</h1>
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <FiGithub className="text-xl" />
              <span className="sr-only">Github</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <a
                href="https://github.com/enzosakamoto/tamakabin-front"
                target="_blank"
                rel="noopener noreferrer"
              >
                Front-End + Servidor
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a
                href="https://github.com/PedroMatumoto/tamakabin"
                target="_blank"
                rel="noopener noreferrer"
              >
                IoT
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Trocar tema</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Escuro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              Sistema
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
