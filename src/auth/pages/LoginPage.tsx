import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { logoImdera } from '@/assets'

const FormSchema = z.object({
  email: z.email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
})

export function LoginPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    form.reset()
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-11/12 max-w-md rounded-2xl shadow-lg p-6">
        <header className="space-y-4 text-center mb-8">
          <div className="mx-auto size-24">
            <img src={logoImdera} alt="Logo Imdera" />
          </div>
          <h1 className="text-3xl font-bold">Bienvenido</h1>
          <p>Ingresa a tu cuenta para continuar</p>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <FormField
              control={form.control}
              name="email"
              render={(data) => (
                <FormItem>
                  <FormLabel>Correo Eléctronico *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="user@imdera.com" {...data.field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={(data) => (
                <FormItem>
                  <FormLabel>Contraseña *</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••••" {...data.field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="text-slate-900 py-3 px-6 h-auto mx-auto block w-full" type="submit">
              Ingresar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
