import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://functions.poehali.dev/7baa9197-2925-4334-bf93-0597fa7b0769";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', username, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.user.id.toString());
        toast({ title: "Успешно!", description: "Регистрация завершена" });
        navigate('/profile');
      } else {
        toast({ title: "Ошибка", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось зарегистрироваться", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.user.id.toString());
        toast({ title: "Успешно!", description: "Вы вошли в аккаунт" });
        navigate('/profile');
      } else {
        toast({ title: "Ошибка", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось войти", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden flex items-center justify-center p-6">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-background to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] bg-white/3 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">A</span>
            </div>
            <span className="text-3xl font-bold tracking-tight">Astrix</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Добро пожаловать</h1>
          <p className="text-muted-foreground">Войдите или создайте аккаунт</p>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleLogin(formData.get('email') as string, formData.get('password') as string);
              }} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-sm font-medium">Email</label>
                  <Input name="email" id="login-email" type="email" placeholder="your@email.com" className="bg-background/50" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="login-password" className="text-sm font-medium">Пароль</label>
                  <Input name="password" id="login-password" type="password" placeholder="••••••••" className="bg-background/50" required />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  disabled={loading}
                >
                  <Icon name="LogIn" className="mr-2" size={18} />
                  {loading ? 'Загрузка...' : 'Войти в аккаунт'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleRegister(
                  formData.get('username') as string,
                  formData.get('email') as string,
                  formData.get('password') as string
                );
              }} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="reg-username" className="text-sm font-medium">Имя пользователя</label>
                  <Input name="username" id="reg-username" placeholder="Username" className="bg-background/50" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-email" className="text-sm font-medium">Email</label>
                  <Input name="email" id="reg-email" type="email" placeholder="your@email.com" className="bg-background/50" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-password" className="text-sm font-medium">Пароль</label>
                  <Input name="password" id="reg-password" type="password" placeholder="••••••••" className="bg-background/50" required />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  disabled={loading}
                >
                  <Icon name="UserPlus" className="mr-2" size={18} />
                  {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              На главную
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
