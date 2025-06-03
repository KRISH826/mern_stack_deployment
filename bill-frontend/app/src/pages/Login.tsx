import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoginSchema } from "@/schemas/LoginSchema"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { login } from "@/redux/auth/authThunk"
import { AppDispatch } from "@/redux/store"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange"
  })
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = form;
  const onSubmit =  async (values: z.infer<typeof LoginSchema>) => {
    await dispatch(login(values));
    navigate("/")
  }
  return (
    <div className="login_page min-h-screen flex items-center justify-center bg-gray-100/60">
      <Card className="w-[600px] bg-white rounded-lg p-6">
        <CardHeader className="text-left text-3xl font-bold">Login</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={!isDirty || !isValid || isSubmitting} className="w-full">{isSubmitting ? "Logging in..." : "Login"}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login