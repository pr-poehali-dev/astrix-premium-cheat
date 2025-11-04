import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://functions.poehali.dev/7baa9197-2925-4334-bf93-0597fa7b0769";

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
  const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/register');
      return;
    }
    loadUserData(userId);
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUserData(data.user);
        setPurchaseHistory(data.purchases || []);
      } else {
        toast({ title: "Ошибка", description: "Не удалось загрузить данные", variant: "destructive" });
        localStorage.removeItem('userId');
        navigate('/register');
      }
    } catch (error) {
      toast({ title: "Ошибка", description: "Проблема с подключением", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    toast({ title: "Вы вышли из аккаунта" });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-background to-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] bg-white/3 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/50 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">A</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">Astrix</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary/50" onClick={() => navigate('/')}>
              <Icon name="Home" className="mr-2" size={18} />
              Главная
            </Button>
            <Button variant="outline" className="border-primary/50 hover:bg-destructive/10" onClick={handleLogout}>
              <Icon name="LogOut" className="mr-2" size={18} />
              Выход
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Личный кабинет</h1>
            <p className="text-muted-foreground">Управляйте своим аккаунтом Astrix</p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-xl border-border/50 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border/30">
                  <Icon name="User" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-semibold">{userData?.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border/30">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{userData?.email}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border/30">
                  <Icon name="KeyRound" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">UID (ID аккаунта)</p>
                    <p className="font-semibold font-mono">#{userData?.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border/30">
                  <Icon name="Calendar" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Дата регистрации</p>
                    <p className="font-semibold">{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('ru-RU') : ''}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Dialog open={showPurchaseHistory} onOpenChange={setShowPurchaseHistory}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="History" className="mr-2" size={20} />
                    История покупок
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">История покупок</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 mt-4">
                    {purchaseHistory.length > 0 ? (
                      purchaseHistory.map((purchase, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30">
                          <div className="flex items-center gap-4">
                            <Icon name="ShoppingBag" size={20} className="text-primary" />
                            <div>
                              <p className="font-semibold">{purchase.plan}</p>
                              <p className="text-sm text-muted-foreground">{purchase.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{purchase.price}</p>
                            <p className="text-sm text-muted-foreground">{purchase.status}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Icon name="ShoppingBag" className="mx-auto mb-4" size={48} />
                        <p>У вас пока нет покупок</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Download" size={24} className="text-primary" />
                <h3 className="text-xl font-bold">Скачать чит</h3>
              </div>
              <p className="text-muted-foreground mb-4">Загрузите последнюю версию Astrix</p>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Download" className="mr-2" size={18} />
                Скачать
              </Button>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="ShoppingCart" size={24} className="text-primary" />
                <h3 className="text-xl font-bold">Купить подписку</h3>
              </div>
              <p className="text-muted-foreground mb-4">Продлите доступ к премиум функциям</p>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                onClick={() => navigate('/#pricing')}
              >
                <Icon name="ShoppingCart" className="mr-2" size={18} />
                Выбрать план
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
